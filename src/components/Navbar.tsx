import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

interface NavbarProps {
  onTerminalToggle: () => void;
  isTerminalOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onTerminalToggle, isTerminalOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Portfolio
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-300 hover:text-white transition-colors duration-200 capitalize font-medium"
              >
                {item}
              </button>
            ))}
            <button
              onClick={onTerminalToggle}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 relative group border animate-gradient ${
                isTerminalOpen 
                  ? 'bg-gradient-to-r from-slate-900 via-purple-900/50 to-slate-900 border-purple-500/50 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                  : 'bg-gradient-to-r from-slate-900 via-purple-900/30 to-slate-900 border-slate-600 text-gray-300 hover:text-white hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]'
              }`}
              title="Toggle Terminal"
            >
              <Terminal size={20} className="animate-pulse" />
              <span>Terminal</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-md rounded-lg mb-4 p-4">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-200 py-2 capitalize font-medium"
              >
                {item}
              </button>
            ))}
            <button
              onClick={onTerminalToggle}
              className={`flex items-center space-x-2 w-full text-left py-2 px-4 rounded-lg transition-all duration-200 border animate-gradient ${
                isTerminalOpen 
                  ? 'bg-gradient-to-r from-slate-900 via-purple-900/50 to-slate-900 border-purple-500/50 text-purple-400' 
                  : 'bg-gradient-to-r from-slate-900 via-purple-900/30 to-slate-900 border-slate-600 text-gray-300 hover:text-white hover:border-purple-500/30'
              }`}
            >
              <Terminal size={20} className="animate-pulse" />
              <span>Terminal</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;