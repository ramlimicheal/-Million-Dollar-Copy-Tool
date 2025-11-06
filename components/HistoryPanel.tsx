import React, { useState, useEffect } from 'react';
import { getAnalysisHistory } from '../services/geminiService';

interface HistoryPanelProps {
  onSelectAnalysis: (analysis: string) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ onSelectAnalysis }) => {
  const [history, setHistory] = useState(getAnalysisHistory());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setHistory(getAnalysisHistory());
  }, []);

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="text-lg font-semibold text-blue-400">
          📚 Analysis History ({history.length})
        </h3>
        <span className="text-gray-400">{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer transition-colors"
              onClick={() => onSelectAnalysis(item.analysis)}
            >
              <div className="font-medium text-gray-200 truncate">{item.url}</div>
              <div className="text-xs text-gray-400">
                {new Date(item.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
