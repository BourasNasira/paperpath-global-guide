
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface DocumentGuideProps {
  language: string;
}

const DocumentGuide = ({ language }: DocumentGuideProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const translations = {
    fr: {
      title: "Guide des Documents",
      subtitle: "Trouvez les documents nécessaires pour vos démarches",
      search: "Rechercher un document...",
      categories: "Catégories",
      all: "Tous",
      visa: "Visa",
      work: "Travail",
      study: "Études",
      residence: "Résidence",
      downloadGuide: "Télécharger le guide",
      required: "Requis",
      optional: "Optionnel",
      documents: [
        {
          title: "Demande de Visa Touristique",
          category: "visa",
          description: "Documents requis pour une demande de visa de court séjour",
          requirements: ["Passeport valide", "Formulaire de demande", "Photo d'identité", "Justificatifs financiers"],
          difficulty: "Facile",
          timeEstimate: "2-3 semaines"
        },
        {
          title: "Permis de Travail",
          category: "work", 
          description: "Autorisation de travail pour les étrangers",
          requirements: ["Contrat de travail", "Diplômes", "Casier judiciaire", "Visite médicale"],
          difficulty: "Modéré",
          timeEstimate: "1-2 mois"
        },
        {
          title: "Inscription Universitaire",
          category: "study",
          description: "Documents pour s'inscrire dans une université",
          requirements: ["Diplômes traduits", "Test de langue", "Lettre de motivation", "Relevés de notes"],
          difficulty: "Modéré", 
          timeEstimate: "3-6 mois"
        },
        {
          title: "Carte de Séjour",
          category: "residence",
          description: "Titre de séjour pour résidents étrangers",
          requirements: ["Justificatif de domicile", "Ressources financières", "Assurance maladie", "Photos"],
          difficulty: "Difficile",
          timeEstimate: "2-4 mois"
        }
      ]
    },
    en: {
      title: "Document Guide",
      subtitle: "Find the documents needed for your procedures",
      search: "Search for a document...",
      categories: "Categories",
      all: "All",
      visa: "Visa",
      work: "Work",
      study: "Study", 
      residence: "Residence",
      downloadGuide: "Download guide",
      required: "Required",
      optional: "Optional",
      documents: [
        {
          title: "Tourist Visa Application",
          category: "visa",
          description: "Required documents for short-stay visa application",
          requirements: ["Valid passport", "Application form", "ID photo", "Financial proof"],
          difficulty: "Easy",
          timeEstimate: "2-3 weeks"
        },
        {
          title: "Work Permit",
          category: "work",
          description: "Work authorization for foreigners", 
          requirements: ["Work contract", "Diplomas", "Criminal record", "Medical exam"],
          difficulty: "Moderate",
          timeEstimate: "1-2 months"
        },
        {
          title: "University Enrollment",
          category: "study",
          description: "Documents to enroll in university",
          requirements: ["Translated diplomas", "Language test", "Motivation letter", "Transcripts"],
          difficulty: "Moderate",
          timeEstimate: "3-6 months"
        },
        {
          title: "Residence Card",
          category: "residence", 
          description: "Residence permit for foreign residents",
          requirements: ["Proof of address", "Financial resources", "Health insurance", "Photos"],
          difficulty: "Difficult",
          timeEstimate: "2-4 months"
        }
      ]
    }
  };

  const t = translations[language] || translations.fr;

  const categories = [
    { id: 'all', label: t.all },
    { id: 'visa', label: t.visa },
    { id: 'work', label: t.work },
    { id: 'study', label: t.study },
    { id: 'residence', label: t.residence }
  ];

  const filteredDocuments = t.documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'facile':
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'modéré':
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'difficile':
      case 'difficult':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder={t.search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={selectedCategory === category.id ? "bg-blue-600 text-white" : ""}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDocuments.map((doc, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{doc.title}</CardTitle>
                <Badge className={getDifficultyColor(doc.difficulty)}>
                  {doc.difficulty}
                </Badge>
              </div>
              <CardDescription>{doc.description}</CardDescription>
              <div className="text-sm text-blue-600 font-medium">
                ⏱️ {doc.timeEstimate}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t.required}:</h4>
                <ul className="space-y-1">
                  {doc.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                {t.downloadGuide}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucun document trouvé pour votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default DocumentGuide;
