import React, { useState } from 'react';
import LandingPage from './components/pages/LandingPage';
import Dashboard from './components/pages/Dashboard';
import ProtectedContent from './components/pages/ProtectedContent';
import AboutPage from './components/pages/AboutPage';
import LoginModal from './components/auth/LoginModal';
import SignupModal from './components/auth/SignupModal';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // Navigation handlers
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Modal handlers
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  // Render the appropriate page
  const renderPage = () => {
    switch(currentPage) {
      case 'landing':
        return (
          <LandingPage 
            onLogin={openLoginModal} 
            onSignup={openSignupModal} 
            onNavigate={navigateTo} 
          />
        );
      case 'dashboard':
        return isAuthenticated ? (
          <Dashboard onNavigate={navigateTo} />
        ) : (
          <LandingPage 
            onLogin={openLoginModal} 
            onSignup={openSignupModal} 
            onNavigate={navigateTo} 
          />
        );
      case 'protected':
        return isAuthenticated ? (
          <ProtectedContent onNavigate={navigateTo} />
        ) : (
          <LandingPage 
            onLogin={openLoginModal} 
            onSignup={openSignupModal} 
            onNavigate={navigateTo} 
          />
        );
      case 'about':
        return (
          <AboutPage 
            onLogin={openLoginModal} 
            onSignup={openSignupModal} 
            onNavigate={navigateTo} 
          />
        );
      default:
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-300">404</h1>
              <h2 className="text-2xl font-medium text-gray-700 mt-4">Page Not Found</h2>
              <p className="text-gray-500 mt-2">The page you're looking for doesn't exist or has been moved.</p>
              <button 
                onClick={() => navigateTo('landing')}
                className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {renderPage()}
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} onNavigate={navigateTo} />}
      {isSignupModalOpen && <SignupModal onClose={closeSignupModal} onNavigate={navigateTo} />}
    </>
  );
};

export default App;