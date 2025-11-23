import React from 'react';
import { IdeaExpansion } from '../types';
import { Target, AlertTriangle, GitBranch, Layers, CheckCircle } from 'lucide-react';

interface ExpansionViewProps {
  data: IdeaExpansion;
  imageUrl: string | null;
  isVisualizing: boolean;
  onGenerateImage: () => void;
}

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div className="flex items-center gap-2 mb-3 text-nexus-400">
    {icon}
    <h3 className="uppercase tracking-wider text-xs font-bold">{title}</h3>
  </div>
);

export const ExpansionView: React.FC<ExpansionViewProps> = ({ data, imageUrl, isVisualizing, onGenerateImage }) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 animate-fade-in-up">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-nexus-400 to-nexus-accent mb-4">
          {data.title}
        </h1>
        <p className="text-xl text-gray-400 italic font-light">"{data.tagline}"</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Core Info */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Summary */}
          <div className="bg-nexus-800/50 rounded-2xl p-6 border border-nexus-700 backdrop-blur-sm">
             <SectionTitle icon={<Layers size={16} />} title="Executive Summary" />
             <p className="text-lg leading-relaxed text-gray-200">{data.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Key Features */}
             <div className="bg-nexus-800/30 rounded-2xl p-6 border border-nexus-700/50">
               <SectionTitle icon={<CheckCircle size={16} />} title="Core Features" />
               <ul className="space-y-3">
                 {data.keyFeatures.map((feature, idx) => (
                   <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                     <span className="text-nexus-accent mt-1">•</span>
                     {feature}
                   </li>
                 ))}
               </ul>
             </div>

             {/* Audience */}
             <div className="bg-nexus-800/30 rounded-2xl p-6 border border-nexus-700/50">
               <SectionTitle icon={<Target size={16} />} title="Target Audience" />
               <ul className="space-y-3">
                 {data.targetAudience.map((audience, idx) => (
                   <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                     <span className="text-nexus-accent mt-1">•</span>
                     {audience}
                   </li>
                 ))}
               </ul>
             </div>
          </div>

          {/* Pivots */}
          <div className="bg-nexus-800/30 rounded-2xl p-6 border border-nexus-700/50">
             <SectionTitle icon={<GitBranch size={16} />} title="Strategic Pivots" />
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {data.pivotOptions.map((pivot, idx) => (
                  <div key={idx} className="bg-nexus-900/50 p-4 rounded-xl border border-nexus-700/30 hover:border-nexus-500 transition-colors cursor-default">
                    <h4 className="font-semibold text-nexus-400 mb-2 text-sm">{pivot.name}</h4>
                    <p className="text-xs text-gray-400 leading-snug">{pivot.description}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Visuals & Challenges */}
        <div className="space-y-8">
          
          {/* Visualizer Card */}
          <div className="bg-gradient-to-br from-nexus-800 to-nexus-900 rounded-2xl p-1 border border-nexus-700 shadow-xl overflow-hidden group">
            <div className="relative aspect-square bg-black rounded-xl overflow-hidden">
              {imageUrl ? (
                <img src={imageUrl} alt="Generated Concept" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 bg-nexus-900/80">
                  {isVisualizing ? (
                     <div className="flex flex-col items-center gap-3">
                       <div className="w-8 h-8 border-2 border-nexus-accent border-t-transparent rounded-full animate-spin"></div>
                       <span className="text-xs tracking-widest uppercase animate-pulse">Rendering Concept...</span>
                     </div>
                  ) : (
                    <div className="text-center p-6">
                       <p className="mb-4 text-sm">Visualize this idea with Gemini</p>
                       <button 
                         onClick={onGenerateImage}
                         className="px-6 py-2 bg-nexus-500 hover:bg-nexus-400 text-white text-sm font-semibold rounded-full transition-all shadow-lg shadow-nexus-500/20"
                       >
                         Generate Art
                       </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            {imageUrl && (
              <div className="p-4 text-center">
                 <button 
                   onClick={onGenerateImage}
                   disabled={isVisualizing}
                   className="text-xs text-nexus-400 hover:text-white transition-colors uppercase tracking-widest font-bold disabled:opacity-50"
                 >
                   {isVisualizing ? 'Regenerating...' : 'Regenerate Visual'}
                 </button>
              </div>
            )}
          </div>

          {/* Challenges */}
          <div className="bg-red-900/10 rounded-2xl p-6 border border-red-900/30">
             <SectionTitle icon={<AlertTriangle size={16} className="text-red-400" />} title="Risk Assessment" />
             <ul className="space-y-3">
                 {data.potentialChallenges.map((challenge, idx) => (
                   <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                     <span className="text-red-500/50 mt-1">!</span>
                     {challenge}
                   </li>
                 ))}
             </ul>
          </div>

        </div>
      </div>
    </div>
  );
};
