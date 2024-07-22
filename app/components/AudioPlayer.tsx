import React from "react";

interface AudioPlayerProps {
  audioSrc: string;
}

export default function AudioPlayer({ audioSrc }: AudioPlayerProps) {
  return (
    <audio controls src={audioSrc} className="w-full">
      Your browser does not support the audio element.
    </audio>
  );
}
