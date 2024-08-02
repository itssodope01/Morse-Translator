import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function VisualFeedback({ isLightOn }) {
  return (
    <section className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Visual Representation</h2>
      <Lightbulb
        size={80}
        className={`${
          isLightOn ? 'text-yellow-400 filter drop-shadow-lg animate-pulse' : 'text-gray-400'
        } transition-colors duration-300`}
      />
      <p className="mt-4 text-gray-600 text-center">
        Watch the lightbulb blink to visualize your Morse code!
      </p>
    </section>
  );
}
