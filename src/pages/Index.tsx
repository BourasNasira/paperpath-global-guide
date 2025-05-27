import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NavigationHeader from "@/components/NavigationHeader";
import DocumentGuide from "@/components/DocumentGuide";
import ServiceLocator from "@/components/ServiceLocator";
import AudioSupport from "@/components/AudioSupport";
import { FileText, Languages, Headphones, MapPin } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState("home");
  const [selectedLanguage, setSelectedLanguage] = useState("fr");

  const translations = {
    fr: {
      welcome: "Bienvenue sur PaperPath",
      subtitle:
        "Votre assistant personnel pour naviguer dans les démarches administratives",
      description:
        "Une application intelligente et inclusive conçue pour aider les étrangers, les immigrants et les personnes vivant dans des zones reculées à comprendre les documents nécessaires à leurs démarches administratives.",
      features: "Fonctionnalités principales",
      documentGuide: "Guide des Documents",
      documentGuideDesc: "Instructions détaillées pour vos démarches",
      serviceLocator: "Localisation des Services",
      serviceLocatorDesc: "Trouvez les bureaux près de chez vous",
      audioSupport: "Support Audio",
      audioSupportDesc: "Assistance vocale pour l'accessibilité",
      offlineMode: "Mode Hors Ligne",
      offlineModeDesc: "Accès sans connexion internet",
      multiLanguage: "Multilingue",
      multiLanguageDesc: "Interface dans votre langue maternelle",
      getStarted: "Commencer",
      howItWorks: "Comment ça marche",
      heroTitle: "Naviguez dans la bureaucratie avec confiance",
      heroDesc:
        "PaperPath simplifie les processus administratifs complexes pour les étrangers, immigrants et personnes dans les zones reculées. Obtenez des instructions étape par étape dans votre langue.",
      startProcess: "Commencer le processus",
      findOffices: "Trouver des bureaux",
      whyChoose: "Pourquoi choisir PaperPath?",
      whyChooseDesc:
        "Cliquez sur chaque fonctionnalité pour voir comment PaperPath rend la bureaucratie accessible et simple.",
      clickToTry: "Cliquer pour essayer →",
    },
    en: {
      welcome: "Welcome to PaperPath",
      subtitle: "Your personal assistant for navigating administrative procedures",
      description:
        "An intelligent and inclusive app designed to help foreigners, immigrants, and people living in remote areas understand the documents needed for their administrative procedures.",
      features: "Main Features",
      documentGuide: "Document Guide",
      documentGuideDesc: "Detailed instructions for your procedures",
      serviceLocator: "Service Locator",
      serviceLocatorDesc: "Find offices near you",
      audioSupport: "Audio Support",
      audioSupportDesc: "Voice assistance for accessibility",
      offlineMode: "Offline Mode",
      offlineModeDesc: "Access without internet connection",
      multiLanguage: "Multilingual",
      multiLanguageDesc: "Interface in your native language",
      getStarted: "Get Started",
      howItWorks: "How it works",
      heroTitle: "Navigate bureaucracy with confidence",
      heroDesc:
        "PaperPath simplifies complex administrative processes for foreigners, immigrants, and people in remote areas. Get step-by-step instructions in your language.",
      startProcess: "Start the process",
      findOffices: "Find offices",
      whyChoose: "Why choose PaperPath?",
      whyChooseDesc:
        "Click on each feature to see how PaperPath makes bureaucracy accessible and simple.",
      clickToTry: "Click to try →",
    },
  };

  const t = translations[selectedLanguage];

  const features = [
    {
      icon: FileText,
      title: t.documentGuide,
      description: t.documentGuideDesc,
      color: "bg-blue-500",
      number: "01",
      image: "/lovable-uploads/a6cc40ff-6784-4ea1-a95c-2e086cc7cb05.png",
    },
    {
      icon: Languages,
      title: t.multiLanguage,
      description: t.multiLanguageDesc,
      color: "bg-green-500",
      number: "02",
      image: "/lovable-uploads/1728a585-77e5-48a3-9b68-c7d4213ec07d.png",
    },
    {
      icon: Headphones,
      title: t.audioSupport,
      description: t.audioSupportDesc,
      color: "bg-purple-500",
      number: "03",
      image: "/lovable-uploads/88713b5b-ce37-425f-8244-3ec9fcc4d7a0.png",
    },
    {
      icon: MapPin,
      title: t.serviceLocator,
      description: t.serviceLocatorDesc,
      color: "bg-orange-500",
      number: "04",
      image: "/lovable-uploads/29334d10-7108-4382-82ae-66f7825a5a0c.png",
    },
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case "documents":
        return <DocumentGuide language={selectedLanguage} />;
      case "services":
        return <ServiceLocator language={selectedLanguage} />;
      case "audio":
        return <AudioSupport language={selectedLanguage} />;
      default:
        return (
          <div className="space-y-16">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20 px-4">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    {t.heroTitle}
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">{t.heroDesc}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => setCurrentView("documents")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg font-medium"
                      size="lg"
                    >
                      {t.startProcess}
                    </Button>
                    <Button
                      onClick={() => setCurrentView("services")}
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg rounded-lg font-medium"
                      size="lg"
                    >
                      {t.findOffices}
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-2xl p-4 transform">
                    <img
                      src="/lovable-uploads/pap.jpg"
                      alt="PaperPath users"
                      className="w-full h-96 object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose PaperPath Section */}
            <div className="py-16 px-4 bg-white">
              <div className="max-w-6xl mx-auto text-center space-y-12">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.whyChoose}</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.whyChooseDesc}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => (
                    <Card
                      key={index}
                      className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-0 shadow-lg"
                      onClick={() => {
                        if (feature.title === t.documentGuide) setCurrentView("documents");
                        if (feature.title === t.serviceLocator) setCurrentView("services");
                        if (feature.title === t.audioSupport) setCurrentView("audio");
                      }}
                    >
                      <CardHeader className="text-center space-y-4">
                        <div className="relative">
                          <div
                            className="w-24 h-24 bg-center bg-cover rounded-2xl mx-auto shadow-md group-hover:scale-110 transition-transform duration-300"
                            style={{ backgroundImage: `url(${feature.image})` }}
                          ></div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {feature.number}
                          </div>
                        </div>
                        <CardTitle className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center pb-6">
                        <CardDescription className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </CardDescription>
                        <Button
                          variant="ghost"
                          className="mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                        >
                          {t.clickToTry}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <main className="pt-16">{renderCurrentView()}</main>
    </div>
  );
};

export default Index;
