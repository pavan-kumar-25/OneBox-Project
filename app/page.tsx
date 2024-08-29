"use client"
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Leftsidebar from "@/components/Leftsidebar";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <header
        className={`flex items-center justify-between p-4 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-semibold">Inbox</h1>
        </div>
        <div className="flex items-center space-x-4">
          <UserButton 
            showName
          />
          <button
            onClick={toggleTheme}
            className={`p-2 rounded ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-800"
            }`}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>

      <div
        className={`p-4 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >

        <Leftsidebar/>
        <h2>It’s the beginning of a legendary sales pipeline</h2>
        <p>When you have inbound E-mails you’ll see them here</p>
      </div>
    </>
  );
}
