import React, { useState } from 'react';
import { connectWallet, signChallenge } from '../../services/walletService';

const WalletConnector = ({ onComplete, onCancel }) => {
  const [status, setStatus] = useState('initial'); // initial, connecting, signing, success, error
  const [error, setError] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');

  const handleConnect = async () => {
    try {
      setStatus('connecting');
      
      // Connect to the wallet
      const address = await connectWallet();
      setWalletAddress(address);
      
      // Generate and sign a challenge
      setStatus('signing');
      const signature = await signChallenge(address);
      
      // Complete with success
      setStatus('success');
      onComplete({ address, signature });
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Failed to connect wallet');
    }
  };

  return (
    <div className="flex flex-col p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Connect Radix Wallet</h3>
      
      {/* Status message */}
      <div className="mb-6">
        {status === 'initial' && (
          <p className="text-gray-600">
            Connect your Radix wallet to authenticate. You'll need to sign a message to verify your identity.
          </p>
        )}
        
        {status === 'connecting' && (
          <p className="text-gray-600">
            Connecting to your wallet. Please approve the connection request.
          </p>
        )}
        
        {status === 'signing' && (
          <p className="text-gray-600">
            Please sign the challenge message to verify your identity.
          </p>
        )}
        
        {status === 'success' && (
          <p className="text-green-600">
            Wallet connected and signature verified successfully!
          </p>
        )}
        
        {status === 'error' && (
          <p className="text-red-600">
            {error || 'An error occurred during wallet connection.'}
          </p>
        )}
      </div>
      
      {/* Wallet connection visualization */}
      <div className="flex justify-center mb-6">
        {status === 'initial' && (
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        )}
        
        {status === 'connecting' && (
          <div className="w-12 h-12 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {status === 'signing' && (
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        )}
        
        {status === 'success' && (
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        
        {status === 'error' && (
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between">
        {status === 'initial' && (
          <>
            <button
              onClick={handleConnect}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Connect Wallet
            </button>
          </>
        )}
        
        {(status === 'connecting' || status === 'signing') && (
          <button
            onClick={onCancel}
            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
        
        {status === 'success' && (
          <button
            onClick={() => onComplete({ address: walletAddress })}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Continue
          </button>
        )}
        
        {status === 'error' && (
          <>
            <button
              onClick={handleConnect}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Retry
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default WalletConnector;