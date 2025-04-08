import React from 'react';

const Header = ({ onLogin, onSignup, onNavigate, isAuthenticated, user, onLogout }) => {
  // Helper function to truncate string with ellipsis
  const truncateMiddle = (str, startChars = 6, endChars = 4) => {
    if (!str) return '';
    if (str.length <= startChars + endChars) return str;
    return `${str.substring(0, startChars)}...${str.substring(str.length - endChars)}`;
  };

  // Navigation handlers that preserve authentication state
  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div 
            className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center cursor-pointer"
            onClick={() => handleNavigation('landing')}
          >
            <span className="text-white font-bold text-xl">DID</span>
          </div>
          <span 
            className="ml-2 text-xl font-semibold text-gray-800 cursor-pointer"
            onClick={() => handleNavigation('landing')}
          >
            RadixID
          </span>
        </div>
        
        {/* Navigation - show different options depending on auth state */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => handleNavigation('dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('protected')}
                className="text-gray-600 hover:text-gray-900"
              >
                Premium Content
              </button>
              <button 
                onClick={() => handleNavigation('about')}
                className="text-gray-600 hover:text-gray-900"
              >
                About
              </button>
            </nav>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 hidden md:block">
                {user?.did ? truncateMiddle(user.did) : 'Authenticated'}
              </div>
              <button 
                onClick={onLogout}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => handleNavigation('landing')}
                className="text-gray-600 hover:text-gray-900"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('about')}
                className="text-gray-600 hover:text-gray-900"
              >
                About
              </button>
            </nav>
            
            <div className="flex space-x-4">
              {onLogin && (
                <button 
                  onClick={onLogin}
                  className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition-colors"
                >
                  Login
                </button>
              )}
              {onSignup && (
                <button 
                  onClick={onSignup}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;