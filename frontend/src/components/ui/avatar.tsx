import React, { useState } from 'react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  shape = 'circle',
  status,
  className = '',
  ...props
}) => {
  const [imgError, setImgError] = useState(false);
  
  // Size styles
  const sizeStyles = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl'
  };
  
  // Shape styles
  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-md'
  };
  
  // Status styles 
  const statusStyles = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  };
  
  // Generate default initials if not provided
  const defaultInitials = alt
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  
  // Avatar styles
  const avatarStyles = `${sizeStyles[size]} ${shapeStyles[shape]} overflow-hidden ${className}`;
  
  // Handle image error or no image provided
  const handleImgError = () => {
    setImgError(true);
  };
  
  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`relative flex items-center justify-center bg-gray-200 ${avatarStyles}`}
        {...props}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={handleImgError}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-300 font-medium text-gray-800">
            {initials || defaultInitials}
          </div>
        )}
      </div>
      
      {status && (
        <span
          className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${statusStyles[status]}`}
        />
      )}
    </div>
  );
}; 