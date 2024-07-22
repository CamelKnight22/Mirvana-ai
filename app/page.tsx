"use client";
import React, { Suspense } from "react";
import ChatInterface from "./components/ChatInterface";
import { Model } from "./components/Mirvana";
import { Loader, PresentationControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Office } from "./components/Office";
import { AudioProvider, useAudio } from "./components/AudioContext";

const ModelWrapper = () => {
  const { isPlaying } = useAudio();

  return (
    <Model
      position={[0, -2, 0]}
      rotation={[0, 0, 0]}
      scale={1.5}
      animationControl={{
        mode: "continuous",
        animation: isPlaying ? "talk" : "idle",
        animationSpeed: 1,
      }}
    />
  );
};

export default function Home() {
  return (
    <AudioProvider>
      <div className="h-screen w-screen flex flex-col bg-slate-500">
        <div className="h-1/2 w-full bg-white">
          <Canvas camera={{ fov: 40, position: [0.3, 0.2, 1.5] }}>
            <Suspense fallback={null}>
              <PresentationControls
                config={{ mass: 2, tension: 200 }}
                snap
                global
                polar={[-Math.PI / 8.8, Math.PI / 8.8]}
                azimuth={[-Math.PI / 8.8, Math.PI / 5]}
              >
                <ambientLight intensity={0.6} />
                <pointLight position={[0.5, 1, 1]} intensity={0.3} />
                <pointLight position={[-0.5, 0.7, 1]} intensity={1} />
                <ModelWrapper />
                <Office position={[0, -1.6, -1.5]} />
              </PresentationControls>
            </Suspense>
          </Canvas>
          <Loader />
        </div>
        <div className="h-1/2 w-full bg-gradient-to-r from-blue-500 to-slate-800 p-4 flex flex-col ">
          <h1 className="text-3xl font-bold mb-4 text-white">Mirvac 3D AI</h1>
          <div className="flex-grow overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      </div>
    </AudioProvider>
  );
}
