import React, { useState } from 'react';

interface CompetitorInputProps {
  onAnalyze: (urls: string[]) => void;
  isLoading: boolean;
}

export const CompetitorInput: React.FC<CompetitorInputProps> = ({ onAnalyze, isLoading }) => {
  const [urls, setUrls] = useState<string[]>(['', '', '']);

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    setUrls([...urls, '']);
  };

  const removeUrlField = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls);
  };

  const handleSubmit = () => {
    const validUrls = urls.filter(url => url.trim() !== '');
    if (validUrls.length === 0) {
      alert('Please enter at least one URL');
      return;
    }
    onAnalyze(validUrls);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-semibold text-blue-400 mb-4">🔍 Competitor URLs</h3>

      {urls.map((url, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => handleUrlChange(index, e.target.value)}
            placeholder={`Competitor ${index + 1} URL (e.g., https://example.com)`}
            className="flex-1 bg-gray-700 text-gray-200 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {urls.length > 1 && (
            <button
              onClick={() => removeUrlField(index)}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <div className="flex gap-2">
        <button
          onClick={addUrlField}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded font-medium transition-colors"
        >
          + Add Another URL
        </button>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded font-medium transition-colors"
        >
          {isLoading ? 'Analyzing Competitors...' : 'Compare Competitors'}
        </button>
      </div>

      <p className="text-xs text-gray-500">
        Tip: Add 2-5 competitor URLs for the best comparative analysis
      </p>
    </div>
  );
};
