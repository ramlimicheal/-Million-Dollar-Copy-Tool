
import { GoogleGenAI } from "@google/genai";
import { MASTER_PROMPT, INDUSTRY_TEMPLATES } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Available Gemini models
export const AVAILABLE_MODELS = {
  'gemini-2.5-flash': { name: 'Gemini 2.5 Flash', speed: 'Fastest', quality: 'Good', cost: 'Lowest' },
  'gemini-2.0-flash': { name: 'Gemini 2.0 Flash', speed: 'Fast', quality: 'Better', cost: 'Low' },
  'gemini-1.5-pro': { name: 'Gemini 1.5 Pro', speed: 'Slower', quality: 'Best', cost: 'Higher' },
} as const;

export type ModelKey = keyof typeof AVAILABLE_MODELS;
export type IndustryKey = keyof typeof INDUSTRY_TEMPLATES;

export interface AnalysisOptions {
  targetUrl: string;
  model?: ModelKey;
  industry?: IndustryKey;
  analysisMode?: 'standard' | 'deep' | 'quick';
  includeScreenshot?: boolean;
}

export interface ComparisonOptions {
  targetUrls: string[];
  model?: ModelKey;
  industry?: IndustryKey;
}

export interface ModelComparisonOptions {
  targetUrl: string;
  models: ModelKey[];
  industry?: IndustryKey;
}

// Single URL analysis
export const analyzeWebsite = async (options: AnalysisOptions): Promise<string> => {
  try {
    const {
      targetUrl,
      model = 'gemini-2.5-flash',
      industry = 'generic',
      analysisMode = 'standard'
    } = options;

    const industryTemplate = INDUSTRY_TEMPLATES[industry];
    const prompt = MASTER_PROMPT
      .replace('{TARGET_URL}', targetUrl)
      .replace('{ANALYSIS_MODE}', analysisMode)
      .replace('{INDUSTRY_TEMPLATE}', industryTemplate);

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Error interacting with Gemini API: ${error.message}. Check browser console for more details. This could be due to network issues, an invalid API key, or content safety policies.`;
    }
    return "An unknown error occurred while calling the Gemini API.";
  }
};

// Multi-URL competitor comparison
export const compareCompetitors = async (options: ComparisonOptions): Promise<string> => {
  try {
    const {
      targetUrls,
      model = 'gemini-2.5-flash',
      industry = 'generic'
    } = options;

    const comparisonPrompt = `
You are analyzing multiple competitor websites to create a comprehensive competitive analysis.

**Target URLs:**
${targetUrls.map((url, i) => `${i + 1}. ${url}`).join('\n')}

**Industry Context:** ${INDUSTRY_TEMPLATES[industry]}

**Your Task:**
Analyze each website and create a UNIFIED COMPETITIVE ANALYSIS REPORT with:

# 📊 Competitive Analysis Report

## Executive Summary
- Overview of the competitive landscape
- Key differentiators between competitors
- Market positioning of each player

## Individual Analysis
For each competitor, provide:
1. Product overview and value proposition
2. Key features and capabilities
3. Tech stack (inferred)
4. Pricing model
5. Unique strengths
6. Notable weaknesses

## Comparative Matrix
Create comparison tables for:
- Feature comparison
- Pricing comparison
- Technology comparison
- User experience comparison

## Strategic Insights
- Market gaps and opportunities
- Feature ideas to differentiate
- Best practices observed
- Anti-patterns to avoid

## Recommendations
- Which features to prioritize
- Unique positioning strategy
- Technology choices

Provide detailed, actionable insights with confidence scores.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: comparisonPrompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error in competitor comparison:", error);
    if (error instanceof Error) {
        return `Error in competitor comparison: ${error.message}`;
    }
    return "An unknown error occurred during competitor comparison.";
  }
};

// Multi-model comparison for same URL
export const compareModels = async (options: ModelComparisonOptions): Promise<string> => {
  try {
    const {
      targetUrl,
      models,
      industry = 'generic'
    } = options;

    const industryTemplate = INDUSTRY_TEMPLATES[industry];
    const basePrompt = MASTER_PROMPT
      .replace('{TARGET_URL}', targetUrl)
      .replace('{ANALYSIS_MODE}', 'standard')
      .replace('{INDUSTRY_TEMPLATE}', industryTemplate);

    // Run analyses in parallel
    const analyses = await Promise.all(
      models.map(async (model) => {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: basePrompt,
          });
          return {
            model,
            modelName: AVAILABLE_MODELS[model].name,
            success: true,
            result: response.text,
            timestamp: new Date().toISOString()
          };
        } catch (error) {
          return {
            model,
            modelName: AVAILABLE_MODELS[model].name,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
          };
        }
      })
    );

    // Format results
    let comparisonResult = `# 🔬 Multi-Model Analysis Comparison\n\n`;
    comparisonResult += `**Target:** ${targetUrl}\n`;
    comparisonResult += `**Analyzed at:** ${new Date().toLocaleString()}\n\n`;
    comparisonResult += `---\n\n`;

    analyses.forEach((analysis, index) => {
      comparisonResult += `## Model ${index + 1}: ${analysis.modelName}\n\n`;

      if (analysis.success && 'result' in analysis) {
        comparisonResult += analysis.result;
      } else if ('error' in analysis) {
        comparisonResult += `❌ **Analysis Failed:** ${analysis.error}\n`;
      }

      comparisonResult += `\n\n---\n\n`;
    });

    // Add summary comparison
    const successfulAnalyses = analyses.filter(a => a.success);
    comparisonResult += `## 📋 Comparison Summary\n\n`;
    comparisonResult += `- **Total Models:** ${models.length}\n`;
    comparisonResult += `- **Successful:** ${successfulAnalyses.length}\n`;
    comparisonResult += `- **Failed:** ${models.length - successfulAnalyses.length}\n\n`;

    if (successfulAnalyses.length > 1) {
      comparisonResult += `### Analysis Insights\n`;
      comparisonResult += `Compare the analyses above to see:\n`;
      comparisonResult += `- Consistency across different models\n`;
      comparisonResult += `- Unique insights from each model\n`;
      comparisonResult += `- Confidence levels and depth of analysis\n\n`;
      comparisonResult += `**Recommendation:** Use Gemini 1.5 Pro for most comprehensive analysis, or Gemini 2.5 Flash for faster results.\n`;
    }

    return comparisonResult;
  } catch (error) {
    console.error("Error in model comparison:", error);
    if (error instanceof Error) {
        return `Error in model comparison: ${error.message}`;
    }
    return "An unknown error occurred during model comparison.";
  }
};

// Generate code from PRD
export const generateCodeFromPRD = async (prd: string, framework: string = 'react'): Promise<string> => {
  try {
    const codeGenPrompt = `
You are a code generation expert. Based on the following PRD, generate production-ready code scaffolding.

**Framework:** ${framework}

**PRD:**
${prd.substring(0, 10000)} // Limit to avoid token limits

**Generate:**
1. Complete folder structure
2. package.json with all dependencies
3. Core component files with TypeScript
4. API service files
5. Configuration files (vite.config, tsconfig, etc.)
6. Environment variable template
7. README with setup instructions

Format as a structured markdown document with code blocks for each file.
Include inline comments explaining key decisions.
Use modern best practices (TypeScript, proper typing, error handling).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro', // Use Pro for code generation
      contents: codeGenPrompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating code:", error);
    if (error instanceof Error) {
        return `Error generating code: ${error.message}`;
    }
    return "An unknown error occurred during code generation.";
  }
};

// Screenshot capture (placeholder for client-side implementation)
export const captureScreenshot = async (url: string): Promise<string> => {
  // This would need a backend service or browser extension
  // For now, return a placeholder
  return `Screenshot capture requires backend implementation. Consider using:
  - Puppeteer/Playwright on a server
  - Browser extension for client-side capture
  - Third-party API like ScreenshotAPI or URLbox`;
};

// Historical tracking (save analysis to localStorage or backend)
export const saveAnalysisHistory = (url: string, analysis: string): void => {
  try {
    const history = getAnalysisHistory();
    const newEntry = {
      id: Date.now().toString(),
      url,
      analysis,
      timestamp: new Date().toISOString(),
    };

    history.unshift(newEntry);

    // Keep last 50 analyses
    const trimmedHistory = history.slice(0, 50);
    localStorage.setItem('analysis_history', JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Error saving history:', error);
  }
};

export const getAnalysisHistory = (): Array<{
  id: string;
  url: string;
  analysis: string;
  timestamp: string;
}> => {
  try {
    const stored = localStorage.getItem('analysis_history');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
};

export const compareHistoricalAnalyses = (id1: string, id2: string): string => {
  const history = getAnalysisHistory();
  const analysis1 = history.find(h => h.id === id1);
  const analysis2 = history.find(h => h.id === id2);

  if (!analysis1 || !analysis2) {
    return 'Could not find one or both analyses in history.';
  }

  return `# Historical Comparison\n\n## Analysis 1 (${new Date(analysis1.timestamp).toLocaleDateString()})\n**URL:** ${analysis1.url}\n\n${analysis1.analysis}\n\n---\n\n## Analysis 2 (${new Date(analysis2.timestamp).toLocaleDateString()})\n**URL:** ${analysis2.url}\n\n${analysis2.analysis}`;
};
