import React, { useState, useRef, useEffect } from 'react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children, className = '' }) => {
  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 ${className}`}>
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full">
        {children}
      </div>
    </div>
  );
};

interface DialogTriggerProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, onClick, className = '' }) => {
  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
};

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogContent: React.FC<DialogContentProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`mb-6 ${className}`}>
      {children}
    </div>
  );
};

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ children, className = '' }) => {
  return (
    <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
  );
};

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogDescription: React.FC<DialogDescriptionProps> = ({ children, className = '' }) => {
  return (
    <p className={`text-gray-500 mt-1 ${className}`}>{children}</p>
  );
};

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogFooter: React.FC<DialogFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex justify-end space-x-2 mt-6 ${className}`}>
      {children}
    </div>
  );
}; 