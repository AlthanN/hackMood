# HackMood 🎵

A music mood-based world generator that uses Spotify authentication and Last.fm data to create personalized 3D worlds based on your music taste.

## Project Structure

```
hackmood/
├── frontend/          # Next.js frontend application
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   └── public/       # Static assets
├── backend/          # Express.js backend server
│   ├── server.js    # Main server file
│   └── public/      # Static files (if needed)
└── README.md
```

## Features

- 🎵 Spotify OAuth authentication
- 🌍 3D world generation based on music mood
- 🎨 Dynamic mood analysis using Last.fm tags
- 🎭 Interactive 3D environments with Three.js/React Three Fiber

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A Spotify Developer account
- (Optional) A Last.fm API account for mood analysis

## Setup Instructions

### 1. Spotify Developer Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create an App"
4. Fill in the app details:
   - **App name**: HackMood (or your preferred name)
   - **App description**: Music mood-based world generator
5. After creating the app, click "Edit Settings"
6. Add the following to "Redirect URIs":
   - `http://localhost:8888/callback`
   - Click "Add" then "Save"
7. Copy your **Client ID** and **Client Secret** (you'll need these for the backend)

### 2. Last.fm API Setup (Optional)

1. Go to [Last.fm API Account](https://www.last.fm/api/account/create)
2. Fill in the form to create an API account
3. Copy your **API Key**

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file and add your credentials
# SPOTIFY_CLIENT_ID=your_client_id_here
# SPOTIFY_CLIENT_SECRET=your_client_secret_here
# LASTFM_API_KEY=your_lastfm_api_key_here (optional)
```

Edit the `backend/.env` file with your actual credentials:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
PORT=8888
REDIRECT_URI=http://localhost:8888/callback
FRONTEND_URI=http://localhost:3000
LASTFM_API_KEY=your_lastfm_api_key_here
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
# or
pnpm install

if it does not work, try doing:
npm install --legacy-peer-deps

# Create environment file
cp .env.example .env.local

# The default backend URL is already set to http://localhost:8888
```

Edit the `frontend/.env.local` file if needed:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8888
```

## Running the Application

You need to run both the backend and frontend servers.

### Terminal 1 - Backend Server

```bash
cd backend
npm start

# Or for development with auto-reload:
npm run dev
```

The backend server will start on `http://localhost:8888`

You should see:
```
==================================================
🎵 HackMood Spotify Auth Server
==================================================
Server running on: http://localhost:8888
Frontend URL: http://localhost:3000
Redirect URI: http://localhost:8888/callback
==================================================
```

### Terminal 2 - Frontend Server

```bash
cd frontend
npm run dev
# or
pnpm dev
```

The frontend will start on `http://localhost:3000`

## Using the Application

1. Open your browser and navigate to `http://localhost:3000`
2. Click the "Sign In" or "Create World" button
3. In the authentication modal, click "Continue with Spotify"
4. You'll be redirected to Spotify's authorization page
5. After authorizing, you'll be redirected back to the app
6. Your Spotify access token will be stored in localStorage
7. You can now use the mood analysis features!

## API Endpoints

### Backend (http://localhost:8888)

- `GET /login` - Initiates Spotify OAuth flow
- `GET /callback` - Spotify OAuth callback endpoint
- `GET /refresh_token?refresh_token=TOKEN` - Refreshes an expired access token
- `GET /lastfm/proxy?method=METHOD&artist=ARTIST&track=TRACK` - Proxy for Last.fm API
- `GET /health` - Health check endpoint

## Troubleshooting

### Backend Issues

**Error: Missing required environment variables**
- Make sure you've created the `.env` file in the backend directory
- Verify all required variables are set (SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET)

**Error: Redirect URI mismatch**
- Check that the redirect URI in your Spotify Developer Dashboard matches exactly: `http://localhost:8888/callback`
- Ensure the REDIRECT_URI in your `.env` file matches

### Frontend Issues

**Authentication not working**
- Make sure the backend server is running
- Check that NEXT_PUBLIC_BACKEND_URL in `.env.local` points to the correct backend URL
- Check browser console for errors

**CORS errors**
- Verify the FRONTEND_URI in backend `.env` matches your frontend URL
- The backend is configured to accept requests from the frontend origin

### Last.fm API Issues

**Error: Last.fm API key not configured**
- Add your Last.fm API key to the backend `.env` file
- This is optional - the app will work without it, but mood analysis won't function

## Development

### Backend Development

The backend uses:
- Express.js for the web server
- Native fetch API for HTTP requests (Node 18+)
- Cookie-parser for session management
- CORS for cross-origin requests

### Frontend Development

The frontend uses:
- Next.js 14+ (App Router)
- React 18+
- Three.js / React Three Fiber for 3D rendering
- Tailwind CSS for styling

## Environment Variables Reference

### Backend (.env)

| Variable | Required | Description |
|----------|----------|-------------|
| SPOTIFY_CLIENT_ID | Yes | Your Spotify app client ID |
| SPOTIFY_CLIENT_SECRET | Yes | Your Spotify app client secret |
| PORT | No | Server port (default: 8888) |
| REDIRECT_URI | No | OAuth callback URL (default: http://localhost:8888/callback) |
| FRONTEND_URI | No | Frontend URL (default: http://localhost:3000) |
| LASTFM_API_KEY | No | Last.fm API key for mood analysis |

### Frontend (.env.local)

| Variable | Required | Description |
|----------|----------|-------------|
| NEXT_PUBLIC_BACKEND_URL | No | Backend API URL (default: http://localhost:8888) |

## Security Notes

- Never commit `.env` files to version control
- Keep your Spotify Client Secret secure
- Tokens are stored in browser localStorage (consider using httpOnly cookies for production)
- The state parameter is used to prevent CSRF attacks

## License

MIT

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Support

If you encounter any issues, please check:
1. All environment variables are correctly set
2. Both backend and frontend servers are running
3. Spotify Developer Dashboard settings match your configuration
4. Browser console for any error messages

For more help, create an issue in the repository.
