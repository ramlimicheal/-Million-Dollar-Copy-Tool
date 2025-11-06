import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import mermaid from 'mermaid';

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

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'Inter, sans-serif',
    });
  }, []);

  useEffect(() => {
    if (content) {
        // Find unprocessed mermaid blocks
        const mermaidElements = document.querySelectorAll('pre.language-mermaid:not([data-processed="true"])');
        if (mermaidElements.length > 0) {
            // Mark them as processed before running to prevent race conditions on re-render
            mermaidElements.forEach(el => el.setAttribute('data-processed', 'true'));
            try {
                mermaid.run({ nodes: mermaidElements });
            } catch (e) {
                console.error('Error rendering Mermaid diagrams:', e);
                mermaidElements.forEach(el => {
                    (el as HTMLElement).innerHTML = 'Error rendering diagram.';
                });
            }
        }
    }
  }, [content]);

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

  const markdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      if (!inline && match) {
        if (match[1] === 'mermaid') {
          // This pre will be picked up by the useEffect hook
          return (
            <pre className={className}>
              {String(children).replace(/\n$/, '')}
            </pre>
          );
        }
        return (
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        );
      }
      // Handle inline code
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg shadow-lg animate-fade-in">
      <div className="flex justify-between items-center bg-gray-800 p-3 rounded-t-lg border-b border-gray-700 sticky top-0 z-10">
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
      <div className="prd-content p-6">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
            {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};