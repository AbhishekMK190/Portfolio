import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Terminal from './components/Terminal';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showTerminalTip, setShowTerminalTip] = useState(false);

  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
    setIsLoaded(true);
    
    // Show terminal tip after a short delay
    const timer = setTimeout(() => {
      setShowTerminalTip(true);
      // Hide the tip after 5 seconds
      setTimeout(() => setShowTerminalTip(false), 5000);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if the pressed key is 't' or 'T' and user isn't typing in an input or textarea
      if ((event.key?.toLowerCase() === 't') && 
          !(event.target instanceof HTMLInputElement || 
            event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault(); // Prevent the 't' from being typed
        setIsTerminalOpen(true);
        setShowTerminalTip(false); // Hide tip when terminal is opened
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTerminal = () => {
    setIsTerminalOpen(!isTerminalOpen);
    setShowTerminalTip(false); // Hide tip when terminal is toggled
  };

  const closeTerminal = () => {
    setIsTerminalOpen(false);
  };

  return (
    <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
        <Navbar onTerminalToggle={toggleTerminal} isTerminalOpen={isTerminalOpen} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        
        {/* Terminal Access Tip */}
        {showTerminalTip && (
          <div className="fixed bottom-6 right-6 bg-slate-800 border border-cyan-400/30 rounded-lg p-4 shadow-2xl z-40 animate-fade-in-up">
            <div className="flex items-center space-x-3">
              <div className="text-cyan-400 text-xl">💻</div>
              <div>
                <p className="text-white font-medium">Terminal Access</p>
                <p className="text-gray-300 text-sm">Press <kbd className="px-2 py-1 bg-slate-700 rounded text-cyan-400">T</kbd> to open terminal</p>
              </div>
              <button 
                onClick={() => setShowTerminalTip(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        )}
        
        {/* Modal Terminal */}
        <Terminal 
          onNavigate={handleNavigate} 
          isOpen={isTerminalOpen} 
          onClose={closeTerminal}
          isModal={true}
        />
      </div>
    </div>
  );
}

export default App;