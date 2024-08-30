import React, { useEffect } from 'react';

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  useEffect(() => {
    // Check for token in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      // If token is present, call onLogin
      onLogin(token);
      // Remove token from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [onLogin]);

  const handleGoogleSignIn = () => {
    // Redirect to the Google login URL
    window.location.href = 'https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=https://localhost:3000';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      {/* Navbar with logo and name */}
      <div className="absolute top-0 w-full flex justify-center p-6">
        <div className="flex items-center space-x-2">
          <div className="text-white text-2xl font-bold">REACHINBOX</div>
        </div>
      </div>

      {/* Login Card */}
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-80 flex flex-col">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create a new account</h2>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>

        <button
          className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded mb-6"
          onClick={() => onLogin('mock-token')} // Simulate login for account creation
        >
          Create new account
        </button>

        <p className="text-center text-gray-400">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;