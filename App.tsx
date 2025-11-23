import React, { useState } from 'react';
import { HeroInput } from './components/HeroInput';
import { ExpansionView } from './components/ExpansionView';
import { expandIdea, generateConceptImage } from './services/gemini';
import { IdeaStage, NexusState } from './types';
import { Zap, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<NexusState>({
    seed: '',
    expansion: null,
    imageUrl: null,
    stage: IdeaStage.INPUT,
    error: null,
  });

  const [isVisualizing, setIsVisualizing] = useState(false);

  const handleExpand = async (seed: string) => {
    setState(prev => ({ ...prev, seed, stage: IdeaStage.EXPANDING, error: null }));
    
    try {
      const expansion = await expandIdea(seed);
      setState(prev => ({
        ...prev,
        expansion,
        stage: IdeaStage.COMPLETE, // We wait for user action to trigger image gen usually, or can auto trigger
      }));
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        stage: IdeaStage.INPUT, 
        error: "Failed to expand idea. Please try again with a different prompt." 
      }));
    }
  };

  const handleGenerateImage = async () => {
    if (!state.expansion) return;
    
    setIsVisualizing(true);
    try {
      const imageUrl = await generateConceptImage(state.expansion);
      setState(prev => ({ ...prev, imageUrl }));
    } catch (err) {
      console.error(err);
      // Even if image fails, we keep the expansion
    } finally {
      setIsVisualizing(false);
    }
  };

  const handleReset = () => {
    setState({
      seed: '',
      expansion: null,
      imageUrl: null,
      stage: IdeaStage.INPUT,
      error: null,
    });
  };

  return (
    <div className="min-h-screen bg-nexus-900 text-gray-100 font-sans selection:bg-nexus-500 selection:text-white">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="w-8 h-8 bg-gradient-to-tr from-nexus-500 to-nexus-accent rounded-lg flex items-center justify-center shadow-lg shadow-nexus-500/20">
            <Zap size={18} className="text-white" fill="currentColor" />
          </div>
          <span>NEXUS</span>
        </div>
        
        {state.stage === IdeaStage.COMPLETE && (
           <button 
             onClick={handleReset}
             className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-nexus-800/80 backdrop-blur text-sm font-medium hover:bg-nexus-700 transition-colors border border-nexus-700"
           >
             <RefreshCw size={14} />
             New Idea
           </button>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="relative pt-20 pb-20">
        {state.error && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 px-6 py-3 bg-red-500/10 border border-red-500/50 text-red-200 rounded-full z-50 animate-bounce">
            {state.error}
          </div>
        )}

        {state.stage === IdeaStage.INPUT || state.stage === IdeaStage.EXPANDING ? (
          <HeroInput 
            onExpand={handleExpand} 
            isLoading={state.stage === IdeaStage.EXPANDING} 
          />
        ) : (
          state.expansion && (
            <ExpansionView 
              data={state.expansion} 
              imageUrl={state.imageUrl}
              isVisualizing={isVisualizing}
              onGenerateImage={handleGenerateImage}
            />
          )
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center text-nexus-700 text-xs pointer-events-none">
        Gemini 2.5 Flash & Image Preview
      </footer>
    </div>
  );
};

export default App;
