import React from 'react';
import { Copy, Check, Lightbulb, Volume2, RefreshCw, Download } from 'lucide-react';

export default function OutputSection({
  isEnglishToMorse, 
  outputText, 
  copyToClipboard, 
  playMorseAudio, 
  startBlinkingMorseCode, 
  toggleLoop, 
  isPlaying, 
  isLightset, 
  isLooping,  
  copied, 
  generateMorseAudioBlob
}) {
    
    const handleDownload = async () => {
        try {
          const audioBlob = await generateMorseAudioBlob();
          const url = URL.createObjectURL(audioBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'morse-code-audio.wav';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Failed to generate or download audio:', error);
        }
      };
      
  return (
    <section className="bg-white shadow-lg rounded-lg p-6 flex-1">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {isEnglishToMorse ? "Morse Code" : "English"}
      </h2>
      <div className="bg-gray-100 p-4 rounded-md relative min-h-[10rem] max-h-[10rem] overflow-auto">
        <p className="break-words text-gray-700 font-mono text-lg">{outputText}</p>
      </div>
      <div className="relative flex space-x-2 mt-4">
        <button
          onClick={copyToClipboard}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300 ease-in-out"
          title="Copy to clipboard"
        >
          {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
        </button>
        <button
          onClick={handleDownload}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300 ease-in-out"
          title="Download Audio"
        >
          <Download size={20} />
        </button>
        <button
          onClick={() => startBlinkingMorseCode(false)}
          className={`p-2 ${isLightset ? 'bg-blue-300' : 'bg-blue-200 hover:bg-blue-300'} rounded-full transition duration-300 ease-in-out`}
          title="Light Bulb"
        >
          <Lightbulb size={20} />
        </button>
        <button
          onClick={() => playMorseAudio()}
          className={`p-2 ${isPlaying ? 'bg-blue-300' : 'bg-blue-200 hover:bg-blue-300'} rounded-full transition duration-300 ease-in-out`}
          title="Play Audio"
        >
          <Volume2 size={20} />
        </button>
        <button
          onClick={toggleLoop}
          className={`p-2 ${isLooping ? 'bg-blue-300' : 'bg-blue-200 hover:bg-blue-300'} rounded-full transition duration-300 ease-in-out`}
          title="Loop"
        >
          <RefreshCw size={20} />
        </button>
      </div>
    </section>
  );
}
