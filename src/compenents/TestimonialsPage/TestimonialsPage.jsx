import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, MessageCircle, Phone, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GET_REVIEWS

 } from '../../../graphQL/queriers';
import { useQuery } from '@apollo/client/react';
const GRQLURL = import.meta.env.VITE_API_URL_GRAPHQL;

const BACK_URL = import.meta.env.VITE_API_BACKEND_URL;
const colors = {
  primary: '#025984',
  secondary: '#0a8899',
  accent: '#0fb5a0',
  light: '#e7d8c4',
  success: '#01af4c'
};

const TestimonialsPage = () => {
  const { loading, error, data } = useQuery(GET_REVIEWS);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const testimonialsPerPage = 6;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching testimonials</p>;

  const testimonials = data.getReviews;

  const formattedTestimonials = testimonials.map(testimonial => ({
    id: testimonial.review_id,
    name: testimonial.name,
    city: testimonial.location,
    rating: testimonial.rating,
    text: testimonial.text,
    productImage: testimonial.Product_img,
    conversationImage: testimonial.conversation_img,
    date: testimonial.createdAt
  }));

 



  // Pagination logic
  const totalPages = Math.ceil(formattedTestimonials.length / testimonialsPerPage);
  const startIndex = (currentPage - 1) * testimonialsPerPage;
  const currentTestimonials = formattedTestimonials.slice(startIndex, startIndex + testimonialsPerPage);

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
                    src={`${BACK_URL}${testimonial.productImage}`}
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
                      src={`${BACK_URL}${testimonial.conversationImage}`}
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
                src={`${BACK_URL}${selectedConversation.conversationImage}`}
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
            href="https://wa.me/+212646259562"
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

