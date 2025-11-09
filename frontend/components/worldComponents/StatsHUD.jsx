"use client"

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const moodToWorldMap = {
  happy: '/farm',
  relaxing: '/camp',
  sad: '/city',
  energetic: '/beach',
  angry: '/inferno',
  romantic: '/sakura',
  unknown: '/camp',
};

export default function StatsHUD() {
  const [moodData, setMoodData] = useState(null);
  const [tracksData, setTracksData] = useState(null);
  const [expandedMood, setExpandedMood] = useState(true);
  const [expandedTracks, setExpandedTracks] = useState(true);
  const [oldMood, setOldMood] = useState(null);
  const [loadingOldMood, setLoadingOldMood] = useState(false);
  const [spotifyUserId, setSpotifyUserId] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [hudVisible, setHudVisible] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Restore searched friend ID from localStorage on mount
    const storedFriendId = localStorage.getItem('searchedFriendId');
    if (storedFriendId) {
      setSearchInput(storedFriendId);
    }
  }, []);

  useEffect(() => {
    // Try to get mood data from URL query parameters first
    const moodFromUrl = searchParams.get('mood');
    const moodKeyFromUrl = searchParams.get('moodKey') || moodFromUrl; // Use moodKey if available, fall back to mood
    const accessToken = searchParams.get('accessToken');

    // Store access token in localStorage if provided in URL
    if (accessToken) {
      localStorage.setItem('spotify_access_token', accessToken);
      console.log('Access token stored in localStorage from URL');
    }

    if (moodFromUrl) {
      // Parse data from URL parameters
      const distributionStr = searchParams.get('distribution');
      let distribution = [];
      if (distributionStr) {
        try {
          distribution = JSON.parse(distributionStr);
        } catch (e) {
          console.error('Error parsing distribution:', e);
        }
      }

      const moodData = {
        mood: moodKeyFromUrl,
        moodKey: moodKeyFromUrl,
        confidence: parseInt(searchParams.get('confidence')) || 0,
        category: searchParams.get('category') || 'Unknown',
        tracksAnalyzed: parseInt(searchParams.get('tracksAnalyzed')) || 0,
        tracksSkipped: parseInt(searchParams.get('tracksSkipped')) || 0,
        distribution: distribution,
      };
      setMoodData(moodData);
      // Store in localStorage for persistence across navigation
      localStorage.setItem('currentMoodData', JSON.stringify(moodData));

      // Store current mood in database if user has no mood stored yet
      storeCurrentMoodIfEmpty(moodData.moodKey);

      // Fetch recently listened tracks and old mood
      fetchRecentlyListenedTracks();
      fetchOldMood();
    } else {
      // Fallback to localStorage if URL params not available
      try {
        const storedMood = localStorage.getItem('userMoodResult') || localStorage.getItem('currentMoodData');
        if (storedMood) {
          const moodResult = JSON.parse(storedMood);
          setMoodData(moodResult);
          // Still fetch tracks and old mood
          fetchRecentlyListenedTracks();
          fetchOldMood();
        }
      } catch (error) {
        console.error('Error parsing mood data:', error);
      }
    }
  }, [searchParams]);

  const fetchOldMood = async () => {
    try {
      setLoadingOldMood(true);
      const accessToken = localStorage.getItem('spotify_access_token');

      if (!accessToken) {
        console.log('No access token for fetching old mood');
        return;
      }

      // Get user profile to get spotify_user_id
      const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!userResponse.ok) {
        console.error('Failed to fetch user profile');
        return;
      }

      const userData = await userResponse.json();
      const spotifyUserId = userData.id;
      setSpotifyUserId(spotifyUserId);

      // Fetch old mood from backend
      const moodResponse = await fetch(`http://localhost:8888/api/mood/${spotifyUserId}`);

      if (moodResponse.ok) {
        const moodData = await moodResponse.json();
        if (moodData.data && moodData.data.emotion) {
          setOldMood(moodData.data.emotion);
          console.log('Old mood fetched:', moodData.data.emotion);
        }
      } else {
        console.log('No old mood found in database');
      }
    } catch (error) {
      console.error('Error fetching old mood:', error);
    } finally {
      setLoadingOldMood(false);
    }
  };

  const storeCurrentMoodIfEmpty = async (currentMood) => {
    try {
      const accessToken = localStorage.getItem('spotify_access_token');
      if (!accessToken || !currentMood) {
        return;
      }

      // Get user ID from Spotify API
      const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!userResponse.ok) {
        console.log('Could not fetch user ID for mood storage');
        return;
      }

      const userData = await userResponse.json();
      const spotifyUserId = userData.id;

      // Call backend endpoint to store mood only if it's empty
      const response = await fetch('http://localhost:8888/api/mood/store-if-empty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          spotify_user_id: spotifyUserId,
          emotion: currentMood
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Mood storage result:', result.message);
      } else {
        console.error('Failed to store mood');
      }
    } catch (error) {
      console.error('Error storing current mood:', error);
    }
  };

  const handleVisitPreviousMood = () => {
    if (!oldMood) {
      console.log('No previous mood available');
      return;
    }

    const worldRoute = moodToWorldMap[oldMood.toLowerCase()] || '/camp';
    console.log(`Navigating to world for previous mood: ${oldMood} (route: ${worldRoute})`);
    // Store current world before navigating
    if (typeof window !== 'undefined') {
      localStorage.setItem('previousWorldPath', window.location.pathname);
    }
    router.push(worldRoute);
  };

  const handleHomeButton = () => {
    // Clear searched friend ID when going home
    localStorage.removeItem('searchedFriendId');
    setSearchInput('');
    router.push('/');
  };

  const handleSearchUser = async (e) => {
    e.preventDefault();

    if (!searchInput.trim()) {
      setSearchError('Please enter a Spotify user ID');
      return;
    }

    setSearchLoading(true);
    setSearchError('');

    try {
      // Query the backend API for the user's mood
      const response = await fetch(`http://localhost:8888/api/mood/${searchInput.trim()}`);

      if (!response.ok) {
        if (response.status === 404) {
          setSearchError('User not found');
        } else {
          setSearchError('Error fetching user mood');
        }
        setSearchLoading(false);
        return;
      }

      const moodData = await response.json();

      if (moodData.data && moodData.data.emotion) {
        const userMood = moodData.data.emotion.toLowerCase();
        const worldRoute = moodToWorldMap[userMood] || '/camp';
        console.log(`Navigating to world for user ${searchInput}: ${userMood} (route: ${worldRoute})`);
        // Store current world and friend ID before navigating
        if (typeof window !== 'undefined') {
          localStorage.setItem('previousWorldPath', window.location.pathname);
          localStorage.setItem('searchedFriendId', searchInput.trim());
        }
        router.push(worldRoute);
      } else {
        setSearchError('User has no mood data');
      }
    } catch (error) {
      console.error('Error searching user:', error);
      setSearchError('Failed to search user');
    } finally {
      setSearchLoading(false);
    }
  };

  const fetchRecentlyListenedTracks = async () => {
    try {
      const accessToken = localStorage.getItem('spotify_access_token');
      console.log('Access token in localStorage:', accessToken ? accessToken.substring(0, 20) + '...' : 'NOT FOUND');

      if (!accessToken) {
        console.log('No access token found');
        setTracksData([]);
        return;
      }

      console.log('Fetching top tracks...');
      const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      console.log('Track fetch response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched', data.items.length, 'tracks');
        const tracks = data.items.map(track => ({
          name: track.name,
          artist: track.artists[0]?.name || 'Unknown Artist',
          album: track.album?.name || 'Unknown Album'
        }));
        setTracksData(tracks);
      } else {
        console.error('Track fetch failed with status:', response.status);
        const errorData = await response.json();
        console.error('Error data:', errorData);
      }
    } catch (error) {
      console.error('Error fetching recently listened tracks:', error);
    }
  };

  return (
    <>
      <style>{`
        .stats-tracks-list::-webkit-scrollbar {
          width: 8px;
        }
        .stats-tracks-list::-webkit-scrollbar-track {
          background: rgba(29, 185, 84, 0.1);
          border-radius: 4px;
        }
        .stats-tracks-list::-webkit-scrollbar-thumb {
          background: #1DB954;
          border-radius: 4px;
        }
        .stats-tracks-list::-webkit-scrollbar-thumb:hover {
          background: #1ed760;
        }
      `}</style>

      {/* Show/Hide HUD Button - Bottom Left */}
      <button
        onClick={() => setHudVisible(!hudVisible)}
        style={styles.toggleButton}
        title={hudVisible ? 'Hide HUD' : 'Show HUD'}
      >
        {hudVisible ? 'Hide' : 'Show'}
      </button>

      {hudVisible && (
      <div style={styles.hudContainer}>
        {/* Left side - Previous Mood Button and Mood Analysis with distribution */}
        <div style={styles.leftPanelContainer}>
          {moodData && (
            <div style={styles.leftPanel}>
              <div
                style={{
                  ...styles.panel,
                  ...styles.leftPanelContent,
                  ...(expandedMood ? {} : styles.panelCollapsed)
                }}
                onClick={() => setExpandedMood(!expandedMood)}
              >
                <div style={styles.title}>Mood Analysis</div>
                {expandedMood && (
                  <>
                    <div style={styles.stat}>
                      <span style={styles.label}>Detected Mood:</span>
                      <span style={styles.value}>{moodData.category}</span>
                    </div>
                    <div style={styles.stat}>
                      <span style={styles.label}>Confidence:</span>
                      <span style={styles.value}>{moodData.confidence}%</span>
                    </div>

                    {/* Mood Distribution */}
                    {moodData.distribution && moodData.distribution.length > 0 && (
                      <div style={styles.distributionSection}>
                        <div style={styles.distributionTitle}>Mood Breakdown</div>
                        {moodData.distribution.map((item, index) => (
                          <div key={index} style={styles.distributionItem}>
                            <span style={styles.moodLabel}>{item.mood}</span>
                            <span style={styles.moodPercentage}>{item.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Previous Mood Button, Back Button, and Home Button - Right of Mood Analysis */}
          <div style={styles.buttonGroup}>
            {oldMood && (
              <button
                onClick={handleVisitPreviousMood}
                style={styles.visitPreviousMoodButton}
                title={`Enter your ${oldMood} world`}
              >
                Previous Mood: {oldMood.charAt(0).toUpperCase() + oldMood.slice(1)}
              </button>
            )}
            <button
              onClick={handleHomeButton}
              style={styles.homeButton}
              title="Return to home"
            >
              Home
            </button>
          </div>
        </div>

        {/* Right side - Search Bar and Recently Listened Tracks */}
        <div style={styles.rightPanelContainer}>
          {/* Search Bar - Left of Top 50 Tracks */}
          <form onSubmit={handleSearchUser} style={styles.searchBarContainer}>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setSearchError('');
              }}
              placeholder="Enter Friend User ID"
              style={styles.searchInput}
              disabled={searchLoading}
            />
            <button
              type="submit"
              style={styles.searchButton}
              disabled={searchLoading}
            >
              {searchLoading ? 'Searching...' : 'Search'}
            </button>
            {searchError && <div style={styles.searchError}>{searchError}</div>}
          </form>

          {moodData && (
            <div style={styles.rightPanel}>
              <div
                style={{
                  ...styles.panel,
                  ...(expandedTracks ? styles.rightPanelContent : styles.rightPanelContentCollapsed)
                }}
                onClick={() => setExpandedTracks(!expandedTracks)}
              >
                <div style={styles.title}>Top 50 Tracks</div>

                {expandedTracks && (
                  <>
                    {tracksData && tracksData.length > 0 ? (
                      <div className="stats-tracks-list" style={styles.tracksList}>
                        {tracksData.map((track, index) => (
                          <div key={index} style={styles.trackItem}>
                            <span style={styles.trackNumber}>{index + 1}.</span>
                            <div style={styles.trackInfo}>
                              <div style={styles.trackName}>{track.name}</div>
                              <div style={styles.trackArtist}>{track.artist}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={styles.loadingText}>Loading tracks...</div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

      {/* User Info - Bottom Right */}
      <div style={styles.userInfoContainer}>
        <div style={styles.infoBox}>
          <div style={styles.infoLabel}>My ID:</div>
          <div style={styles.infoValue}>{spotifyUserId || 'N/A'}</div>
        </div>
        <div style={styles.infoBox}>
          <div style={styles.infoLabel}>Friend's ID:</div>
          <div style={styles.infoValue}>{searchInput || 'Not visiting a world'}</div>
        </div>
      </div>
    </div>
      )}
    </>
  );
}

const styles = {
  hudContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    boxSizing: 'border-box',
    userSelect: 'none',
  },
  leftPanelContainer: {
    pointerEvents: 'auto',
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-start',
  },
  leftPanel: {
    pointerEvents: 'auto',
  },
  rightPanelContainer: {
    pointerEvents: 'auto',
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-start',
  },
  rightPanel: {
    pointerEvents: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  panel: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    padding: '12px 16px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    minWidth: '280px',
    maxWidth: '450px',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  panelCollapsed: {
    padding: '12px 16px',
    minWidth: 'auto',
    maxWidth: 'none',
    width: 'fit-content',
  },
  leftPanelContent: {
    height: 'auto',
  },
  rightPanelContent: {
    height: '600px',
    display: 'flex',
    flexDirection: 'column',
  },
  rightPanelContentCollapsed: {
    height: 'fit-content',
  },
  title: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#000',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    userSelect: 'none',
    textAlign: 'center',
  },
  titleCollapsed: {
    marginBottom: '0',
  },
  stat: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#000',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
  },
  label: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: '600',
    marginRight: '12px',
  },
  value: {
    color: '#000',
    fontWeight: '700',
    fontFamily: '"Courier New", monospace',
  },
  distributionSection: {
    marginTop: '16px',
    paddingTop: '12px',
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  },
  distributionTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 0.5)',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  distributionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
    fontSize: '12px',
  },
  moodLabel: {
    color: 'rgba(0, 0, 0, 0.8)',
    textTransform: 'capitalize',
  },
  moodPercentage: {
    color: '#000',
    fontWeight: '700',
  },
  tracksList: {
    flex: 1,
    overflowY: 'scroll',
    marginTop: '12px',
    paddingRight: '8px',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.05)',
  },
  trackItem: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
    fontSize: '11px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    paddingBottom: '6px',
  },
  trackNumber: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: '700',
    minWidth: '24px',
  },
  trackInfo: {
    flex: 1,
    minWidth: 0,
  },
  trackName: {
    color: '#000',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  trackArtist: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: '10px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  loadingText: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '12px',
    marginTop: '12px',
  },
  visitPreviousMoodButton: {
    pointerEvents: 'auto',
    padding: '12px 24px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    color: '#000',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    whiteSpace: 'nowrap',
  },
  buttonGroup: {
    pointerEvents: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'flex-start',
  },
  homeButton: {
    pointerEvents: 'auto',
    padding: '12px 24px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    color: '#000',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    whiteSpace: 'nowrap',
  },
  userInfoContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 100,
    pointerEvents: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  infoBox: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '12px 16px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    minWidth: '200px',
  },
  infoLabel: {
    color: '#000',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
  },
  infoValue: {
    color: '#000',
    fontSize: '13px',
    fontWeight: '500',
    fontFamily: 'monospace',
    wordBreak: 'break-all',
  },
  searchBarContainer: {
    pointerEvents: 'auto',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInput: {
    padding: '10px 16px',
    fontSize: '14px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    width: '220px',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  searchButton: {
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    background: 'rgba(29, 185, 84, 0.8)',
    color: '#fff',
    cursor: 'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    whiteSpace: 'nowrap',
  },
  searchError: {
    color: '#ff6b6b',
    fontSize: '12px',
    fontWeight: '500',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    textAlign: 'center',
    maxWidth: '220px',
  },
  toggleButton: {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    zIndex: 101,
    pointerEvents: 'auto',
    padding: '12px 40px',
    minWidth: '120px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    color: '#000',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
};
