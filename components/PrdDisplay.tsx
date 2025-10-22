
import React, { useState, useEffect } from 'react';

interface PrdDisplayProps {
  content: string;
}

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

export const PrdDisplay: React.FC<PrdDisplayProps> = ({ content }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setIsCopied(true);
    });
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg shadow-lg p-1 animate-fade-in">
      <div className="flex justify-between items-center bg-gray-800 p-3 rounded-t-lg border-b border-gray-700">
        <h3 className="text-lg font-bold text-gray-200">Generated Product Requirements Document</h3>
        <button
          onClick={handleCopy}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            isCopied
              ? 'bg-green-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="p-6">
        {/* Using <pre> to preserve whitespace and formatting of the markdown-like text */}
        <pre className="whitespace-pre-wrap break-words font-mono text-gray-300 text-sm leading-relaxed">
            {content}
        </pre>
      </div>
    </div>
  );
};
