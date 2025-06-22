import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface TerminalProps {
  onNavigate: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
  isModal?: boolean;
}

interface CommandHistory {
  command: string;
  output: string;
}

const Terminal: React.FC<TerminalProps> = ({ onNavigate, isOpen, onClose, isModal = false }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: '',
      output: 'Welcome to Portfolio Terminal!\n\n Tip: Press "t" or "T" anywhere on the page to access this terminal.\n\nType "help" to see all available commands.'
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentLocation, setCurrentLocation] = useState('home');
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Unique animations for each section
  const navigationAnimations = {
    home: {
      messages: [
        '🏠 Initiating home navigation sequence...',
        '📡 Connecting to home server...',
        '🎯 Locking onto home coordinates...',
        '✨ Welcome home!'
      ]
    },
    about: {
      messages: [
        '👤 Loading personal data matrix...',
        '📊 Analyzing background information...',
        '🔍 Deep diving into Abhishek\'s story...',
        '📖 About section loaded successfully!'
      ]
    },
    skills: {
      messages: [
        '⚡ Powering up skill matrix...',
        '🔧 Loading technical arsenal...',
        '🎯 Calibrating expertise levels...',
        '💪 Skills section ready for display!'
      ]
    },
    projects: {
      messages: [
        '🚀 Launching project portfolio...',
        '📁 Accessing project database...',
        '🎮 Loading creative works...',
        '🌟 Projects gallery activated!'
      ]
    },
    contact: {
      messages: [
        '📞 Establishing communication channels...',
        '📧 Connecting to contact systems...',
        '🤝 Opening communication portal...',
        '📱 Contact section online!'
      ]
    }
  };

  const commands = {
    help: 'Available commands:\n  home     - Navigate to home section\n  about    - Navigate to about section\n  skills   - Navigate to skills section\n  projects - Navigate to projects section\n  contact  - Navigate to contact section\n  clear    - Clear terminal\n  whoami   - Display user info\n  ls       - List available sections\n  pwd      - Show current location\n  date     - Show current date and time\n\n💡 Remember: Press "t" or "T" anywhere to access this terminal!',
    home: '🏠 Initiating home navigation sequence...',
    about: '👤 Loading personal data matrix...',
    skills: '⚡ Powering up skill matrix...',
    projects: '🚀 Launching project portfolio...',
    contact: '📞 Establishing communication channels...',
    clear: '',
    whoami: 'Abhishek M Kalghatgi\nFull Stack Developer & Game Development Enthusiast\nCS Student passionate about creating innovative solutions',
    ls: 'home/\nabout/\nskills/\nprojects/\ncontact/',
    pwd: `/home/abhishek/portfolio/${currentLocation}`,
    date: new Date().toLocaleString()
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const animateNavigation = async (section: string) => {
    setIsNavigating(true);
    setNavigationTarget(section);
    
    const animation = navigationAnimations[section as keyof typeof navigationAnimations];
    if (!animation) return;

    // Add initial navigation message
    setHistory(prev => [...prev, { 
      command: section, 
      output: animation.messages[0] 
    }]);

    // Animate through messages with delays
    for (let i = 1; i < animation.messages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setHistory(prev => [...prev, { 
        command: '', 
        output: animation.messages[i] 
      }]);
    }

    // Final delay before actual navigation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Perform actual navigation
    onNavigate(section);
    setCurrentLocation(section);
    
    if (isModal) {
      onClose();
    }
    
    setIsNavigating(false);
    setNavigationTarget('');
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output = '';

    if (trimmedCmd === '') {
      output = '';
    } else if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    } else if (trimmedCmd in commands) {
      output = commands[trimmedCmd as keyof typeof commands];
      
      // Handle navigation commands with animation
      if (['home', 'about', 'skills', 'projects', 'contact'].includes(trimmedCmd)) {
        animateNavigation(trimmedCmd);
        return; // Don't add to history yet, animation will handle it
      }
    } else {
      output = `Command not found: ${trimmedCmd}. Type "help" for available commands.`;
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isNavigating) {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp' && !isNavigating) {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown' && !isNavigating) {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Escape' && isModal) {
      onClose();
    }
  };

  if (isModal && !isOpen) return null;

  const TerminalContent = () => (
    <div 
      ref={terminalRef}
      className={`font-mono text-sm p-4 ${isModal ? 'h-96' : 'h-64'} overflow-y-auto`}
    >
      {history.map((item, index) => (
        <div key={index} className="mb-2">
          {item.command && (
            <div className="flex items-center">
              <span className="text-green-400">abhishek@profile:</span>
              <span className="text-blue-400 mx-1">~/{currentLocation}</span>
              <span className="text-white">$</span>
              <span className="text-white ml-2">{item.command}</span>
            </div>
          )}
          {item.output && (
            <div className={`text-gray-300 whitespace-pre-wrap ml-4 ${
              item.output.includes('💡') ? 'text-cyan-400 font-semibold' : ''
            } ${
              item.output.includes('🚀') || item.output.includes('👤') || 
              item.output.includes('⚡') || item.output.includes('📞') || 
              item.output.includes('🏠') ? 'text-yellow-400' : ''
            }`}>
              {item.output}
            </div>
          )}
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-green-400">abhishek@profile:</span>
        <span className="text-blue-400 mx-1">~/{currentLocation}</span>
        <span className="text-white">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent text-white outline-none flex-1 ml-2"
          placeholder={isNavigating ? `Navigating to ${navigationTarget}...` : "Type 'help' for all available commands.."}
          autoFocus
          disabled={isNavigating}
        />
      </div>
      {isNavigating && (
        <div className="mt-2 text-yellow-400 text-xs animate-pulse">
          ⏳ Navigation in progress...
        </div>
      )}
    </div>
  );

  const TerminalWindow = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full max-w-4xl mx-auto bg-slate-900 rounded-lg shadow-2xl border border-white/10 overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-300 text-sm font-mono ml-4">Terminal</span>
        </div>
        {isModal && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X size={20} />
          </button>
        )}
      </div>
      {children}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <TerminalWindow>
          <TerminalContent />
        </TerminalWindow>
      </div>
    );
  }

  return (
    <div id="terminal" className="w-full p-4">
      <TerminalWindow>
        <TerminalContent />
      </TerminalWindow>
    </div>
  );
};

export default Terminal;