import React, { useState } from 'react';
import WalletConnector from './WalletConnector';
import FacialScanComponent from './FacialScanComponent';
import { useAuth } from '../../hooks/useAuth';
import { signupWithCredentials } from '../../services/api';

const SignupModal = ({ onClose, onNavigate }) => {
  const { signup } = useAuth();
  const [authStage, setAuthStage] = useState('initial'); // initial, wallet, facial, complete
  const [walletData, setWalletData] = useState(null);
  const [error, setError] = useState(null);

  // Handle wallet connection completion
  const handleWalletComplete = (data) => {
    setWalletData(data);
    setAuthStage('facial');
  };

  // Handle facial enrollment completion
  const handleFacialComplete = async () => {
    try {
      setAuthStage('complete');
      
      // Call API to complete the signup with wallet and facial data
      const { token, user } = await signupWithCredentials({
        walletAddress: walletData.address,
        walletSignature: walletData.signature,
        facialEnrolled: true
      });
      
      // Complete signup
      await signup(token, user);
      
      // Close the modal after a short delay and navigate to protected content
      setTimeout(() => {
        onClose();
        onNavigate('protected'); // Navigate to protected content after successful signup
      }, 1500);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      setAuthStage('initial');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Create RadixID</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
            {error}
          </div>
        )}

        {/* Multi-step authentication process */}
        {authStage === 'initial' && (
          <div>
            <p className="text-gray-600 mb-6">
              Create your decentralized identity with your Radix wallet and facial biometrics. No passwords needed.
            </p>
            <button 
              onClick={() => setAuthStage('wallet')}
              className="w-full px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
            >
              Begin Registration
            </button>
          </div>
        )}

        {authStage === 'wallet' && (
          <WalletConnector 
            onComplete={handleWalletComplete} 
            onCancel={() => setAuthStage('initial')} 
          />
        )}

        {authStage === 'facial' && (
          <FacialScanComponent 
            onComplete={handleFacialComplete} 
            onCancel={() => setAuthStage('wallet')} 
            isEnrollment={true}
          />
        )}

        {authStage === 'complete' && (
          <div className="flex flex-col items-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Registration Successful!</h3>
            <p className="text-gray-600 mb-4 text-center">
              Your decentralized identity has been created with wallet connection and facial biometrics.
            </p>
            <p className="text-gray-500 text-sm">Redirecting to protected content...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupModal;