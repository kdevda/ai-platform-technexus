import React from 'react';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30 transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] relative animate-fadeIn">
        <button 
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-white text-gray-500 hover:text-gray-700 transition-colors duration-200 z-10 w-8 h-8 rounded-full shadow-lg flex items-center justify-center"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <iframe
          src="https://calendly.com/technexus_ca/technexus-ai-loan-management-system-intro"
          className="w-full h-full rounded-xl"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default CalendlyModal; 