# Mood History Database Setup

This document explains how to set up PostgreSQL for the mood history feature.

## Prerequisites

- PostgreSQL installed and running
- Node.js and npm installed

## Installation Steps

### 1. Install Dependencies

The PostgreSQL driver (`pg`) has already been installed. If you need to reinstall:

```bash
npm install pg
```

### 2. Create PostgreSQL Database

Create a new PostgreSQL database called `hackmood`:

```bash
psql -U postgres -c "CREATE DATABASE hackmood;"
```

Or using a GUI tool like pgAdmin.

### 3. Configure Environment Variables

Add the following environment variables to your `.env` file:

```env
# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hackmood
DB_USER=postgres
DB_PASSWORD=your_postgres_password
```

Replace `your_postgres_password` with your actual PostgreSQL password.

### 4. Start the Backend Server

The database table will be automatically created when the server starts:

```bash
npm start
```

You should see:
```
✓ Database table initialized successfully
Listening on 8888
```

## Database Schema

The `user_moods` table has the following structure:

```sql
CREATE TABLE user_moods (
  id SERIAL PRIMARY KEY,
  spotify_user_id VARCHAR(255) UNIQUE NOT NULL,
  emotion VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Fields:
- **id**: Auto-incrementing primary key
- **spotify_user_id**: Unique Spotify user ID (from Spotify API)
- **emotion**: The current mood/emotion value (can be null)
- **created_at**: Timestamp when the record was created
- **updated_at**: Timestamp when the record was last updated

## API Endpoints

### 1. Update User Mood

**POST** `/api/mood`

Updates or creates a user mood record.

Request body:
```json
{
  "spotify_user_id": "user_id_from_spotify",
  "emotion": "happy"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "spotify_user_id": "user_id_from_spotify",
    "emotion": "happy",
    "created_at": "2025-11-08T12:00:00.000Z",
    "updated_at": "2025-11-08T12:00:00.000Z"
  }
}
```

### 2. Get User Mood

**GET** `/api/mood/:spotify_user_id`

Retrieves a specific user's mood record.

Example:
```
GET /api/mood/user_id_from_spotify
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "spotify_user_id": "user_id_from_spotify",
    "emotion": "happy",
    "created_at": "2025-11-08T12:00:00.000Z",
    "updated_at": "2025-11-08T12:00:00.000Z"
  }
}
```

### 3. Get All Moods

**GET** `/api/moods`

Retrieves all user mood records (sorted by most recently updated).

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "spotify_user_id": "user_1",
      "emotion": "happy",
      "created_at": "2025-11-08T12:00:00.000Z",
      "updated_at": "2025-11-08T12:00:00.000Z"
    },
    {
      "id": 2,
      "spotify_user_id": "user_2",
      "emotion": "calm",
      "created_at": "2025-11-08T12:05:00.000Z",
      "updated_at": "2025-11-08T12:05:00.000Z"
    }
  ]
}
```

## How It Works

### On User Login

1. User clicks `/login` endpoint
2. User is redirected to Spotify authentication
3. After authentication, the `/callback` endpoint is triggered
4. The app fetches the user's Spotify profile (which includes their `id`)
5. **NEW**: The user's mood record is automatically created or updated in the database with `spotify_user_id` and `emotion = null`

### Updating User Mood

Frontend can call the `/api/mood` endpoint to update a user's mood:

```javascript
fetch('http://localhost:8888/api/mood', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    spotify_user_id: 'user_spotify_id',
    emotion: 'excited'
  })
})
.then(res => res.json())
.then(data => console.log('Mood updated:', data));
```

## Troubleshooting

### Connection Error: "ECONNREFUSED"
- PostgreSQL is not running
- Database credentials are incorrect
- Check your `.env` file for correct `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`

### Table Already Exists Error
- This is normal and expected - the code safely handles table creation

### Permission Denied Error
- Make sure your PostgreSQL user has permissions to create tables
- Try running: `GRANT ALL PRIVILEGES ON DATABASE hackmood TO postgres;`

## Files Modified/Created

- **db.js**: Database connection pool and CRUD operations
- **app.js**: Database initialization, API endpoints, and mood storage on login
- **package.json**: Added `pg` dependency
