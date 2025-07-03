
import React from 'react';

interface YesNoButtonProps {
  onClick: () => void;
  label: string;
  isLoading: boolean;
}

const YesNoButton: React.FC<YesNoButtonProps> = ({ onClick, label, isLoading }) => {
  return (
    <button
      className="btn btn-primary btn-lg"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : label}
    </button>
  );
};

export default YesNoButton;
