
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
            <h2 className="text-3xl font-bold text-gray-100 mb-4">Unlock the Blueprint of Success</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10">
                Enter the URL of any successful web application, and our AI-driven multi-agent system will generate a comprehensive Product Requirements Document (PRD) to guide your replication project.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <FeatureCard 
                    icon="🎨" 
                    title="Frontend & UI/UX" 
                    description="Deconstructs the design system, component library, and tech stack."
                />
                <FeatureCard 
                    icon="⚙️" 
                    title="Backend & Infra" 
                    description="Infers API architecture, data models, and hosting infrastructure."
                />
                <FeatureCard 
                    icon="💰" 
                    title="Business & Strategy" 
                    description="Analyzes monetization, user funnels, and growth loops."
                />
            </div>
        </div>
    );
};
