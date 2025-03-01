import React from 'react';

export function Progress({ value, className, ...props }) {
  return (
    <div className={`h-2 rounded-full overflow-hidden ${className}`} {...props}>
      <div
        className="h-full bg-purple-600 transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
