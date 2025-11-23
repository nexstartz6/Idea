import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroInputProps {
  onExpand: (seed: string) => void;
  isLoading: boolean;
}

export const HeroInput: React.FC<HeroInputProps> = ({ onExpand, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onExpand(input);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 animate-fade-in relative z-10">
      
      {/* Abstract Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nexus-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="mb-8 p-3 bg-nexus-800/50 rounded-full border border-nexus-700/50 backdrop-blur-md inline-flex items-center gap-2">
         <div className="p-1.5 bg-nexus-500 rounded-full text-white">
           <Sparkles size={14} fill="currentColor" />
         </div>
         <span className="text-xs font-medium text-gray-300 pr-2">Powered by Gemini 2.5 Flash & Image</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 tracking-tight leading-tight">
        Build on your <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-400 via-nexus-accent to-white">next big idea.</span>
      </h1>
      
      <p className="text-lg text-gray-400 text-center mb-10 max-w-2xl">
        Enter a rough concept, a problem statement, or a random thought. 
        Nexus will construct a complete strategy, identify pivots, and visualize the outcome.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-xl relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-nexus-500 to-nexus-accent rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-nexus-900 rounded-full p-2 pr-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 'Uber for dog walking' or 'Sustainable coffee cup'"
            className="flex-1 bg-transparent border-none outline-none text-white px-6 py-4 placeholder-gray-500 text-lg"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-white text-nexus-900 p-4 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
             {isLoading ? (
               <div className="w-5 h-5 border-2 border-nexus-900 border-t-transparent rounded-full animate-spin"></div>
             ) : (
               <ArrowRight size={20} />
             )}
          </button>
        </div>
      </form>

      {/* Suggested chips */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {['AI Travel Agent', 'Vertical Farming in Cities', 'Social Network for Introverts'].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              setInput(suggestion);
              // Optional: auto-submit or just fill
            }}
            className="px-4 py-2 rounded-full bg-nexus-800/30 border border-nexus-700 hover:border-nexus-500 text-sm text-gray-400 hover:text-white transition-all"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
