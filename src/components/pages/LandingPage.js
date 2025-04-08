import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const LandingPage = ({ onLogin, onSignup, onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header 
        onLogin={onLogin} 
        onSignup={onSignup} 
        onNavigate={onNavigate} 
        isAuthenticated={false} 
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Decentralized Identity on Radix
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Secure, private, and truly yours with passwordless biometric authentication.
              Built on Radix DLT for unmatched security and user experience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={onSignup}
                className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 bg-white rounded-lg shadow-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Choose RadixID?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Self-Sovereign</h3>
                <p className="text-gray-600">
                  You own your identity. No central authorities, no third-party control.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Biometric Security</h3>
                <p className="text-gray-600">
                  Facial recognition combined with wallet signatures for maximum security.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Passwordless</h3>
                <p className="text-gray-600">
                  No passwords to remember or reset. Just you and your wallet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How It Works
            </h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Connect Your Wallet</h3>
                  <p className="text-gray-600 mb-4">
                    Start by connecting your Radix wallet. Your wallet address forms the foundation of your decentralized identity.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>No personal information required</li>
                    <li>You control your private keys</li>
                    <li>Sign a challenge to prove ownership</li>
                  </ul>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="w-48 h-48 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:order-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Register Facial Biometrics</h3>
                  <p className="text-gray-600 mb-4">
                    Securely register your facial biometrics as a second authentication factor.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Processed locally on your device</li>
                    <li>Only encrypted templates are stored</li>
                    <li>No raw images ever leave your device</li>
                  </ul>
                </div>
                <div className="md:w-1/2 md:order-1 flex justify-center">
                  <div className="w-48 h-48 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Access With No Passwords</h3>
                  <p className="text-gray-600 mb-4">
                    Login and access secure resources with your wallet and face. No passwords to forget or manage.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Multi-factor security by default</li>
                    <li>Phishing-resistant authentication</li>
                    <li>Works across devices and applications</li>
                  </ul>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="w-48 h-48 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Take Control of Your Digital Identity?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get started with RadixID today and experience the future of secure, passwordless authentication.
            </p>
            <button 
              onClick={onSignup}
              className="px-8 py-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors text-lg"
            >
              Create Your RadixID
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;