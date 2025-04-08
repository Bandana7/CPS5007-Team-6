import React, { useState, useEffect } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useAuth } from '../../hooks/useAuth';

const ProtectedContent = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [accountFormData, setAccountFormData] = useState({
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    age: ''
  });
  const [selectedFields, setSelectedFields] = useState({
    email: true,
    firstName: true,
    middleName: false,
    lastName: true,
    age: false
  });
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Simulate loading state
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Mock token data
  const tokenData = {
    issuedAt: new Date().toLocaleString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString(), // 24 hours from now
    accessLevel: 'Premium',
    verificationFactors: ['Wallet Signature', 'Facial Biometrics']
  };

  // Handle field selection toggle
  const toggleFieldSelection = (field) => {
    setSelectedFields({
      ...selectedFields,
      [field]: !selectedFields[field]
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountFormData({
      ...accountFormData,
      [name]: value
    });
  };

  // Handle account creation
  const handleCreateAccount = (e) => {
    e.preventDefault();
    
    // Create a new account with only the selected fields
    const newAccount = {};
    
    // Only include selected fields that have values
    Object.keys(selectedFields).forEach(field => {
      if (selectedFields[field] && accountFormData[field]) {
        newAccount[field] = accountFormData[field];
      }
    });
    
    // Add a unique id and timestamp
    newAccount.id = Date.now();
    newAccount.created = new Date().toLocaleString();
    
    // Add to accounts list
    setAccounts([...accounts, newAccount]);
    
    // Reset form
    setAccountFormData({
      email: '',
      firstName: '',
      middleName: '',
      lastName: '',
      age: ''
    });
    
    // Hide form
    setShowAccountForm(false);
  };

  // Handle account deletion
  const deleteAccount = (id) => {
    setAccounts(accounts.filter(account => account.id !== id));
    setDeleteConfirmId(null);
  };

  // Open delete confirmation
  const confirmDelete = (id) => {
    setDeleteConfirmId(id);
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Verifying your identity...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onNavigate={onNavigate} 
        isAuthenticated={true} 
        user={user}
        onLogout={logout}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-indigo-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">Premium Content</h1>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  Authenticated Access
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-indigo-800">Multi-Factor Authentication</h3>
                    <p className="mt-1 text-sm text-indigo-700">
                      You're viewing this page because both your wallet signature and facial biometrics have been verified.
                    </p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-4">Radix Ecosystem Insider Report</h2>
              
              <div className="prose max-w-none">
                <p>
                  Welcome to the exclusive Radix ecosystem insider report, only available to authenticated users. 
                  This content demonstrates multi-factor authentication using wallet signatures and facial recognition.
                </p>
                
                <blockquote>
                  <p>"Biometric authentication combined with wallet signatures creates a seamless yet highly secure experience."</p>
                </blockquote>
              </div>
              
              <div className="not-prose">
                <div className="bg-gray-50 rounded-lg p-4 my-6">
                  <h4 className="font-medium text-gray-900 mb-4">Your Current Session</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Access Level</p>
                      <p className="font-medium text-gray-900">{tokenData.accessLevel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Verification Method</p>
                      <p className="font-medium text-gray-900">{tokenData.verificationFactors.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Session Started</p>
                      <p className="font-medium text-gray-900">{tokenData.issuedAt}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Session Expires</p>
                      <p className="font-medium text-gray-900">{tokenData.expiresAt}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Account Management Section */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Account Management</h3>
                  <button
                    onClick={() => setShowAccountForm(!showAccountForm)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {showAccountForm ? 'Cancel' : 'Create Account'}
                  </button>
                </div>
                
                {showAccountForm && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Create New Account</h4>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Select fields to include:</p>
                      <div className="flex flex-wrap gap-3">
                        {Object.keys(selectedFields).map((field) => (
                          <button
                            key={field}
                            onClick={() => toggleFieldSelection(field)}
                            className={`px-3 py-1 rounded-full text-xs ${
                              selectedFields[field]
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            {selectedFields[field] ? ' ✓' : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <form onSubmit={handleCreateAccount}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedFields.email && (
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={accountFormData.email}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        )}
                        
                        {selectedFields.firstName && (
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                              First Name
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={accountFormData.firstName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        )}
                        
                        {selectedFields.middleName && (
                          <div>
                            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700 mb-1">
                              Middle Name
                            </label>
                            <input
                              type="text"
                              id="middleName"
                              name="middleName"
                              value={accountFormData.middleName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        )}
                        
                        {selectedFields.lastName && (
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={accountFormData.lastName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        )}
                        
                        {selectedFields.age && (
                          <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                              Age
                            </label>
                            <input
                              type="number"
                              id="age"
                              name="age"
                              value={accountFormData.age}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-6">
                        <button
                          type="submit"
                          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          Create Account
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Account List */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Your Accounts ({accounts.length})</h4>
                  
                  {accounts.length > 0 ? (
                    <div className="space-y-4">
                      {accounts.map(account => (
                        <div key={account.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                          {deleteConfirmId === account.id ? (
                            <div className="bg-red-50 p-3 rounded-md mb-3">
                              <p className="text-red-800 text-sm mb-2">Are you sure you want to delete this account?</p>
                              <div className="flex space-x-3">
                                <button
                                  onClick={() => deleteAccount(account.id)}
                                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                                >
                                  Yes, Delete
                                </button>
                                <button
                                  onClick={cancelDelete}
                                  className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between">
                              <div>
                                {account.firstName && (
                                  <span className="font-medium">
                                    {account.firstName} {account.middleName ? account.middleName + ' ' : ''}{account.lastName}
                                  </span>
                                )}
                                {!account.firstName && account.email && (
                                  <span className="font-medium">{account.email}</span>
                                )}
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500 mr-3">Created: {account.created}</span>
                                <button
                                  onClick={() => confirmDelete(account.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          )}
                          
                          {deleteConfirmId !== account.id && (
                            <div className="mt-2 space-y-1">
                              {account.email && (
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Email:</span> {account.email}
                                </p>
                              )}
                              {account.age && (
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Age:</span> {account.age}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8 border border-dashed border-gray-300 rounded-lg">
                      No accounts created yet. Click "Create Account" to get started.
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-8 flex space-x-4">
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProtectedContent;