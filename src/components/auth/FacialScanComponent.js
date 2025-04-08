import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { processFacialScan } from '../../services/facialScan';

const FacialScanComponent = ({ onComplete, onCancel, isEnrollment = false }) => {
  const [scanStage, setScanStage] = useState('initial'); // initial, scanning, processing, success, error
  const [message, setMessage] = useState(isEnrollment ? 'Register your facial biometrics' : 'Verify your identity');
  const [error, setError] = useState(null);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

  // Clean up function to stop camera when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startScan = async () => {
    setScanStage('scanning');
    setMessage('Position your face in the frame');
    
    try {
      // Access user's camera
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        } 
      });
      
      streamRef.current = stream;
      
      // Connect stream to video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setScanStage('error');
      setError('Unable to access camera. Please check permissions and try again.');
    }
  };

  const captureImage = () => {
    setScanStage('processing');
    setMessage(isEnrollment ? 'Processing facial registration...' : 'Processing facial verification...');
    
    // Create a canvas to capture the image
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (canvas && video) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get image data
      const imageData = canvas.toDataURL('image/jpeg');
      
      // Process the facial scan (API call or local processing)
      processFacialScan(imageData, isEnrollment)
        .then(() => {
          // Stop the camera stream
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
          }
          
          setScanStage('success');
          setMessage(isEnrollment ? 'Facial registration successful!' : 'Facial verification successful!');
          
          // Notify parent component of successful verification after a delay
          setTimeout(() => {
            onComplete();
          }, 1000);
        })
        .catch(err => {
          setScanStage('error');
          setError(err.message || 'Facial verification failed. Please try again.');
        });
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {isEnrollment ? 'Facial Biometric Registration' : 'Facial Verification'}
      </h3>
      
      {/* Status message */}
      <p className="text-gray-600 mb-6 text-center">{message}</p>
      
      {/* Error message */}
      {error && (
        <p className="text-red-600 mb-4 text-center">{error}</p>
      )}
      
      {/* Video display for camera */}
      <div className="relative mb-6 w-full max-w-md">
        {scanStage === 'initial' ? (
          <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
            <Camera size={64} className="text-gray-400" />
          </div>
        ) : (
          <>
            <video 
              ref={videoRef}
              className={`w-full rounded-lg border-2 ${
                scanStage === 'scanning' ? 'border-indigo-500' : 
                scanStage === 'processing' ? 'border-yellow-500' : 
                scanStage === 'success' ? 'border-green-500' : 'border-red-500'
              }`}
              autoPlay
              playsInline
              muted
            />
            
            {/* Overlay guides for face positioning */}
            {scanStage === 'scanning' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 border-4 border-dashed border-indigo-400 rounded-full opacity-70"></div>
              </div>
            )}
            
            {/* Canvas for capturing the image (hidden) */}
            <canvas ref={canvasRef} className="hidden" />
          </>
        )}
        
        {/* Status indicator */}
        {scanStage !== 'initial' && (
          <div className="absolute bottom-4 left-4 flex items-center bg-black bg-opacity-60 px-3 py-1 rounded-full">
            {scanStage === 'scanning' && (
              <>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-white text-sm">Scanning</span>
              </>
            )}
            {scanStage === 'processing' && (
              <>
                <div className="w-3 h-3 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-white text-sm">Processing</span>
              </>
            )}
            {scanStage === 'success' && (
              <>
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-white text-sm">Verified</span>
              </>
            )}
            {scanStage === 'error' && (
              <>
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-white text-sm">Error</span>
              </>
            )}
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="flex space-x-4 w-full max-w-md">
        {scanStage === 'initial' && (
          <>
            <button 
              onClick={startScan} 
              className="flex-1 px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {isEnrollment ? 'Start Facial Registration' : 'Start Facial Scan'}
            </button>
            <button 
              onClick={onCancel}
              className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </>
        )}
        
        {scanStage === 'scanning' && (
          <>
            <button 
              onClick={captureImage} 
              className="flex-1 px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Capture
            </button>
            <button 
              onClick={onCancel}
              className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </>
        )}
        
        {(scanStage === 'processing' || scanStage === 'success') && (
          <button 
            disabled
            className="flex-1 px-4 py-3 bg-gray-300 text-gray-500 font-medium rounded-lg cursor-not-allowed"
          >
            {scanStage === 'processing' ? 'Processing...' : 'Verified'}
          </button>
        )}
        
        {scanStage === 'error' && (
          <>
            <button 
              onClick={startScan} 
              className="flex-1 px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={onCancel}
              className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </>
        )}
      </div>
      
      {/* Privacy note */}
      <p className="text-xs text-gray-500 mt-6 text-center">
        {isEnrollment 
          ? 'Your facial biometrics are processed securely and not stored as raw images.'
          : 'Your facial scan is processed locally and not stored. It\'s used only for authentication.'}
      </p>
    </div>
  );
};

export default FacialScanComponent;