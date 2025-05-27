
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Headphones, Mic, MicOff, FileText, Settings } from 'lucide-react';

interface AudioSupportProps {
  language: string;
}

const AudioSupport = ({ language }: AudioSupportProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState('visa');
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  
  const speechSynthesis = window.speechSynthesis;
  const speechRecognition = useRef<any>(null);

  const translations = {
    fr: {
      title: "Support Audio",
      subtitle: "Assistance vocale pour l'accessibilité et la compréhension",
      listenToGuide: "Écouter le guide",
      voiceControl: "Contrôle vocal",
      startListening: "Commencer l'écoute",
      stopListening: "Arrêter l'écoute",
      playGuide: "Lire le guide",
      stopReading: "Arrêter la lecture",
      voiceSpeed: "Vitesse de lecture",
      slow: "Lent",
      normal: "Normal",
      fast: "Rapide",
      selectDocument: "Sélectionner un document",
      features: "Fonctionnalités",
      voiceCommands: "Commandes vocales disponibles",
      commands: [
        '"Lire le guide" - Commence la lecture',
        '"Arrêter" - Arrête la lecture',
        '"Plus lent" - Réduit la vitesse',
        '"Plus rapide" - Augmente la vitesse',
        '"Répéter" - Répète le dernier passage'
      ],
      audioGuides: {
        visa: {
          title: "Guide Visa Touristique",
          content: "Pour obtenir un visa touristique, vous devez préparer les documents suivants : un passeport valide avec au moins 6 mois de validité, un formulaire de demande dûment rempli, une photo d'identité récente, et des justificatifs de ressources financières suffisantes pour votre séjour."
        },
        work: {
          title: "Guide Permis de Travail", 
          content: "Le permis de travail nécessite un contrat de travail ou une promesse d'embauche, vos diplômes traduits et apostillés, un casier judiciaire de moins de 3 mois, et une visite médicale dans un centre agréé."
        },
        study: {
          title: "Guide Inscription Universitaire",
          content: "Pour vous inscrire à l'université, préparez vos diplômes traduits par un traducteur assermenté, les résultats d'un test de langue française comme le DELF ou TCF, une lettre de motivation détaillée, et vos relevés de notes des trois dernières années."
        }
      }
    },
    en: {
      title: "Audio Support",
      subtitle: "Voice assistance for accessibility and understanding", 
      listenToGuide: "Listen to guide",
      voiceControl: "Voice control",
      startListening: "Start listening",
      stopListening: "Stop listening",
      playGuide: "Play guide",
      stopReading: "Stop reading",
      voiceSpeed: "Reading speed",
      slow: "Slow",
      normal: "Normal", 
      fast: "Fast",
      selectDocument: "Select document",
      features: "Features",
      voiceCommands: "Available voice commands",
      commands: [
        '"Read guide" - Start reading',
        '"Stop" - Stop reading', 
        '"Slower" - Decrease speed',
        '"Faster" - Increase speed',
        '"Repeat" - Repeat last passage'
      ],
      audioGuides: {
        visa: {
          title: "Tourist Visa Guide",
          content: "To obtain a tourist visa, you must prepare the following documents: a valid passport with at least 6 months validity, a properly completed application form, a recent ID photo, and proof of sufficient financial resources for your stay."
        },
        work: {
          title: "Work Permit Guide",
          content: "A work permit requires an employment contract or job offer, your translated and apostilled diplomas, a criminal record check less than 3 months old, and a medical examination at an approved center."
        },
        study: {
          title: "University Enrollment Guide", 
          content: "To enroll in university, prepare your diplomas translated by a sworn translator, results from a French language test like DELF or TCF, a detailed motivation letter, and your transcripts from the last three years."
        }
      }
    }
  };

  const t = translations[language] || translations.fr;

  const documentOptions = [
    { id: 'visa', label: t.audioGuides.visa.title },
    { id: 'work', label: t.audioGuides.work.title },
    { id: 'study', label: t.audioGuides.study.title }
  ];

  const speedOptions = [
    { value: 0.7, label: t.slow },
    { value: 1, label: t.normal },
    { value: 1.3, label: t.fast }
  ];

  const features = [
    {
      icon: Headphones,
      title: "Lecture audio des guides",
      description: "Tous les guides peuvent être lus à voix haute"
    },
    {
      icon: Mic,
      title: "Commandes vocales",
      description: "Contrôlez l'application avec votre voix"
    },
    {
      icon: Settings,
      title: "Vitesse ajustable",
      description: "Adaptez la vitesse de lecture à vos besoins"
    },
    {
      icon: FileText,
      title: "Contenu accessible",
      description: "Optimisé pour les lecteurs d'écran"
    }
  ];

  const playAudio = (text: string) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = voiceSpeed;
    utterance.lang = language === 'fr' ? 'fr-FR' : 'en-US';
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    
    speechSynthesis.speak(utterance);
  };

  const stopAudio = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      speechRecognition.current = new SpeechRecognition();
      
      speechRecognition.current.continuous = true;
      speechRecognition.current.interimResults = false;
      speechRecognition.current.lang = language === 'fr' ? 'fr-FR' : 'en-US';
      
      speechRecognition.current.onstart = () => setIsListening(true);
      speechRecognition.current.onend = () => setIsListening(false);
      
      speechRecognition.current.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        console.log('Voice command:', transcript);
        
        if (transcript.includes('lire') || transcript.includes('read')) {
          playAudio(t.audioGuides[selectedDocument].content);
        } else if (transcript.includes('arrêter') || transcript.includes('stop')) {
          stopAudio();
        }
      };
      
      speechRecognition.current.start();
    }
  };

  const stopVoiceRecognition = () => {
    if (speechRecognition.current) {
      speechRecognition.current.stop();
    }
  };

  useEffect(() => {
    return () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
      if (speechRecognition.current) {
        speechRecognition.current.stop();
      }
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Audio Controls */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Headphones className="w-6 h-6 text-blue-600" />
            <span>{t.listenToGuide}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Document Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">{t.selectDocument}</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {documentOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={selectedDocument === option.id ? "default" : "outline"}
                  onClick={() => setSelectedDocument(option.id)}
                  className={`text-sm ${
                    selectedDocument === option.id ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Speed Control */}
          <div>
            <label className="block text-sm font-medium mb-2">{t.voiceSpeed}</label>
            <div className="flex space-x-2">
              {speedOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={voiceSpeed === option.value ? "default" : "outline"}
                  onClick={() => setVoiceSpeed(option.value)}
                  className={`text-sm ${
                    voiceSpeed === option.value ? "bg-teal-600 text-white" : ""
                  }`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex space-x-4">
            <Button
              onClick={() => playAudio(t.audioGuides[selectedDocument].content)}
              disabled={isPlaying}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <Headphones className="w-4 h-4 mr-2" />
              {isPlaying ? t.stopReading : t.playGuide}
            </Button>
            
            {isPlaying && (
              <Button
                onClick={stopAudio}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                ⏹️ {t.stopReading}
              </Button>
            )}
          </div>

          {/* Voice Recognition */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">{t.voiceControl}</h4>
            <Button
              onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
              variant={isListening ? "destructive" : "outline"}
              className="flex items-center space-x-2"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isListening ? t.stopListening : t.startListening}</span>
            </Button>
            {isListening && (
              <p className="text-sm text-green-600 mt-2 flex items-center">
                🎤 Écoute en cours... Dites vos commandes
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Voice Commands Help */}
      <Card>
        <CardHeader>
          <CardTitle>{t.voiceCommands}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {t.commands.map((command, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">{command}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AudioSupport;
