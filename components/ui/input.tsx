'use client';

import React, { InputHTMLAttributes, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  initialValue: string | number;
}

export const Input: React.FC<InputProps> = ({ initialValue, ...props }) => {
  const [state, setState] = useState(initialValue);
  return (
    <input
      {...props}
      value={state}
      onChange={(e) => setState(() => e.target.value)}
    />
  );
};
