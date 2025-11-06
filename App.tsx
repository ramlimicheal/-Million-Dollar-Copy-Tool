
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UrlInputForm } from './components/UrlInputForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { PrdDisplay } from './components/PrdDisplay';
import { ErrorDisplay } from './components/ErrorDisplay';
import { WelcomeMessage } from './components/WelcomeMessage';
import { AdvancedOptions } from './components/AdvancedOptions';
import { CompetitorInput } from './components/CompetitorInput';
import { ModelComparisonInput } from './components/ModelComparisonInput';
import { HistoryPanel } from './components/HistoryPanel';
import { ExportOptions } from './components/ExportOptions';
import {
  analyzeWebsite,
  compareCompetitors,
  compareModels,
  generateCodeFromPRD,
  saveAnalysisHistory,
  ModelKey,
  IndustryKey,
} from './services/geminiService';

const App: React.FC = () => {
  // Basic state
  const [targetUrl, setTargetUrl] = useState<string>('');
  const [prdContent, setPrdContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Advanced options state
  const [selectedModel, setSelectedModel] = useState<ModelKey>('gemini-2.5-flash');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryKey>('generic');
  const [analysisMode, setAnalysisMode] = useState<'standard' | 'deep' | 'quick'>('standard');
  const [analysisType, setAnalysisType] = useState<'single' | 'comparison' | 'modelComparison'>('single');

  // Single URL analysis
  const handleAnalyze = useCallback(async () => {
    if (!targetUrl.trim()) {
      setError('Please enter a valid URL.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setPrdContent(null);

    try {
      const result = await analyzeWebsite({
        targetUrl,
        model: selectedModel,
        industry: selectedIndustry,
        analysisMode,
      });
      setPrdContent(result);
      saveAnalysisHistory(targetUrl, result);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(
        err instanceof Error
          ? `An error occurred during analysis: ${err.message}`
          : 'An unknown error occurred. Please check the console for details.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [targetUrl, selectedModel, selectedIndustry, analysisMode]);

  // Competitor comparison
  const handleCompetitorComparison = useCallback(async (urls: string[]) => {
    setIsLoading(true);
    setError(null);
    setPrdContent(null);

    try {
      const result = await compareCompetitors({
        targetUrls: urls,
        model: selectedModel,
        industry: selectedIndustry,
      });
      setPrdContent(result);
      saveAnalysisHistory(`Comparison: ${urls.join(', ')}`, result);
    } catch (err) {
      console.error('Comparison failed:', err);
      setError(
        err instanceof Error
          ? `An error occurred during comparison: ${err.message}`
          : 'An unknown error occurred. Please check the console for details.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedModel, selectedIndustry]);

  // Model comparison
  const handleModelComparison = useCallback(async (url: string, models: ModelKey[]) => {
    setIsLoading(true);
    setError(null);
    setPrdContent(null);

    try {
      const result = await compareModels({
        targetUrl: url,
        models,
        industry: selectedIndustry,
      });
      setPrdContent(result);
      saveAnalysisHistory(`Model Comparison: ${url}`, result);
    } catch (err) {
      console.error('Model comparison failed:', err);
      setError(
        err instanceof Error
          ? `An error occurred during model comparison: ${err.message}`
          : 'An unknown error occurred. Please check the console for details.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedIndustry]);

  // Code generation
  const handleGenerateCode = useCallback(async () => {
    if (!prdContent) return;

    setIsLoading(true);
    setError(null);

    try {
      const code = await generateCodeFromPRD(prdContent, 'react');
      setPrdContent(`${prdContent}\n\n---\n\n# 🏗️ Generated Code Scaffolding\n\n${code}`);
    } catch (err) {
      console.error('Code generation failed:', err);
      setError(
        err instanceof Error
          ? `Failed to generate code: ${err.message}`
          : 'An unknown error occurred during code generation.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [prdContent]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-8">
      <Header />

      <div className="w-full max-w-5xl mt-8">
        <AdvancedOptions
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          analysisMode={analysisMode}
          setAnalysisMode={setAnalysisMode}
          analysisType={analysisType}
          setAnalysisType={setAnalysisType}
        />

        {analysisType === 'single' && (
          <UrlInputForm
            url={targetUrl}
            setUrl={setTargetUrl}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
        )}

        {analysisType === 'comparison' && (
          <CompetitorInput
            onAnalyze={handleCompetitorComparison}
            isLoading={isLoading}
          />
        )}

        {analysisType === 'modelComparison' && (
          <ModelComparisonInput
            onAnalyze={handleModelComparison}
            isLoading={isLoading}
          />
        )}

        <HistoryPanel onSelectAnalysis={setPrdContent} />
      </div>

      <main className="w-full max-w-5xl mt-8 flex-grow">
        {isLoading && <LoadingSpinner />}
        {error && <ErrorDisplay message={error} />}
        {prdContent && (
          <>
            <PrdDisplay content={prdContent} />
            <ExportOptions content={prdContent} onGenerateCode={handleGenerateCode} />
          </>
        )}
        {!isLoading && !error && !prdContent && <WelcomeMessage />}
      </main>

      <footer className="text-center p-4 text-gray-500 text-sm mt-8">
        <p>
          Powered by Gemini AI | Advanced Multi-Model Analysis Tool
          <br />
          For educational and competitive analysis purposes only.
        </p>
      </footer>
    </div>
  );
};

export default App;
