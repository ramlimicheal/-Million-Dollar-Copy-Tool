
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="text-center p-8 flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500 mx-auto"></div>
      <h2 className="text-2xl font-semibold text-gray-300 mt-6">Quantum Analysis in Progress...</h2>
      <p className="text-gray-500 mt-2">Orchestrating AI agents to reverse-engineer the target website.</p>
    </div>
  );
};
