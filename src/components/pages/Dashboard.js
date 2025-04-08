import React, { useState } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [showToken, setShowToken] = useState(false);

  // Mock data for demo purposes
  const userData = {
    did: user?.did || 'did:radix:rd1qvde0wfy4qfln0742tguqcryg8htk44xucagf3qfcnj2vxdcm3c',
    walletAddress: user?.walletAddress || 'rdx1qsp0jkap0n46q33wnj3vl0zmzuhqcdl5m3nylfwx0gsr8u8e93',
    connectedSince: new Date().toLocaleString()
  };

  // Helper function to truncate string with ellipsis
  const truncateMiddle = (str, startChars = 10, endChars = 10) => {
    if (!str) return '';
    if (str.length <= startChars + endChars) return str;
    return `${str.substring(0, startChars)}...${str.substring(str.length - endChars)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onNavigate={onNavigate} 
        isAuthenticated={true} 
        user={user}
        onLogout={logout}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
          
          {/* Overview Content */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Identity Overview</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Decentralized Identifier (DID)</h3>
                  <div className="flex items-center">
                    <p className="text-gray-900 font-mono break-all">
                      {userData.did}
                    </p>
                    <button 
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      onClick={() => {
                        navigator.clipboard.writeText(userData.did);
                        alert('DID copied to clipboard');
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Connected Wallet</h3>
                  <div className="flex items-center">
                    <p className="text-gray-900 font-mono">{truncateMiddle(userData.walletAddress)}</p>
                    <button 
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      onClick={() => {
                        navigator.clipboard.writeText(userData.walletAddress);
                        alert('Wallet address copied to clipboard');
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Biometric Status</h3>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <p className="text-gray-900">Facial recognition enrolled and active</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Session Information</h3>
                  <p className="text-gray-900">Connected since: {userData.connectedSince}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-500">Current Session Token</h3>
                    <button
                      onClick={() => setShowToken(prev => !prev)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {showToken ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                  {showToken ? (
                    <div className="bg-gray-100 p-3 rounded-md font-mono text-sm overflow-x-auto">
                      <p className="text-gray-700 break-all">eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6cmFkaXg6cmQxcXZkZTB3Znk0cWZsbjA3NDJ0Z3VxY3J5ZzhodGs0NHh1Y2FnZjNxZmNuajJ2eGRjbTNjIiwiaXNzIjoiUmFkaXhJRCIsImV4cCI6MTcwOTc0ODcwMCwiaWF0IjoxNzA5NzQ2OTAwfQ.WkfBSdMXBZm7KJiLR2BGDVvGzPnN-8tPD-aHZY7yJsm</p>
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">Token hidden for security</p>
                  )}
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Protected Content Access</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-gray-900 mb-2">Premium DeFi Dashboard</h4>
                    <p className="text-gray-600 text-sm mb-4">Access advanced DeFi analytics and trading tools.</p>
                    <button 
                      onClick={() => onNavigate('protected')}
                      className="text-indigo-600 font-medium text-sm hover:text-indigo-800"
                    >
                      Access Now →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;