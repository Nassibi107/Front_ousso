import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, MessageCircle, Phone, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const colors = {
  primary: '#025984',
  secondary: '#0a8899',
  accent: '#0fb5a0',
  light: '#e7d8c4',
  success: '#01af4c'
};

const TestimonialsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const testimonialsPerPage = 6;

  // Sample testimonials data with Moroccan names - Deodorant specific
  const testimonials = [
    {
      id: 1,
      name: "Fatima El Amrani",
      city: "Casablanca",
      rating: 5,
      text: "Ce déodorant est une révélation ! Fini les traces blanches sur mes vêtements noirs. Il tient toute la journée même avec la chaleur de Casablanca. Je ne peux plus m'en passer !",
      productImage: "https://images.unsplash.com/photo-1556228724-c4b7d7c8e9de?w=300&h=200&fit=crop",
      conversationImage: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=400&h=300&fit=crop",
      date: "15 Août 2024"
    },
    {
      id: 2,
      name: "Youssef Benali",
      city: "Rabat",
      rating: 5,
      text: "Enfin un déodorant qui tient ses promesses ! Protection 48h réelle, même après le sport. L'odeur est fraîche et masculine. Mon épouse l'adore aussi !",
      productImage: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=200&fit=crop",
      conversationImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      date: "28 Juillet 2024"
    },
    {
      id: 3,
      name: "Aicha Lahlou",
      city: "Marrakech",
      rating: 5,
      text: "Parfait pour le climat chaud de Marrakech ! Ce déodorant ne laisse aucune trace et reste efficace toute la journée. Ma peau sensible le tolère parfaitement.",
      productImage: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=200&fit=crop",
      conversationImage: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=300&fit=crop",
      date: "10 Septembre 2024"
    },
    {
      id: 4,
      name: "Omar Chakir",
      city: "Fès",
      rating: 5,
      text: "Excellent déodorant ! Plus de problème de transpiration excessive. Le parfum est subtil et élégant. Rapport qualité-prix imbattable comparé aux marques internationales.",
      productImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=300&h=200&fit=crop",
      conversationImage: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400&h=300&fit=crop",
      date: "3 Août 2024"
    },
    {
      id: 5,
      name: "Khadija Tazi",
      city: "Tanger",
      rating: 5,
      text: "Ce déodorant a changé ma vie ! Fini le stress des auréoles sur mes chemisiers. Protection longue durée garantie, même lors de mes réunions importantes.",
      productImage: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=300&h=200&fit=crop",
      conversationImage: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
      date: "22 Septembre 2024"
    },
    {
      id: 6,
      name: "Rachid Bennani",
      city: "Agadir",
      rating: 5,
      text: "Formule révolutionnaire ! Ce déodorant anti-transpirant me donne une confiance totale. Idéal pour les journées chaudes d'Agadir. Je le recommande à tous mes collègues !",
      productImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      conversationImage: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
      date: "5 Septembre 2024"
    },
    {
      id: 7,
      name: "Salma Idrissi",
      city: "Meknès",
      rating: 5,
      text: "Déodorant de qualité premium ! Texture agréable, séchage rapide et efficacité prouvée. Plus jamais de gêne ou d'inconfort. Un vrai plaisir à utiliser au quotidien.",
      productImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=200&fit=crop",
      conversationImage: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop",
      date: "18 Août 2024"
    },
    {
      id: 8,
      name: "Hassan Alaoui",
      city: "Oujda",
      rating: 5,
      text: "Enfin un déodorant qui respecte ma peau ! Formule sans aluminium mais super efficace. L'équipe m'a bien conseillé sur WhatsApp pour choisir le bon parfum.",
      productImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      conversationImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      date: "12 Juillet 2024"
    },
    {
      id: 9,
      name: "Naima Berrada",
      city: "Tétouan",
      rating: 5,
      text: "Protection maximale assurée ! Ce déodorant tient toutes ses promesses. Parfum délicat et féminin, application facile. Mes vêtements restent impeccables toute la journée !",
      productImage: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=300&h=200&fit=crop",
      conversationImage: "https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=400&h=300&fit=crop",
      date: "1er Septembre 2024"
    }
  ];

  // Pagination logic
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  const startIndex = (currentPage - 1) * testimonialsPerPage;
  const currentTestimonials = testimonials.slice(startIndex, startIndex + testimonialsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const closeModal = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.light }}>
      {/* Header */}
      <div className="py-16 px-4" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Témoignages Déodorants
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl mx-auto">
            Découvrez pourquoi nos déodorants révolutionnaires transforment le quotidien de nos clients
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 px-4" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Clients Satisfaits</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-lg opacity-90">Note Moyenne</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-lg opacity-90">Recommandations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Deodorant Product Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={testimonial.productImage}
                    alt="Déodorant"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: colors.primary }}>
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{testimonial.city}</p>
                    </div>
                    <StarRating rating={testimonial.rating} />
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {testimonial.text}
                  </p>

                  {/* WhatsApp Conversation Preview */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center mb-2">
                      <MessageCircle className="w-4 h-4 mr-2" style={{ color: colors.accent }} />
                      <span className="text-sm font-medium">Conversation WhatsApp</span>
                    </div>
                    <img
                      src={testimonial.conversationImage}
                      alt="Conversation"
                      className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedConversation(testimonial)}
                    />
                    <p className="text-xs text-gray-500 mt-1">Cliquer pour agrandir</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{testimonial.date}</span>
                    <div className="flex items-center" style={{ color: colors.success }}>
                      <Check className="w-4 h-4 mr-1" />
                      <span>Vérifié</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-4 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Précédent
            </button>

            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg transition-colors duration-200 ${
                      currentPage === page
                        ? 'text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                    style={{
                      backgroundColor: currentPage === page ? colors.primary : undefined
                    }}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Suivant
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Conversation Modal */}
      {selectedConversation && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" style={{ color: colors.accent }} />
                <div>
                  <h3 className="font-semibold" style={{ color: colors.primary }}>
                    Conversation avec {selectedConversation.name}
                  </h3>
                  <p className="text-sm text-gray-600">{selectedConversation.city}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedConversation.conversationImage}
                alt="Conversation complète"
                className="w-full max-h-96 object-contain rounded-lg"
              />
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < selectedConversation.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {selectedConversation.date}
                  </span>
                </div>
                <p className="text-gray-700 italic">
                  "{selectedConversation.text}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="py-16 px-4" style={{ backgroundColor: colors.accent }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Rejoignez des milliers de clients satisfaits
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Découvrez nos déodorants haute performance et changez votre quotidien
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
            href="https://wa.me/+212600586528"
              className="px-8 py-3 bg-white rounded-lg font-semibold transition-transform duration-200 hover:scale-105"
              style={{ color: colors.accent }}
            >
              <Phone className="w-5 h-5 inline mr-2" />
              Contacter via WhatsApp
            </a>
            <Link
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white transition-colors duration-200"
              to="/#products"
              style={{ color: 'white' }}
              onMouseEnter={(e) => e.target.style.color = colors.accent}
              onMouseLeave={(e) => e.target.style.color = 'white'}
            >
              Voir nos déodorants
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;

