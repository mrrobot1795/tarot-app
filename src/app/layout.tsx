'use client';

import './globals.css';
import React, { useState, useRef, useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPlaying, setIsPlaying] = useState(false); // Start with audio paused
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Start playing the music on the first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().catch(() => null); // Catch autoplay errors silently
        setIsPlaying(true);
      }
      // Remove the event listener after the first interaction
      window.removeEventListener('click', handleFirstInteraction);
    };

    // Add the event listener to detect first user interaction
    window.addEventListener('click', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, [isPlaying]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Tarot Card Reading App</title>
      </head>
      <body>
        {/* Background Music */}
        <audio ref={audioRef} loop style={{ display: 'none' }}>
          <source src="/background-music.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        {/* Custom Play/Pause Button */}
        <div className="audio-controls">
          <button onClick={togglePlayPause} className="play-pause-button">
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>

        {children}
      </body>
    </html>
  );
}
