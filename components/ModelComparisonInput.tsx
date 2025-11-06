import React, { useState } from 'react';
import { ModelKey, AVAILABLE_MODELS } from '../services/geminiService';

interface ModelComparisonInputProps {
  onAnalyze: (url: string, models: ModelKey[]) => void;
  isLoading: boolean;
}

export const ModelComparisonInput: React.FC<ModelComparisonInputProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');
  const [selectedModels, setSelectedModels] = useState<ModelKey[]>(['gemini-2.5-flash', 'gemini-1.5-pro']);

  const toggleModel = (model: ModelKey) => {
    if (selectedModels.includes(model)) {
      setSelectedModels(selectedModels.filter(m => m !== model));
    } else {
      setSelectedModels([...selectedModels, model]);
    }
  };

  const handleSubmit = () => {
    if (!url.trim()) {
      alert('Please enter a URL');
      return;
    }
    if (selectedModels.length === 0) {
      alert('Please select at least one model');
      return;
    }
    onAnalyze(url, selectedModels);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-semibold text-blue-400 mb-4">🔬 Model Comparison</h3>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Target URL
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Models to Compare
        </label>
        <div className="space-y-2">
          {Object.entries(AVAILABLE_MODELS).map(([key, model]) => (
            <label key={key} className="flex items-center gap-3 p-3 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedModels.includes(key as ModelKey)}
                onChange={() => toggleModel(key as ModelKey)}
                className="w-4 h-4"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-200">{model.name}</div>
                <div className="text-xs text-gray-400">
                  {model.quality} quality • {model.speed} • {model.cost} cost
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || selectedModels.length === 0}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded font-medium transition-colors"
      >
        {isLoading ? `Comparing ${selectedModels.length} Models...` : `Compare ${selectedModels.length} Model${selectedModels.length !== 1 ? 's' : ''}`}
      </button>

      <p className="text-xs text-gray-500">
        Compare different AI models to see which provides the best analysis for your needs
      </p>
    </div>
  );
};
