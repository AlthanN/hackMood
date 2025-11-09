"use client"

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function StatsHUD() {
  const [moodData, setMoodData] = useState(null);
  const [tracksData, setTracksData] = useState(null);
  const [expandedMood, setExpandedMood] = useState(true);
  const [expandedTracks, setExpandedTracks] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Try to get mood data from URL query parameters first
    const moodFromUrl = searchParams.get('mood');
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
        mood: searchParams.get('mood'),
        confidence: parseInt(searchParams.get('confidence')) || 0,
        category: searchParams.get('category') || 'Unknown',
        tracksAnalyzed: parseInt(searchParams.get('tracksAnalyzed')) || 0,
        tracksSkipped: parseInt(searchParams.get('tracksSkipped')) || 0,
        distribution: distribution,
      };
      setMoodData(moodData);

      // Fetch recently listened tracks
      fetchRecentlyListenedTracks();
    } else {
      // Fallback to localStorage if URL params not available
      try {
        const storedMood = localStorage.getItem('userMoodResult');
        if (storedMood) {
          const moodResult = JSON.parse(storedMood);
          setMoodData(moodResult);
        }
      } catch (error) {
        console.error('Error parsing mood data:', error);
      }
    }
  }, [searchParams]);

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

  if (!moodData) {
    return null;
  }

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
      <div style={styles.hudContainer}>
        {/* Left side - Mood Analysis with distribution */}
      <div style={styles.leftPanel}>
        <div
          style={{
            ...styles.panel,
            ...styles.leftPanelContent,
            ...(expandedMood ? {} : styles.panelCollapsed)
          }}
          onClick={() => setExpandedMood(!expandedMood)}
        >
          <div style={styles.title}>🎵 Mood Analysis</div>
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

      {/* Right side - Recently Listened Tracks */}
      <div style={styles.rightPanel}>
        <div
          style={{
            ...styles.panel,
            ...(expandedTracks ? styles.rightPanelContent : styles.rightPanelContentCollapsed)
          }}
          onClick={() => setExpandedTracks(!expandedTracks)}
        >
          <div style={styles.title}>🎧 Top 50 Tracks</div>

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
    </div>
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
    padding: '20px',
    boxSizing: 'border-box',
  },
  leftPanel: {
    pointerEvents: 'auto',
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
    padding: '16px 20px',
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
    fontSize: '14px',
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
};
