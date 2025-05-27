import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, MapPin, Headphones, Download, Languages } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import DocumentGuide from '@/components/DocumentGuide';
import ServiceLocator from '@/components/ServiceLocator';
import AudioSupport from '@/components/AudioSupport';
import LanguageSelector from '@/components/LanguageSelector';

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedLanguage, setSelectedLanguage] = useState('fr');

  const translations = {
    fr: {
      welcome: "Bienvenue sur PaperPath",
      subtitle: "Votre assistant personnel pour naviguer dans les démarches administratives",
      description: "Une application intelligente et inclusive conçue pour aider les étrangers, les immigrants et les personnes vivant dans des zones reculées à comprendre les documents nécessaires à leurs démarches administratives.",
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
      howItWorks: "Comment ça marche"
    },
    en: {
      welcome: "Welcome to PaperPath",
      subtitle: "Your personal assistant for navigating administrative procedures",
      description: "An intelligent and inclusive application designed to help foreigners, immigrants and people living in remote areas understand the documents needed for their administrative procedures.",
      features: "Key Features",
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
      howItWorks: "How it works"
    },
    ar: {
      welcome: "مرحباً بك في PaperPath",
      subtitle: "مساعدك الشخصي للتنقل في الإجراءات الإدارية",
      description: "تطبيق ذكي وشامل مصمم لمساعدة الأجانب والمهاجرين والأشخاص الذين يعيشون في المناطق النائية على فهم الوثائق اللازمة لإجراءاتهم الإدارية.",
      features: "الميزات الرئيسية",
      documentGuide: "دليل الوثائق",
      documentGuideDesc: "تعليمات مفصلة لإجراءاتك",
      serviceLocator: "محدد موقع الخدمات",
      serviceLocatorDesc: "اعثر على المكاتب القريبة منك",
      audioSupport: "الدعم الصوتي",
      audioSupportDesc: "المساعدة الصوتية لسهولة الوصول",
      offlineMode: "وضع عدم الاتصال",
      offlineModeDesc: "الوصول بدون اتصال بالإنترنت",
      multiLanguage: "متعدد اللغات",
      multiLanguageDesc: "واجهة بلغتك الأم",
      getStarted: "ابدأ",
      howItWorks: "كيف يعمل"
    }
  };

  const t = translations[selectedLanguage];

  const features = [
    {
      icon: FileText,
      title: t.documentGuide,
      description: t.documentGuideDesc,
      color: "bg-blue-500"
    },
    {
      icon: MapPin,
      title: t.serviceLocator,
      description: t.serviceLocatorDesc,
      color: "bg-teal-500"
    },
    {
      icon: Headphones,
      title: t.audioSupport,
      description: t.audioSupportDesc,
      color: "bg-green-500"
    },
    {
      icon: Download,
      title: t.offlineMode,
      description: t.offlineModeDesc,
      color: "bg-purple-500"
    },
    {
      icon: Languages,
      title: t.multiLanguage,
      description: t.multiLanguageDesc,
      color: "bg-orange-500"
    }
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'documents':
        return <DocumentGuide language={selectedLanguage} />;
      case 'services':
        return <ServiceLocator language={selectedLanguage} />;
      case 'audio':
        return <AudioSupport language={selectedLanguage} />;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6 py-12 px-4">
              <div className="flex justify-center mb-6">
                <img 
                  src="/lovable-uploads/a6977eb7-a5ef-4f40-966e-b72f60e7daf5.png" 
                  alt="PaperPath Logo" 
                  className="w-24 h-24 object-contain"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                {t.welcome}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t.subtitle}
              </p>
              <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {t.description}
              </p>
              <Button 
                onClick={() => setCurrentView('documents')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
              >
                {t.getStarted}
              </Button>
            </div>

            {/* User Images */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 max-w-4xl mx-auto">
              <img 
                src="/lovable-uploads/88713b5b-ce37-425f-8244-3ec9fcc4d7a0.png" 
                alt="User using PaperPath" 
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <img 
                src="/lovable-uploads/1728a585-77e5-48a3-9b68-c7d4213ec07d.png" 
                alt="User with PaperPath" 
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <img 
                src="/lovable-uploads/6fef9f5f-9db2-4027-bb82-86d2e4411c61.png" 
                alt="Group using PaperPath" 
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <img 
                src="/lovable-uploads/29334d10-7108-4382-82ae-66f7825a5a0c.png" 
                alt="Friends with PaperPath" 
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <img 
                src="/lovable-uploads/a6cc40ff-6784-4ea1-a95c-2e086cc7cb05.png" 
                alt="User in waiting area" 
                className="w-full h-48 object-cover rounded-lg shadow-md col-span-2 md:col-span-1"
              />
            </div>

            {/* Features Section */}
            <div className="px-4 py-12">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                {t.features}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-gray-600">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* How it Works */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 py-12 px-4">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                {t.howItWorks}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Sélectionnez votre démarche</h3>
                  <p className="text-gray-600">Choisissez le type de document ou démarche administrative</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Suivez le guide</h3>
                  <p className="text-gray-600">Instructions détaillées étape par étape dans votre langue</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Trouvez les services</h3>
                  <p className="text-gray-600">Localisez les bureaux et services près de chez vous</p>
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
      <main className="pt-16">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default Index;
