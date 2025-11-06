
import React from 'react';

const FeatureCard: React.FC<{ title: string, description: string, icon: string }> = ({ title, description, icon }) => (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:border-purple-500">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="text-lg font-bold text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
);

export const WelcomeMessage: React.FC = () => {
    return (
        <div className="text-center p-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">🚀 Advanced Million-Dollar Copy Tool</h2>
            <p className="text-gray-400 max-w-3xl mx-auto mb-10">
                Powered by <strong>Gemini AI</strong>, our enhanced multi-agent system analyzes websites with unprecedented depth.
                Choose from single analysis, competitor comparison, or multi-model analysis to generate comprehensive PRDs with code generation capabilities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
                <FeatureCard
                    icon="🎨"
                    title="Frontend & UI/UX"
                    description="Deep analysis of design systems, frameworks, component patterns, and accessibility."
                />
                <FeatureCard
                    icon="⚙️"
                    title="Backend & Infrastructure"
                    description="Infers API architecture, databases, authentication, caching, and deployment strategies."
                />
                <FeatureCard
                    icon="💰"
                    title="Business Model Analysis"
                    description="Monetization strategies, pricing tiers, user funnels, growth loops, and retention tactics."
                />
                <FeatureCard
                    icon="🔬"
                    title="Multi-Model Comparison"
                    description="Compare Gemini Flash vs Pro models to get the best insights for your analysis."
                />
                <FeatureCard
                    icon="🏆"
                    title="Competitor Analysis"
                    description="Side-by-side comparison of multiple websites with strategic recommendations."
                />
                <FeatureCard
                    icon="🏗️"
                    title="Code Generation"
                    description="Transform PRDs into production-ready code scaffolding with modern best practices."
                />
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/50 rounded-lg p-6 max-w-4xl mx-auto">
                <h3 className="text-xl font-bold text-purple-300 mb-3">✨ New Advanced Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                        <p className="text-gray-300"><strong>📊 Industry Templates:</strong> SaaS, E-commerce, Fintech, EdTech, AI Tools & more</p>
                    </div>
                    <div>
                        <p className="text-gray-300"><strong>📑 Multiple Export Options:</strong> PDF, Markdown, Clipboard, JSON</p>
                    </div>
                    <div>
                        <p className="text-gray-300"><strong>🔍 Analysis Modes:</strong> Quick, Standard, or Deep dive analysis</p>
                    </div>
                    <div>
                        <p className="text-gray-300"><strong>📚 History Tracking:</strong> Save and compare past analyses</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
