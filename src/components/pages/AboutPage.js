import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useAuth } from '../../hooks/useAuth';

const AboutPage = ({ onLogin, onSignup, onNavigate }) => {
  // Use auth context to check if user is authenticated
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onLogin={onLogin} 
        onSignup={onSignup} 
        onNavigate={onNavigate} 
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={logout}
      />

      <div className="bg-indigo-700">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              About RadixID
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              A decentralized identity system built on Radix DLT
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Decentralized Identity</h2>
              
              <div className="prose max-w-none">
                <p>
                  RadixID is a decentralized identity (DID) system built on the Radix ledger. 
                  It enables users to create, manage, and control their digital identities without 
                  relying on centralized authorities.
                </p>
                
                <h3>What is a Decentralized Identifier (DID)?</h3>
                
                <p>
                  A DID is a new type of identifier that enables verifiable, self-sovereign digital identity. 
                  Unlike traditional usernames or email addresses, DIDs are:
                </p>
                
                <ul>
                  <li><strong>Decentralized:</strong> Not dependent on any centralized registry or authority</li>
                  <li><strong>Persistent:</strong> Can last as long as needed</li>
                  <li><strong>Cryptographically verifiable:</strong> Proves control using cryptography</li>
                  <li><strong>Biometrically secured:</strong> Enhanced with facial recognition</li>
                </ul>
                
                <p>
                  In RadixID, your DID is securely linked to your Radix wallet and facial biometrics, 
                  allowing for multi-factor authentication while maintaining your privacy.
                </p>
                
                <h3>How RadixID Works</h3>
                
                <p>
                  The RadixID system operates through several key components:
                </p>
                
                <ol>
                  <li><strong>Wallet-based authentication:</strong> Your Radix wallet serves as the primary factor</li>
                  <li><strong>Facial biometrics:</strong> Your facial scan serves as the second factor</li>
                  <li><strong>DID creation:</strong> A unique decentralized identifier is generated and linked to your wallet</li>
                  <li><strong>Cryptographic verification:</strong> You prove ownership through digital signatures</li>
                  <li><strong>Token-based access:</strong> Secure access to applications using DID-based tokens</li>
                </ol>
                
                <div className="bg-blue-50 p-6 rounded-lg my-8">
                  <h3 className="text-lg font-medium text-blue-800 mb-3">Passwordless Authentication Flow</h3>
                  <ol className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">1</span>
                      <span>Connect your Radix wallet to initiate authentication</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">2</span>
                      <span>Sign a challenge message with your wallet's private key</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">3</span>
                      <span>Complete facial verification as a second factor</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">4</span>
                      <span>Receive a secure authentication token for protected resources</span>
                    </li>
                  </ol>
                </div>
                
                <p>
                  When you authenticate with RadixID, the system issues a secure token that applications 
                  can verify without ever seeing your private keys, biometric data, or personal information.
                </p>
                
                <h3>Benefits of Biometric Authentication</h3>
                
                <ul>
                  <li><strong>Enhanced security:</strong> Adds a "something you are" factor to authentication</li>
                  <li><strong>Improved user experience:</strong> No passwords to remember or enter</li>
                  <li><strong>Phishing resistance:</strong> Biometrics can't be stolen through deception</li>
                  <li><strong>Verified presence:</strong> Confirms the actual user is present, not just their device</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy and Security</h2>
              
              <div className="prose max-w-none">
                <p>
                  Our facial recognition implementation prioritizes privacy and security:
                </p>
                
                <ul>
                  <li><strong>On-device processing:</strong> Facial biometrics are processed locally on your device</li>
                  <li><strong>Zero storage of raw images:</strong> Raw facial images are never stored or transmitted</li>
                  <li><strong>Encrypted templates:</strong> Only encrypted mathematical templates derived from your face are used</li>
                  <li><strong>No central database:</strong> Your biometric data isn't stored in a central location</li>
                </ul>
                
                <h3>Security Measures</h3>
                
                <ul>
                  <li><strong>Cryptographic security:</strong> Industry-standard encryption for all operations</li>
                  <li><strong>Blockchain immutability:</strong> Identity records cannot be altered once created</li>
                  <li><strong>Ledger-based verification:</strong> All authentications are verified on-chain</li>
                  <li><strong>Open-source code:</strong> Transparent implementation that can be audited</li>
                </ul>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        While RadixID offers significant security advantages, always ensure you're using the system on a trusted device in a private location.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Comparison with Traditional Identity Systems</h2>
              
              <div className="prose max-w-none">
                <p>
                  Here's how RadixID compares to traditional centralized identity systems:
                </p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
                    <thead>
                      <tr>
                        <th className="border-b border-gray-300 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                        <th className="border-b border-gray-300 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Traditional Systems</th>
                        <th className="border-b border-gray-300 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RadixID (DID)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Data Control</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Controlled by service providers</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Controlled by users</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Authentication</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Password-based</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Cryptographic + Biometric</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Single Point of Failure</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes (central database)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No (distributed ledger)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Phishing Risk</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">High</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Very Low</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Data Sharing</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">All-or-nothing approach</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Selective disclosure</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Censorship Resistance</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Low (accounts can be suspended)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">High (self-sovereign)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
              
              <div className="prose max-w-none">
                <p>
                  Ready to take control of your digital identity? Here's how to get started with RadixID:
                </p>
                
                <ol>
                  <li>
                    <strong>Set up a Radix wallet</strong>
                    <p>If you don't already have one, download a compatible Radix wallet app and create a new wallet.</p>
                  </li>
                  <li>
                    <strong>Sign up for RadixID</strong>
                    <p>Click the "Sign Up" button on the home page and connect your wallet.</p>
                  </li>
                  <li>
                    <strong>Enroll your facial biometrics</strong>
                    <p>Complete the facial scan enrollment process to set up your biometric verification factor.</p>
                  </li>
                  <li>
                    <strong>Explore the dashboard</strong>
                    <p>Manage your identity, credentials, and connected applications from your personal dashboard.</p>
                  </li>
                </ol>
                
                <div className="mt-8 flex justify-center">
                  {!isAuthenticated ? (
                    <>
                      <button 
                        onClick={() => onNavigate('landing')}
                        className="px-6 py-3 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-100 transition-colors mr-4"
                      >
                        Return Home
                      </button>
                      <button 
                        onClick={onSignup}
                        className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Create Your RadixID
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => onNavigate('dashboard')}
                      className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Go to Your Dashboard
                    </button>
                  )}
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

export default AboutPage;