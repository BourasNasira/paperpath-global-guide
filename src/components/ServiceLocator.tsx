
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Info, Users } from 'lucide-react';

interface ServiceLocatorProps {
  language: string;
}

const ServiceLocator = ({ language }: ServiceLocatorProps) => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  const translations = {
    fr: {
      title: "Localisation des Services",
      subtitle: "Trouvez les bureaux et services administratifs près de chez vous",
      searchLocation: "Rechercher par ville ou adresse...",
      useMyLocation: "Utiliser ma position",
      serviceTypes: "Types de services",
      all: "Tous",
      prefecture: "Préfecture",
      embassy: "Ambassade", 
      university: "Université",
      hospital: "Hôpital",
      openNow: "Ouvert maintenant",
      closed: "Fermé",
      getDirections: "Itinéraire",
      callNow: "Appeler",
      services: [
        {
          name: "Préfecture de Paris",
          type: "prefecture",
          address: "5 Rue Leblanc, 75015 Paris",
          phone: "01 75 01 75 01",
          hours: "9h00 - 17h00",
          distance: "2.3 km",
          isOpen: true,
          description: "Services de carte de séjour, naturalisation"
        },
        {
          name: "Ambassade du Maroc",
          type: "embassy", 
          address: "5 Rue Le Tasse, 75016 Paris",
          phone: "01 45 20 69 35",
          hours: "9h00 - 16h00",
          distance: "3.1 km",
          isOpen: false,
          description: "Services consulaires, visas, légalisations"
        },
        {
          name: "Université Sorbonne",
          type: "university",
          address: "21 Rue de l'École de Médecine, 75006 Paris", 
          phone: "01 40 46 16 16",
          hours: "8h00 - 18h00",
          distance: "1.8 km",
          isOpen: true,
          description: "Inscriptions, équivalences de diplômes"
        },
        {
          name: "Hôpital Saint-Louis",
          type: "hospital",
          address: "1 Avenue Claude Vellefaux, 75010 Paris",
          phone: "01 42 49 49 49", 
          hours: "24h/24",
          distance: "4.2 km",
          isOpen: true,
          description: "Urgences, consultations, examens médicaux"
        }
      ]
    },
    en: {
      title: "Service Locator", 
      subtitle: "Find administrative offices and services near you",
      searchLocation: "Search by city or address...",
      useMyLocation: "Use my location",
      serviceTypes: "Service types",
      all: "All",
      prefecture: "Prefecture",
      embassy: "Embassy",
      university: "University", 
      hospital: "Hospital",
      openNow: "Open now",
      closed: "Closed", 
      getDirections: "Directions",
      callNow: "Call",
      services: [
        {
          name: "Prefecture of Paris",
          type: "prefecture",
          address: "5 Rue Leblanc, 75015 Paris",
          phone: "01 75 01 75 01",
          hours: "9:00 AM - 5:00 PM",
          distance: "2.3 km",
          isOpen: true,
          description: "Residence card services, naturalization"
        },
        {
          name: "Embassy of Morocco",
          type: "embassy",
          address: "5 Rue Le Tasse, 75016 Paris", 
          phone: "01 45 20 69 35",
          hours: "9:00 AM - 4:00 PM",
          distance: "3.1 km",
          isOpen: false,
          description: "Consular services, visas, legalizations"
        },
        {
          name: "Sorbonne University",
          type: "university",
          address: "21 Rue de l'École de Médecine, 75006 Paris",
          phone: "01 40 46 16 16", 
          hours: "8:00 AM - 6:00 PM",
          distance: "1.8 km",
          isOpen: true,
          description: "Enrollment, diploma equivalences"
        },
        {
          name: "Saint-Louis Hospital",
          type: "hospital",
          address: "1 Avenue Claude Vellefaux, 75010 Paris",
          phone: "01 42 49 49 49",
          hours: "24/7",
          distance: "4.2 km", 
          isOpen: true,
          description: "Emergency, consultations, medical exams"
        }
      ]
    }
  };

  const t = translations[language] || translations.fr;

  const serviceTypes = [
    { id: 'all', label: t.all },
    { id: 'prefecture', label: t.prefecture },
    { id: 'embassy', label: t.embassy },
    { id: 'university', label: t.university },
    { id: 'hospital', label: t.hospital }
  ];

  const filteredServices = t.services.filter(service => {
    const matchesType = selectedService === 'all' || service.type === selectedService;
    const matchesLocation = service.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
                           service.address.toLowerCase().includes(searchLocation.toLowerCase());
    return matchesType && matchesLocation;
  });

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          console.log('Location obtained:', position.coords);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Search and Location */}
      <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder={t.searchLocation}
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          onClick={requestLocation}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <MapPin className="w-4 h-4" />
          <span>{t.useMyLocation}</span>
        </Button>
      </div>

      {/* Service Types */}
      <div className="flex flex-wrap justify-center gap-2">
        {serviceTypes.map((type) => (
          <Button
            key={type.id}
            variant={selectedService === type.id ? "default" : "outline"}
            onClick={() => setSelectedService(type.id)}
            className={selectedService === type.id ? "bg-teal-600 text-white" : ""}
          >
            {type.label}
          </Button>
        ))}
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((service, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <Badge 
                  className={service.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                >
                  {service.isOpen ? t.openNow : t.closed}
                </Badge>
              </div>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{service.address}</span>
                  <Badge variant="outline" className="ml-auto">
                    {service.distance}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Info className="w-4 h-4" />
                  <span>{service.hours}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  <MapPin className="w-4 h-4 mr-2" />
                  {t.getDirections}
                </Button>
                <Button variant="outline" className="flex-1">
                  📞 {t.callNow}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucun service trouvé pour votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default ServiceLocator;
