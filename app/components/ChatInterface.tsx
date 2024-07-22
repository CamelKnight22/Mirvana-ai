"use client";
import React, { useState, useRef, useEffect, Suspense } from "react";
import AudioRecorder from "./AudioRecorder";
import { Canvas } from "@react-three/fiber";
import { FirstPersonControls, Loader } from "@react-three/drei";
import { Room } from "./Onebedroom";
import { useAudio } from "./AudioContext";

interface PopupProps {
  onClose: () => void;
}
// New 3D Popup component
const Popup = ({ onClose }: PopupProps): JSX.Element => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-[90vw] h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-slate-800">
          <h2 className="text-xl font-bold">One Bedroom in LIV Munro</h2>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
        <div className="flex-grow">
          <Canvas camera={{ fov: 50, position: [0, 0, 5] }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Room scale={0.03} position={[2, -1.8, 1.3]} />
            </Suspense>
            <FirstPersonControls
              lookSpeed={0.2}
              lookVertical={false}
              movementSpeed={2.5}
            />
          </Canvas>
          <Loader />
        </div>
      </div>
    </div>
  );
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [audioResponse, setAudioResponse] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { setIsPlaying } = useAudio();

  useEffect(() => {
    if (audioResponse && audioRef.current) {
      audioRef.current.src = audioResponse;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.error("Error playing audio:", e));
    }
  }, [audioResponse, setIsPlaying]);

  useEffect(() => {
    const handleAudioEnd = () => setIsPlaying(false);
    audioRef.current?.addEventListener("ended", handleAudioEnd);
    return () => audioRef.current?.removeEventListener("ended", handleAudioEnd);
  }, [setIsPlaying]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage &&
      lastMessage.role === "assistant" &&
      lastMessage.content
        .toLowerCase()
        .includes("one-bedroom apartment in liv munro")
    ) {
      setShowPopup(true);
    }
  }, [messages]);

  const handleSendMessage = async (audioBlob: Blob) => {
    // Convert audio to text using Whisper
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");
    const whisperResponse = await fetch("/api/openai", {
      method: "POST",
      body: formData,
    });
    const { text } = await whisperResponse.json();

    // Add user message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: text },
    ]);

    // Get AI response
    const aiResponse = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...messages, { role: "user", content: text }],
      }),
    });
    const { message, audio } = await aiResponse.json();

    // Add AI message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: message },
    ]);
    setAudioResponse(audio);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow bg-gray-100 p-4 rounded-lg overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                msg.role === "user" ? "bg-blue-500 text-white" : "bg-lime-500"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <div className="flex justify-center items-center">
          <AudioRecorder onRecordingComplete={handleSendMessage} />
        </div>
        <audio ref={audioRef} className="w-full mt-2" controls />
      </div>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
