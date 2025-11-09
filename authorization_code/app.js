/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/documentation/web-api/tutorials/code-flow
 */

var express = require('express');
var request = require('request');
var crypto = require('crypto');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var db = require('./db');

const corsOptions = {
  origin: function(origin, callback) {
    // Allow any localhost origin in development
    if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1:8888')) {
      callback(null, true);
    } else {
      callback(null, true); // For production, you might want to be more restrictive
    }
  },
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Try to load dotenv if available
try {
  require('dotenv').config();
} catch (e) {
  console.log('dotenv not installed, using environment variables directly');
}

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.error('Error: Spotify credentials not found in environment variables');
  process.exit(1);
}

var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
var redirect_uri = process.env.REDIRECT_URI || 'http://127.0.0.1:8888/callback';


const generateRandomString = (length) => {
  return crypto
  .randomBytes(60)
  .toString('hex')
  .slice(0, length);
}

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors(corsOptions))
   .use(cookieParser())
   .use(express.json());

// Initialize database
db.initializeDatabase().catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

app.get('/login', function(req, res) {

  var state = generateRandomString(16);

  // Set cookie with explicit options to ensure it persists through redirect
  res.cookie(stateKey, state, {
    maxAge: 3600000, // 1 hour
    httpOnly: false, // Allow JavaScript access if needed
    secure: false, // Set to true in production with HTTPS
    sameSite: 'Lax'
  });

  console.log('Setting state cookie:', state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-top-read user-library-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  console.log('=== CALLBACK DEBUG ===');
  console.log('Code:', code ? code.substring(0, 10) + '...' : 'null');
  console.log('State from URL:', state);
  console.log('State from Cookie:', storedState);
  console.log('All cookies:', JSON.stringify(req.cookies));
  console.log('Cookie header:', req.headers['cookie']);
  console.log('State match result:', state === storedState);
  console.log('====================');

  if (state === null || state !== storedState) {
    console.error('State mismatch or no state provided');
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        console.log('Successfully obtained tokens');
        console.log('Access token:', access_token ? access_token.substring(0, 20) + '...' : 'null');

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, async function(error, response, body) {
          if (!error && body.id) {
            console.log('User profile fetched successfully:', body.display_name);

            // Store/update user mood in database
            try {
              const moodRecord = await db.upsertUserMood(body.id, null);
              console.log('User mood record created/updated:', moodRecord);
            } catch (dbError) {
              console.error('Error storing user mood:', dbError);
              // Don't fail the login flow if database operation fails
            }
          } else {
            console.error('Error fetching user profile:', error);
          }
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        console.error('Token exchange failed');
        console.error('Error:', error);
        console.error('Status:', response ? response.statusCode : 'no response');
        console.error('Body:', body);
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
          refresh_token = body.refresh_token;
      res.send({
        'access_token': access_token,
        'refresh_token': refresh_token
      });
    }
  });
});

// API endpoint to update user mood
app.post('/api/mood', async function(req, res) {
  try {
    const { spotify_user_id, emotion } = req.body;

    if (!spotify_user_id) {
      return res.status(400).json({ error: 'spotify_user_id is required' });
    }

    const moodRecord = await db.upsertUserMood(spotify_user_id, emotion || null);
    res.json({
      success: true,
      data: moodRecord
    });
  } catch (error) {
    console.error('Error updating mood:', error);
    res.status(500).json({ error: 'Failed to update mood' });
  }
});

// API endpoint to update user mood (always updates to current mood)
app.post('/api/mood/store-if-empty', async function(req, res) {
  try {
    const { spotify_user_id, emotion } = req.body;

    if (!spotify_user_id) {
      return res.status(400).json({ error: 'spotify_user_id is required' });
    }

    if (!emotion) {
      return res.status(400).json({ error: 'emotion is required' });
    }

    // Always update with the new emotion (stores previous emotion when fetched)
    const moodRecord = await db.upsertUserMood(spotify_user_id, emotion);
    res.json({
      success: true,
      data: moodRecord,
      message: 'Mood updated successfully'
    });
  } catch (error) {
    console.error('Error storing mood:', error);
    res.status(500).json({ error: 'Failed to store mood' });
  }
});

// API endpoint to get user mood
app.get('/api/mood/:spotify_user_id', async function(req, res) {
  try {
    const { spotify_user_id } = req.params;
    const moodRecord = await db.getUserMood(spotify_user_id);

    if (!moodRecord) {
      return res.status(404).json({ error: 'User mood not found' });
    }

    res.json({
      success: true,
      data: moodRecord
    });
  } catch (error) {
    console.error('Error fetching mood:', error);
    res.status(500).json({ error: 'Failed to fetch mood' });
  }
});

// API endpoint to get all moods
app.get('/api/moods', async function(req, res) {
  try {
    const moods = await db.getAllUserMoods();
    res.json({
      success: true,
      data: moods
    });
  } catch (error) {
    console.error('Error fetching all moods:', error);
    res.status(500).json({ error: 'Failed to fetch moods' });
  }
});

// Last.fm API proxy endpoint to avoid CORS issues
app.get('/lastfm/proxy', function(req, res) {
  const { method, artist, track } = req.query;
  const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

  if (!LASTFM_API_KEY || LASTFM_API_KEY === 'YOUR_LASTFM_API_KEY') {
    console.error('Last.fm API key not configured! Please set LASTFM_API_KEY in your .env file');
    return res.status(500).json({
      error: 'Last.fm API key not configured',
      message: 'Please set LASTFM_API_KEY in your .env file'
    });
  }

  let url = `https://ws.audioscrobbler.com/2.0/?method=${method}&api_key=${LASTFM_API_KEY}&format=json`;

  if (artist) {
    url += `&artist=${encodeURIComponent(artist)}`;
  }
  if (track) {
    url += `&track=${encodeURIComponent(track)}`;
  }

  console.log(`Last.fm request: ${method} for ${artist}${track ? ' - ' + track : ''}`);

  request.get(url, function(error, response, body) {
    if (error) {
      console.error('Last.fm API error:', error);
      return res.status(500).json({ error: 'Last.fm API request failed', details: error.message });
    }

    if (response.statusCode !== 200) {
      console.error(`Last.fm API returned status ${response.statusCode}:`, body);
      return res.status(response.statusCode).json({ error: 'Last.fm API error', details: body });
    }

    // Parse and check for Last.fm API errors
    try {
      const data = JSON.parse(body);
      if (data.error) {
        console.error('Last.fm API error:', data.message);
        return res.status(400).json({ error: data.message });
      }
      res.json(data);
    } catch (e) {
      res.send(body);
    }
  });
});

console.log('Listening on 8888');
app.listen(8888);
