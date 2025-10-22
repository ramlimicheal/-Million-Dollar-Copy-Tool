
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
        🚀 Million Dollar Copy Tool
      </h1>
      <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
        Analyze any website and generate a complete PRD for replication using a multi-agent AI system.
      </p>
    </header>
  );
};
