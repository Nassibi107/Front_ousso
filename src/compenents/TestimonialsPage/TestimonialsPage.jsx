import { useState } from 'react';

const TestimonialsPage = ({ colors}) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  

  const testimonials = [
    {
      id: 1,
      nom: "Marie Dubois",
      ville: "Paris",
      produit: "Collection Élégance",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b2bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      note: 5,
      commentaire: "Absolument magnifique ! La qualité est exceptionnelle et le design correspond parfaitement à mes attentes. Je recommande vivement cette marque à tous mes amis. Le service client est également formidable.",
      date: "15 Janvier 2025"
    },
    {
      id: 2,
      nom: "Jean-Pierre Martin",
      ville: "Lyon",
      produit: "Série Premium",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1126&q=80",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      note: 5,
      commentaire: "Un investissement qui en vaut la peine ! La livraison était rapide et l'emballage soigné. Le produit dépasse toutes mes espérances. Merci pour cette expérience d'achat exceptionnelle.",
      date: "08 Janvier 2025"
    },
    {
      id: 3,
      nom: "Sophie Leroy",
      ville: "Marseille",
      produit: "Edition Limitée",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      note: 5,
      commentaire: "Parfait en tous points ! Design moderne, qualité irréprochable et un service après-vente au top. Je n'hésiterai pas à recommander et à repasser commande très bientôt.",
      date: "03 Janvier 2025"
    },
    {
      id: 4,
      nom: "Pierre Rousseau",
      ville: "Toulouse",
      produit: "Gamme Classique",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1099&q=80",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      note: 4,
      commentaire: "Très satisfait de mon achat ! Rapport qualité-prix excellent. Quelques petites améliorations possibles mais dans l'ensemble, c'est un produit que je recommande sans hésitation.",
      date: "28 Décembre 2024"
    },
    {
      id: 5,
      nom: "Camille Bernard",
      ville: "Nice",
      produit: "Collection Moderne",
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      note: 5,
      commentaire: "Une découverte fantastique ! Je cherchais depuis longtemps ce type de produit et je suis ravie d'avoir trouvé cette marque. La qualité est au rendez-vous et le design est sublime.",
      date: "20 Décembre 2024"
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 35%, ${colors.accent} 100%)`
      }}
    >
      {/* Nature Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 2px), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2px, transparent 2px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-8 h-8 opacity-20 animate-pulse"
          style={{ 
            top: '15%', 
            left: '10%',
            background: colors.light,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
        />
        <div 
          className="absolute w-6 h-6 opacity-30 animate-pulse"
          style={{ 
            top: '25%', 
            right: '15%',
            background: colors.light,
            borderRadius: '0 100% 0 100%',
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute w-10 h-10 opacity-15 animate-pulse"
          style={{ 
            bottom: '20%', 
            left: '5%',
            background: colors.light,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            animationDelay: '2s'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Témoignages Clients
          </h1>
          <p className="text-xl text-white opacity-90 max-w-3xl mx-auto">
            Découvrez ce que nos clients pensent de nos produits. Leurs expériences authentiques 
            et leurs photos témoignent de la qualité de nos créations.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div 
          className="bg-white rounded-2xl shadow-2xl p-8 mb-12 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src={testimonials[activeTestimonial].image}
                alt={testimonials[activeTestimonial].produit}
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div>
              <div className="flex items-center mb-4">
                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].nom}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold" style={{ color: colors.primary }}>
                    {testimonials[activeTestimonial].nom}
                  </h3>
                  <p className="text-gray-600">{testimonials[activeTestimonial].ville}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {renderStars(testimonials[activeTestimonial].note)}
                <span className="ml-2 text-gray-600">
                  {testimonials[activeTestimonial].note}/5 étoiles
                </span>
              </div>

              <h4 
                className="text-lg font-semibold mb-3"
                style={{ color: colors.secondary }}
              >
                Produit: {testimonials[activeTestimonial].produit}
              </h4>
              
              <blockquote className="text-gray-700 text-lg italic mb-4 leading-relaxed">
                "{testimonials[activeTestimonial].commentaire}"
              </blockquote>
              
              <p className="text-sm text-gray-500">
                Publié le {testimonials[activeTestimonial].date}
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 backdrop-blur-sm ${
                index === activeTestimonial ? 'ring-4' : ''
              }`}
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.90)',
                ringColor: index === activeTestimonial ? colors.accent : 'transparent'
              }}
              onClick={() => setActiveTestimonial(index)}
            >
              <div className="relative mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.produit}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div 
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-sm font-semibold"
                  style={{ backgroundColor: colors.accent }}
                >
                  {testimonial.produit}
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.nom}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-semibold" style={{ color: colors.primary }}>
                    {testimonial.nom}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.ville}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                {renderStars(testimonial.note)}
              </div>
              
              <p className="text-gray-600 text-sm line-clamp-3">
                "{testimonial.commentaire.substring(0, 120)}..."
              </p>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div 
          className="bg-white rounded-xl shadow-2xl p-8 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
        >
          <h2 
            className="text-3xl font-bold text-center mb-8"
            style={{ color: colors.primary }}
          >
            Nos Chiffres de Satisfaction
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: colors.accent }}
              >
                98%
              </div>
              <p className="text-gray-600">Clients Satisfaits</p>
            </div>
            <div>
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: colors.secondary }}
              >
                1,250+
              </div>
              <p className="text-gray-600">Témoignages Positifs</p>
            </div>
            <div>
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: colors.success }}
              >
                4.9/5
              </div>
              <p className="text-gray-600">Note Moyenne</p>
            </div>
            <div>
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: colors.primary }}
              >
                24h
              </div>
              <p className="text-gray-600">Délai de Réponse</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">
            Vous aussi, partagez votre expérience !
          </h3>
          <p className="text-white opacity-90 mb-6 max-w-2xl mx-auto">
            Rejoignez nos clients satisfaits et partagez vos photos et commentaires. 
            Votre avis nous aide à nous améliorer continuellement.
          </p>
          <button
            className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            style={{ backgroundColor: colors.accent }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.secondary;
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = colors.accent;
              e.target.style.transform = 'scale(1)';
            }}
          >
            Laisser un Témoignage
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;