const API_BASE_URL = 'http://127.0.0.1:8888';

export async function loginWithSpotify() {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during Spotify login:', error);
    throw error;
  }
}

export async function handleCallback(code) {
  try {
    const response = await fetch(`${API_BASE_URL}/callback?code=${code}`, {
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during callback:', error);
    throw error;
  }
}

export async function refreshToken() {
  try {
    const response = await fetch(`${API_BASE_URL}/refresh_token`, {
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}