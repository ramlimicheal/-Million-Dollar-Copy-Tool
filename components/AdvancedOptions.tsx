import React from 'react';
import { ModelKey, IndustryKey, AVAILABLE_MODELS, INDUSTRY_TEMPLATES } from '../services/geminiService';

interface AdvancedOptionsProps {
  selectedModel: ModelKey;
  setSelectedModel: (model: ModelKey) => void;
  selectedIndustry: IndustryKey;
  setSelectedIndustry: (industry: IndustryKey) => void;
  analysisMode: 'standard' | 'deep' | 'quick';
  setAnalysisMode: (mode: 'standard' | 'deep' | 'quick') => void;
  analysisType: 'single' | 'comparison' | 'modelComparison';
  setAnalysisType: (type: 'single' | 'comparison' | 'modelComparison') => void;
}

export const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
  selectedModel,
  setSelectedModel,
  selectedIndustry,
  setSelectedIndustry,
  analysisMode,
  setAnalysisMode,
  analysisType,
  setAnalysisType,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-4 mb-6">
      <h3 className="text-xl font-semibold text-blue-400 mb-4">⚙️ Advanced Options</h3>

      {/* Analysis Type */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Analysis Type
        </label>
        <select
          value={analysisType}
          onChange={(e) => setAnalysisType(e.target.value as any)}
          className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="single">Single URL Analysis</option>
          <option value="comparison">Competitor Comparison (Multi-URL)</option>
          <option value="modelComparison">Model Comparison (Same URL, Multiple AI Models)</option>
        </select>
      </div>

      {/* AI Model Selection */}
      {analysisType !== 'modelComparison' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            AI Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value as ModelKey)}
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(AVAILABLE_MODELS).map(([key, model]) => (
              <option key={key} value={key}>
                {model.name} - {model.quality} quality, {model.speed} ({model.cost} cost)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Industry Template */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Industry Template
        </label>
        <select
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value as IndustryKey)}
          className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.keys(INDUSTRY_TEMPLATES).map((key) => (
            <option key={key} value={key}>
              {key === 'generic' ? 'Generic (All Industries)' : key.toUpperCase()}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Industry-specific analysis focuses on relevant features and patterns
        </p>
      </div>

      {/* Analysis Depth */}
      {analysisType === 'single' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Analysis Depth
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['quick', 'standard', 'deep'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setAnalysisMode(mode)}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  analysisMode === mode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
