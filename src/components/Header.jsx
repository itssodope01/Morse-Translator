import React from 'react';
import PNG from './assets/morse-code.png';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-500 flex items-center">
          <img src={PNG} alt="Logo" className="mr-2 max-w-8 max-h-8" /> MorseCode
        </h1>
        <nav>
          <button>
            <a 
              href="https://buymeacoffee.com/pritamchk" 
              target='_blank' 
              className='text-slate-600 hover:text-gray-900 cursor-pointer' 
              rel="noreferrer"
            >
              Donate
            </a>
          </button>
        </nav>
      </div>
    </header>
  );
}
