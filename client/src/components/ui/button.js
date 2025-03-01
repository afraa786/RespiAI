import React from 'react';

export function Button({ 
  children, 
  className = '', 
  variant = 'default', 
  size = 'md',
  icon,
  ...props 
}) {
  // Define variant classes
  const variantClasses = {
    default: 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-2 border-purple-600 text-purple-700 hover:bg-purple-50',
    ghost: 'bg-transparent hover:bg-purple-50 text-purple-700',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg',
  };

  // Define size classes
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  // Combined classes
  const buttonClasses = `
    rounded-lg 
    font-medium 
    transition-all 
    duration-300 
    transform 
    hover:-translate-y-0.5 
    focus:outline-none 
    focus:ring-2 
    focus:ring-purple-500 
    focus:ring-opacity-50
    ${variantClasses[variant] || variantClasses.default} 
    ${sizeClasses[size] || sizeClasses.md}
    ${className}
  `;

  return (
    <button
      className={buttonClasses}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </div>
    </button>
  );
}
