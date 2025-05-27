
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, MapPin, Headphones, Language, Settings } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NavigationHeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
}

const NavigationHeader = ({ currentView, setCurrentView, selectedLanguage, setSelectedLanguage }: NavigationHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const languages = {
    fr: "Français",
    en: "English", 
    ar: "العربية"
  };

  const navigationItems = [
    { id: 'home', icon: FileText, label: 'Accueil' },
    { id: 'documents', icon: FileText, label: 'Documents' },
    { id: 'services', icon: MapPin, label: 'Services' },
    { id: 'audio', icon: Headphones, label: 'Audio' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3" onClick={() => setCurrentView('home')} className="cursor-pointer">
            <img 
              src="/lovable-uploads/a6977eb7-a5ef-4f40-966e-b72f60e7daf5.png" 
              alt="PaperPath" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              PaperPath
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center space-x-2 ${
                  currentView === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="flex items-center space-x-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-32">
                <Language className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languages).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  onClick={() => {
                    setCurrentView(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 justify-start ${
                    currentView === item.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationHeader;
