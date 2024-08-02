export const morseCodeMapping = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
  'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
  'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
  'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
  'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
  'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '0': '-----', ' ': '/',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
  '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
  '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
  '@': '.--.-.', '£': '...-..-', '$': '...-..-'
};


export const translateToMorse = (text) => {
  return text.toUpperCase().split('').map(char => morseCodeMapping[char] || '').join(' ');
};


export const translateFromMorse = (morseCode) => {
  const reverseMorseCodeMapping = Object.fromEntries(
    Object.entries(morseCodeMapping).map(([key, value]) => [value, key])
  );

  return morseCode
    .split(' ')
    .map(code => {
      if (code === '/') return ' ';
      return reverseMorseCodeMapping[code] || '';
    })
    .join('');
};


export const isValidMorseCode = (morseCode) => {
  const validMorseCharacters = new Set(Object.values(morseCodeMapping).concat(['/']));
  return morseCode.split(' ').every(code => validMorseCharacters.has(code));
};
