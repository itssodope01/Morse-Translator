# Morse Code Translator and Audio Player

This application allows you to translate text between English and Morse code, play Morse code audio, visualize Morse code as light blinks, and download Morse code audio as a WAV file. It's a handy tool for learning and working with Morse code.

Deployed: [Morse-Code-Translator](https://itssodope01.github.io/Morse-Translator/)

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
   - [Clone the Repository](#clone-the-repository)
   - [Install Dependencies](#install-dependencies)
   - [Configure Tailwind CSS](#configure-tailwind-css)
4. [Usage](#usage)
   - [Running the Application](#running-the-application)
   - [Downloading Audio](#downloading-audio)
5. [Contributing](#contributing)
6. [License](#license)

## Features

- Text Translation: Convert text to Morse code and vice versa.
- Audio Playback: Listen to Morse code as audio using sine wave tones.
- Visual Feedback: Visualize Morse code as blinking light signals.
- Looping: Toggle looping of Morse code audio and light signals.
- Clipboard Support: Copy translated Morse code or text to the clipboard.
- Download Audio: Download the Morse code audio as a WAV file.

## Technologies Used

- React
- JavaScript
- Web Audio API
- Tailwind CSS
- Vite

## Installation

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/itssodope01/Morse-Translator.git
cd morse-code-translator
```

### Install Dependencies

Install the required dependencies using npm or Yarn:

```bash
npm install
```

or

```bash
yarn install
```

### Configure Tailwind CSS

To configure Tailwind CSS, follow these steps:

1. Install Tailwind CSS and its peer dependencies:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

   or

   ```bash
   yarn add -D tailwindcss postcss autoprefixer
   ```

2. Generate Tailwind configuration files:

   ```bash
   npx tailwindcss init -p
   ```

   This will create a `tailwind.config.js` file and a `postcss.config.js` file in your project directory.

3. Configure Tailwind to remove unused styles in production:

   Edit `tailwind.config.js` and add the paths to all of your template files:

   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
       "./public/index.html",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

4. Include Tailwind in your CSS:

   Create a `src/index.css` file (or modify an existing CSS file) and add the following directives:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. Import the CSS file in your entry point:

   Make sure to import the CSS file in your `src/main.jsx` or `src/App.jsx`:

   ```js
   import './index.css';
   ```

## Usage

### Running the Application

To start the development server and view the application in your browser, run:

```bash
npm run dev
```

or

```bash
yarn dev
```

### Downloading Audio

To download the Morse code audio:

1. Click the "Download Audio" button in the Output Section. This will generate a WAV file of the Morse code audio and prompt you to save it.

## Contributing

Contributions are welcome! If you have suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

To contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.