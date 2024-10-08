"use client";

import "./globals.css";
import React, { useState, useRef, useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => null);
      }
      window.removeEventListener("click", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Tarot Card Reading App</title>
      </head>
      <body>
        <audio ref={audioRef} loop style={{ display: "none" }}>
          <source src="/background-music.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <div className="audio-controls">
          <button onClick={togglePlayPause} className="play-pause-button">
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>

        {children}
      </body>
    </html>
  );
}
