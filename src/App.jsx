import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import VisualFeedback from './components/VisualFeedback';
import Footer from './components/Footer';
import { translateToMorse, translateFromMorse, isValidMorseCode } from './utils/morseCode';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isEnglishToMorse, setIsEnglishToMorse] = useState(true);
  const [isLightOn, setIsLightOn] = useState(false);
  const [isLightset, setIsLightset] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [charCount, setCharCount] = useState(500);

  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const blinkIntervalRef = useRef(null);
  const morseCodeRef = useRef('');

  const DOT_DURATION = 300;
  const DASH_DURATION = 600;
  const INTER_ELEMENT_SPACE = 200; 
  const INTER_WORD_SPACE = 800;

  useEffect(() => {
    if (outputText && isEnglishToMorse) {
      morseCodeRef.current = outputText;
    } else if (outputText && !isEnglishToMorse && isValidMorseCode(inputText)) {
      morseCodeRef.current = inputText;
    }
  }, [outputText, inputText, isEnglishToMorse]);

  useEffect(() => {
    if (isLooping) {
      playMorseAudio();
      startBlinkingMorseCode();
    } else {
      stopAudio();
      stopBlinkingMorseCode();
    }
  }, [isLooping]);

  const handleTranslate = () => {
    if (!inputText) {
      return;
    }
    if (inputText.length > 500) {
      alert("Input exceeds the 500 character limit.");
      return;
    }
    if (isEnglishToMorse) {
      setOutputText(translateToMorse(inputText));
    } else {
      setOutputText(translateFromMorse(inputText));
    }
  };

  const handleSwap = () => {
    setIsEnglishToMorse(prevState => !prevState);
    setInputText('');
    setOutputText('');
    setCharCount(500);
    morseCodeRef.current = '';
  };

  const startBlinkingMorseCode = (loop = true) => {
    if (morseCodeRef.current === '') {
      return
    }
    if (isLightset) {
      stopBlinkingMorseCode();
      return;
    }
    setIsLightset(true);
    let index = 0;
    const morseCode = morseCodeRef.current;
    blinkIntervalRef.current = setInterval(() => {
      if (index >= morseCode.length) {
        if (!loop) {
          stopBlinkingMorseCode();
          return;
        }
        index = 0;
      }
      const symbol = morseCode[index];
      switch (symbol) {
        case '.':
          toggleLight(DOT_DURATION); 
          break;
        case '-':
          toggleLight(DASH_DURATION);
          break;
        default:
          setIsLightOn(false);
          break;
      }
      index++;
    }, DOT_DURATION + INTER_ELEMENT_SPACE); 
  };

  const stopBlinkingMorseCode = () => {
    if (blinkIntervalRef.current) {
      clearInterval(blinkIntervalRef.current);
    }
    setIsLightOn(false);
    setIsLightset(false);
  };

  const toggleLight = (duration) => {
    setIsLightOn(true);
    setTimeout(() => setIsLightOn(false), duration);
  };

  const playMorseAudio = () => {
    if (morseCodeRef.current === '') {
      return;
    }
    if (isPlaying) {
      stopAudio();
      return;
    }
    setIsPlaying(true);

    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    oscillatorRef.current = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillatorRef.current.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillatorRef.current.type = 'sine';
    oscillatorRef.current.frequency.setValueAtTime(600, audioContextRef.current.currentTime);

    let currentTime = audioContextRef.current.currentTime;

    const morseCode = morseCodeRef.current;
    morseCode.split('').forEach((char) => {
      switch (char) {
        case '.':
          gainNode.gain.setValueAtTime(1, currentTime);
          currentTime += DOT_DURATION / 1000;
          gainNode.gain.setValueAtTime(0, currentTime);
          currentTime += INTER_ELEMENT_SPACE / 1000;
          break;
        case '-':
          gainNode.gain.setValueAtTime(1, currentTime);
          currentTime += DASH_DURATION / 1000; 
          gainNode.gain.setValueAtTime(0, currentTime);
          currentTime += INTER_ELEMENT_SPACE / 1000;
          break;
        case ' ':
          currentTime += INTER_WORD_SPACE / 1000; 
          break;
        default:
          currentTime += INTER_ELEMENT_SPACE / 1000; 
      }
    });

    oscillatorRef.current.start();
    oscillatorRef.current.stop(currentTime);

    oscillatorRef.current.onended = () => {
      setIsPlaying(false);
      stopAudio();
      if (isLooping) {
        playMorseAudio();
      }
    };
  };

  const stopAudio = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
  
    if (audioContextRef.current) {
      audioContextRef.current.close().then(() => {
        audioContextRef.current = null;
        setIsPlaying(false);
      }).catch((error) => {
        setIsPlaying(false);
      });
    }
  };

  const toggleLoop = () => {
    if (morseCodeRef.current === '') {
      return;
    }
    if (!isLooping) {
      if (isPlaying || isLightset) {
        if (isPlaying ) {
          stopAudio();
        }
        if (isLightset) {
          stopBlinkingMorseCode();
        }
      }
    }
    setIsLooping(prevState => !prevState);
  };

  useEffect(() => {
    if (!isLightset && !isPlaying && isLooping) {
      toggleLoop();
    }
  }, [isLightset, isPlaying]);

  const copyToClipboard = () => {
    if (morseCodeRef.current === '') {
      return;
    }
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length > 500) {
      const lastSpaceIndex = newValue.lastIndexOf(' ', 500);
      const truncatedValue = lastSpaceIndex === -1 ? newValue.slice(0, 500) : newValue.slice(0, lastSpaceIndex);
      setInputText(truncatedValue);
      setCharCount(500 - truncatedValue.length);
    } else {
      setInputText(newValue);
      setCharCount(500 - newValue.length);
    }
  };
  

  const generateMorseAudioBlob = () => {
    return new Promise((resolve) => {
      if (morseCodeRef.current === '') {
        resolve(new Blob([]));
        return;
      }
  
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const sampleRate = audioContext.sampleRate;
      const duration = (morseCodeRef.current.length * (DOT_DURATION + INTER_ELEMENT_SPACE)) / 1000;
      const audioBuffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
      const bufferData = audioBuffer.getChannelData(0);
  
      let currentTime = 0;
  
      morseCodeRef.current.split('').forEach((char) => {
        const startSample = Math.floor(currentTime * sampleRate);
        switch (char) {
          case '.':
            fillBuffer(bufferData, startSample, currentTime, DOT_DURATION / 1000, sampleRate);
            currentTime += DOT_DURATION / 1000 + INTER_ELEMENT_SPACE / 1000;
            break;
          case '-':
            fillBuffer(bufferData, startSample, currentTime, DASH_DURATION / 1000, sampleRate);
            currentTime += DASH_DURATION / 1000 + INTER_ELEMENT_SPACE / 1000;
            break;
          case ' ':
            currentTime += INTER_WORD_SPACE / 1000;
            break;
          default:
            break;
        }
      });
  
      const wavBlob = bufferToWave(audioBuffer, 0, audioBuffer.length);
      resolve(wavBlob);
    });
  };
  
  const fillBuffer = (bufferData, startSample, currentTime, duration, sampleRate) => {
    const endSample = Math.floor((currentTime + duration) * sampleRate);
    for (let i = startSample; i < endSample; i++) {
      bufferData[i] = 0.5 * Math.sin(2 * Math.PI * 600 * i / sampleRate);
    }
  };
  

  function bufferToWave(abuffer, offset, len) {
    const numOfChan = abuffer.numberOfChannels,
          length = len * numOfChan * 2 + 44,
          e = new Uint8Array(length),
          view = new DataView(e.buffer);
  
    let chan, i, sample, pos = 0;
  
    function writeString(s) {
      for (let i = 0; i < s.length; i++) {
        e[pos++] = s.charCodeAt(i);
      }
    }
  
    writeString('RIFF');
    view.setUint32(pos, length - 8, true);
    pos += 4;
    writeString('WAVE');
    writeString('fmt ');
    view.setUint32(pos, 16, true);
    pos += 4;
    view.setUint16(pos, 1, true);
    pos += 2;
    view.setUint16(pos, numOfChan, true);
    pos += 2;
    view.setUint32(pos, abuffer.sampleRate, true);
    pos += 4;
    view.setUint32(pos, abuffer.sampleRate * 2 * numOfChan, true);
    pos += 4;
    view.setUint16(pos, numOfChan * 2, true);
    pos += 2;
    view.setUint16(pos, 16, true);
    pos += 2;
    writeString('data');
    view.setUint32(pos, length - pos - 4, true);
    pos += 4;
  
    const channelData = abuffer.getChannelData(0);
    for (i = 0; i < channelData.length; i++) {
      sample = Math.max(-1, Math.min(1, channelData[i]));
      sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
      view.setInt16(pos, sample, true);
      pos += 2;
    }
  
    return new Blob([e], { type: 'audio/wav' });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            <InputSection
              isEnglishToMorse={isEnglishToMorse}
              inputText={inputText}
              handleInputChange={handleInputChange}
              charCount={charCount}
              handleTranslate={handleTranslate}
              handleSwap={handleSwap}
            />
            <OutputSection
              isEnglishToMorse={isEnglishToMorse}
              outputText={outputText}
              copyToClipboard={copyToClipboard}
              playMorseAudio={playMorseAudio}
              startBlinkingMorseCode={startBlinkingMorseCode}
              toggleLoop={toggleLoop}
              isPlaying={isPlaying}
              isLightset={isLightset}
              isLooping={isLooping}
              copied={copied}
              generateMorseAudioBlob={generateMorseAudioBlob}
            />
          </div>
          <VisualFeedback isLightOn={isLightOn} />
        </div>
      </main>
      <Footer />
    </div>
  );
}