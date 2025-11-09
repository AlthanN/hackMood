"use client"

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function StatsHUD() {
  const [moodData, setMoodData] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Try to get mood data from URL query parameters first
    const moodFromUrl = searchParams.get('mood');

    if (moodFromUrl) {
      // Parse data from URL parameters
      const moodData = {
        mood: searchParams.get('mood'),
        confidence: parseInt(searchParams.get('confidence')) || 0,
        category: searchParams.get('category') || 'Unknown',
        tracksAnalyzed: parseInt(searchParams.get('tracksAnalyzed')) || 0,
        tracksSkipped: parseInt(searchParams.get('tracksSkipped')) || 0,
      };
      setMoodData(moodData);
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

  if (!moodData) {
    return null;
  }

  return (
    <div style={styles.hudContainer}>
      {/* Left side - Score calculation stats */}
      <div style={styles.leftPanel}>
        <div style={styles.panel}>
          <div style={styles.title}>🎵 Mood Analysis</div>
          <div style={styles.stat}>
            <span style={styles.label}>Mood:</span>
            <span style={styles.value}>{moodData.category}</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.label}>Confidence:</span>
            <span style={styles.value}>{moodData.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Right side - Songs processed */}
      <div style={styles.rightPanel}>
        <div style={styles.panel}>
          <div style={styles.title}>📊 Processing Stats</div>
          <div style={styles.stat}>
            <span style={styles.label}>Tracks Analyzed:</span>
            <span style={styles.value}>{moodData.tracksAnalyzed || 'N/A'}</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.label}>Tracks Skipped:</span>
            <span style={styles.value}>{moodData.tracksSkipped || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
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
    background: 'rgba(15, 15, 15, 0.85)',
    border: '2px solid #1DB954',
    borderRadius: '12px',
    padding: '16px 20px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(29, 185, 84, 0.2)',
    minWidth: '280px',
  },
  title: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1DB954',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  stat: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
  },
  label: {
    color: '#b3b3b3',
    fontWeight: '600',
    marginRight: '12px',
  },
  value: {
    color: '#1ed760',
    fontWeight: '700',
    fontFamily: '"Courier New", monospace',
  },
};
