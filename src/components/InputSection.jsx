import React from 'react';
import { ArrowLeftRight } from 'lucide-react';

export default function InputSection({ 
    isEnglishToMorse, 
    inputText, 
    handleInputChange, 
    charCount, 
    handleTranslate, 
    handleSwap 
}) {
  return (
    <section className="bg-white shadow-lg rounded-lg p-6 flex-1">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {isEnglishToMorse ? "English" : "Morse Code"}
      </h2>
      <textarea
        rows="5"
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-600 transition duration-300 ease-in-out resize-none"
        placeholder={isEnglishToMorse ? "Type your message here..." : "Enter Morse code..."}
        value={inputText}
        onChange={handleInputChange}
      />
      <p className="text-gray-600 text-sm mt-1">{charCount} characters remaining</p>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleTranslate}
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out"
        >
          Translate
        </button>
        <button
          onClick={handleSwap}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out"
        >
          <ArrowLeftRight size={20} />
        </button>
      </div>
    </section>
  );
}
