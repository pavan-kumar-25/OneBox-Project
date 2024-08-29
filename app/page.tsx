"use client";
import { useState, useEffect } from "react";
import Leftsidebar from "@/components/Leftsidebar";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import Image from "next/image"; // Import Next.js Image component

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {isLoggedIn ? (
        <>
          <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <div className="flex">
            <Leftsidebar />
            <div className="flex-1 p-4 flex flex-col items-center justify-center border border-gray-300 bg-gray-800 text-white">
              {/* Centered Content */}
              <div className="text-center">
                {/* Image with Text Below */}
                <div className="relative mb-6">
                  <Image
                    src="/empty.png" // Update with the path to your image
                    alt="Descriptive Alt Text"
                    width={500} // Use natural width if known
                    height={300} // Use natural height if known
                    className="rounded-lg"
                  />
                </div>
                <h2 className="text-2xl font-semibold mb-4">
                  It’s the beginning of a legendary sales pipeline
                </h2>
                <p className="mb-6">
                  When you have inbound E-mails you’ll see them here
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} /> // Pass a callback to handle login
      )}
    </div>
  );
}
