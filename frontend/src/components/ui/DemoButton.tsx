import React, { useState } from 'react';
import CalendlyModal from './CalendlyModal';

interface DemoButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const DemoButton: React.FC<DemoButtonProps> = ({ 
  className = "bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors",
  children = "Schedule a Demo"
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className={className}
      >
        {children}
      </button>
      
      <CalendlyModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default DemoButton; 