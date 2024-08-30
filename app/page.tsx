"use client";
import { useState, useEffect } from "react";
import Leftsidebar from "@/components/Leftsidebar";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { fetchData } from "@/components/fetchData";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Clear the token from localStorage on initial load
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setLoading(false);
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    fetchUserData(token);
  };

  const fetchUserData = (token: string) => {
    fetchData(token)
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch(() => {
        setUserData(null);
        setLoading(false);
      });
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
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <div className="flex">
            <Leftsidebar />
            <div className="flex-1 p-4 flex flex-col items-center justify-center border border-gray-300 bg-gray-800 text-white">
              {/* Centered Content */}
              <div className="text-center">
                {loading ? (
                  <p>Loading...</p>
                ) : userData && userData.data && userData.data.length > 0 ? (
                  userData.data.map((mail: any) => (
                    <div key={mail.id} className="bg-gray-700 p-4 mb-4 rounded-lg">
                      <h3 className="text-xl font-semibold">{mail.subject}</h3>
                      <p className="text-gray-400">From: {mail.fromName} ({mail.fromEmail})</p>
                      <p className="text-gray-400">To: {mail.toName} ({mail.toEmail})</p>
                      <p className="text-gray-400">Date: {new Date(mail.sentAt).toLocaleDateString()}</p>
                      <div dangerouslySetInnerHTML={{ __html: mail.body }} />
                    </div>
                  ))
                ) : (
                  <div className="text-center">
                    <div className="relative mb-6">
                      <Image
                        src="/empty.png"
                        alt="Empty inbox"
                        width={500}
                        height={300}
                        className="rounded-lg"
                      />
                    </div>
                    <h2 className="text-2xl font-semibold mb-4">
                      It's the beginning of a legendary sales pipeline
                    </h2>
                    <p className="mb-6">
                      When you have inbound E-mails you'll see them here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
