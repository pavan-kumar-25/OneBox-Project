import React from 'react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <nav className="bg-gray-800 dark:bg-gray-900 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <span className="text-white text-xl font-bold">OneBox</span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="bg-gray-700 dark:bg-gray-600 text-white px-3 py-2 rounded focus:outline-none"
          aria-label="Toggle Dark Mode"
          onClick={toggleTheme}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <div className="relative">
          <button className="bg-gray-700 dark:bg-gray-600 text-white px-3 py-2 rounded focus:outline-none">
            Tim&apos;s workshop <span className="ml-2">&#9662;</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
