import React from 'react';

// Simple Slot polyfill for radix-ui/react-slot
export const Slot = React.forwardRef(({ children, ...props }, ref) => {
  const child = React.Children.only(children);
  
  if (React.isValidElement(child)) {
    return React.cloneElement(child, {
      ...props,
      ref: ref || child.ref,
    });
  }
  
  return children;
});

Slot.displayName = 'Slot';
