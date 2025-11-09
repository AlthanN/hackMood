/**
 * Database module for PostgreSQL connection and mood history management
 */

const { Pool } = require('pg');

// Create a connection pool with fallback defaults
const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

console.log('Connecting to database:', {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'hackmood',
  user: process.env.DB_USER || 'dylan'
});

// Initialize the database (create table if it doesn't exist)
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_moods (
        id SERIAL PRIMARY KEY,
        spotify_user_id VARCHAR(255) UNIQUE NOT NULL,
        emotion VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Database table initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

/**
 * Upsert user mood (insert if new, update if exists)
 * @param {string} spotifyUserId - The Spotify user ID
 * @param {string} emotion - The emotion/mood value
 * @returns {Promise<Object>} The inserted or updated row
 */
async function upsertUserMood(spotifyUserId, emotion) {
  try {
    const result = await pool.query(
      `INSERT INTO user_moods (spotify_user_id, emotion, updated_at)
       VALUES ($1, $2, CURRENT_TIMESTAMP)
       ON CONFLICT (spotify_user_id)
       DO UPDATE SET emotion = $2, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [spotifyUserId, emotion]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error upserting user mood:', error);
    throw error;
  }
}

/**
 * Get user mood by Spotify user ID
 * @param {string} spotifyUserId - The Spotify user ID
 * @returns {Promise<Object|null>} The mood record or null if not found
 */
async function getUserMood(spotifyUserId) {
  try {
    const result = await pool.query(
      'SELECT * FROM user_moods WHERE spotify_user_id = $1',
      [spotifyUserId]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error getting user mood:', error);
    throw error;
  }
}

/**
 * Get all user moods
 * @returns {Promise<Array>} Array of all mood records
 */
async function getAllUserMoods() {
  try {
    const result = await pool.query(
      'SELECT * FROM user_moods ORDER BY updated_at DESC'
    );
    return result.rows;
  } catch (error) {
    console.error('Error getting all user moods:', error);
    throw error;
  }
}

// Close the pool gracefully on process exit
process.on('SIGINT', async () => {
  await pool.end();
  process.exit(0);
});

module.exports = {
  pool,
  initializeDatabase,
  upsertUserMood,
  getUserMood,
  getAllUserMoods
};
