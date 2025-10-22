
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UrlInputForm } from './components/UrlInputForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { PrdDisplay } from './components/PrdDisplay';
import { ErrorDisplay } from './components/ErrorDisplay';
import { analyzeWebsite } from './services/geminiService';
import { WelcomeMessage } from './components/WelcomeMessage';

const App: React.FC = () => {
  const [targetUrl, setTargetUrl] = useState<string>('');
  const [prdContent, setPrdContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!targetUrl.trim()) {
      setError('Please enter a valid URL.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setPrdContent(null);

    try {
      const result = await analyzeWebsite(targetUrl);
      setPrdContent(result);
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
  }, [targetUrl]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-8">
      <Header />
      <UrlInputForm
        url={targetUrl}
        setUrl={setTargetUrl}
        onAnalyze={handleAnalyze}
        isLoading={isLoading}
      />
      <main className="w-full max-w-5xl mt-8 flex-grow">
        {isLoading && <LoadingSpinner />}
        {error && <ErrorDisplay message={error} />}
        {prdContent && <PrdDisplay content={prdContent} />}
        {!isLoading && !error && !prdContent && <WelcomeMessage />}
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm mt-8">
        <p>Powered by Gemini | For educational and competitive analysis purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
