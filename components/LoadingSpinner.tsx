
import React, { useState, useEffect } from 'react';
import { AGENTS } from '../constants';

// A sub-component for displaying a single agent's status
const AgentItem: React.FC<{ agent: typeof AGENTS[0], isActive: boolean }> = ({ agent, isActive }) => {
    return (
        <li className={`flex items-center space-x-4 p-3 transition-all duration-500 rounded-lg ${isActive ? 'bg-purple-900/50' : 'opacity-50'}`}>
            <div className="text-2xl">{agent.icon}</div>
            <div className="flex-grow text-left">
                <p className={`font-bold transition-colors ${isActive ? 'text-gray-100' : 'text-gray-400'}`}>{agent.name}</p>
                <p className={`text-sm transition-colors ${isActive ? 'text-purple-300' : 'text-gray-500'}`}>
                    {/* Display the agent's specific task when active */}
                    {isActive ? agent.description : 'Awaiting instructions...'}
                </p>
            </div>
            {/* Show a spinner only for the active agent */}
            {isActive && <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-purple-400"></div>}
        </li>
    );
};

// The main component, replacing the old spinner with a dynamic agent status display
export const LoadingSpinner: React.FC = () => {
    const [activeAgentIndex, setActiveAgentIndex] = useState(0);

    // Effect to cycle through agents every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveAgentIndex(prevIndex => (prevIndex + 1) % AGENTS.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center p-4 sm:p-8 flex flex-col items-center justify-center animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-200 mb-2">Quantum Analysis in Progress...</h2>
            <p className="text-gray-400 mt-2 mb-8 max-w-xl">
                Our elite multi-agent system is deconstructing the target. Each agent focuses on a specific layer of the application.
            </p>
            
            <div className="w-full max-w-2xl bg-gray-800/50 border border-gray-700 rounded-lg p-4 shadow-lg">
                <ul className="space-y-2">
                    {AGENTS.map((agent, index) => (
                        <AgentItem key={agent.name} agent={agent} isActive={index === activeAgentIndex} />
                    ))}
                </ul>
            </div>
        </div>
    );
};
