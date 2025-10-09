import React, { useState, useEffect } from 'react';
import { Star, Quote, Heart, Users, Sparkles, TrendingUp  , LinkIcon} from 'lucide-react';
import { Link } from 'react-router-dom';

function Testimonials({ colors = {} }) {
 
  const defaultColors = {
    primary: '#025984',
    secondary: '#0a8899',
    accent: '#0fb5a0',
    light: '#e7d8c4',
    success: '#01af4c'
  };
  
  const finalColors = { ...defaultColors, ...colors };

  const [visibleElements, setVisibleElements] = useState(new Set());
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatingStars, setAnimatingStars] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.dataset.element]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
      setAnimatingStars(true);
      setTimeout(() => setAnimatingStars(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { 
      name: 'Aicha B.', 
      location: 'Casablanca',
      review: 'Enfin un déodorant naturel qui fonctionne vraiment toute la journée! Les ingrédients naturels sont parfaits pour ma peau sensible.', 
      rating: 5,
      avatar: '👩🏻‍💼',
      product: 'Sensitive Care'
    },
    { 
      name: 'Youssef K.', 
      location: 'Rabat',
      review: 'En tant que sportif, j\'ai besoin d\'une protection sérieuse. OUSSO BODY me protège même pendant mes entraînements intensifs!', 
      rating: 5,
      avatar: '🏃🏻‍♂️',
      product: 'Sport Active'
    },
    { 
      name: 'Fatima Z.', 
      location: 'Marrakech',
      review: 'Je recommande vivement! Odeur délicieuse, efficacité prouvée et 100% naturel. Mes aisselles me remercient!', 
      rating: 5,
      avatar: '👩🏻‍🎨',
      product: 'Classic Fresh'
    },
    { 
      name: 'Omar M.', 
      location: 'Fès',
      review: 'Révolutionnaire! Plus de traces blanches, plus d\'irritations. La formule naturelle est incroyable.', 
      rating: 5,
      avatar: '👨🏻‍💻',
      product: 'Natural Formula'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Clients Satisfaits', icon: Users },
    { number: '4.9/5', label: 'Note Moyenne', icon: Star },
    { number: '98%', label: 'Recommandent', icon: Heart },
    { number: '100%', label: 'Naturel', icon: Sparkles }
  ];

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden" style={{backgroundColor: finalColors.light}}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full opacity-20 animate-pulse" style={{backgroundColor: finalColors.accent}}></div>
        <div className="absolute top-32 right-16 w-24 h-24 rounded-full opacity-30 animate-bounce" style={{backgroundColor: finalColors.primary}}></div>
        <div className="absolute bottom-20 left-1/4 w-32 h-32 rounded-full opacity-25 animate-pulse" style={{backgroundColor: finalColors.secondary, animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 rounded-full opacity-30 animate-bounce" style={{backgroundColor: finalColors.success, animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Animated Header */}
        <div className="text-center mb-16">
          <div 
            className={`animate-on-scroll transform transition-all duration-1000 ${
              visibleElements.has('header') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            data-element="header"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <Quote className="animate-pulse" style={{color: finalColors.accent}} size={32} />
              <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-900 via-teal-700 to-green-600 bg-clip-text text-transparent">
                Avis de nos Clients
              </h2>
              <Quote className="animate-pulse rotate-180" style={{color: finalColors.accent}} size={32} />
            </div>
            
            {/* Animated Star Rating */}
            <div className="flex justify-center mb-6 gap-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={28} 
                  className={`transition-all duration-500 ${animatingStars ? 'scale-125 rotate-12' : 'scale-100'}`}
                  style={{
                    color: finalColors.success, 
                    fill: finalColors.success,
                    animationDelay: `${i * 100}ms`
                  }} 
                />
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-4">
              <TrendingUp className="animate-bounce" style={{color: finalColors.success}} />
              <p className="text-2xl font-bold" style={{color: finalColors.primary}}>
                4.9/5 étoiles
              </p>
              <TrendingUp className="animate-bounce" style={{color: finalColors.success, animationDelay: '0.5s'}} />
            </div>
            <p className="text-lg opacity-80" style={{color: finalColors.secondary}}>
              Plus de 15,000 avis vérifiés
            </p>
            <Link to="/testimonials" className=" inline-flex items-center mt-4 text-sm font-medium text-blue-600 hover:underline" >
             <LinkIcon /> Voir tous les avis WhatsApp 
            </Link>
          </div>
        </div>

        {/* Stats Counter Animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`animate-on-scroll text-center group hover:scale-110 transition-all duration-500 ${
                visibleElements.has(`stat-${index}`) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              data-element={`stat-${index}`}
              style={{transitionDelay: `${index * 200}ms`}}
            >
              <div className="relative">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <stat.icon className="text-white animate-pulse" size={28} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <h3 className="text-2xl font-black mb-1" style={{color: finalColors.primary}}>{stat.number}</h3>
              <p className="text-sm font-medium opacity-80" style={{color: finalColors.secondary}}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Featured Testimonial Carousel */}
        <div className="mb-16">
          <div 
            className={`animate-on-scroll relative max-w-4xl mx-auto ${
              visibleElements.has('featured') ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            } transition-all duration-1000`}
            data-element="featured"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-500">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 left-4 text-6xl">❝</div>
                <div className="absolute bottom-4 right-4 text-6xl rotate-180">❝</div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-6 right-6 animate-spin" style={{animationDuration: '8s'}}>
                <Sparkles style={{color: finalColors.accent}} size={24} />
              </div>
              
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-4 animate-bounce">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <blockquote className="text-xl md:text-2xl font-medium mb-6 leading-relaxed" style={{color: finalColors.primary}}>
                  "{testimonials[currentTestimonial].review}"
                </blockquote>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="mx-1" style={{color: finalColors.success, fill: finalColors.success}} />
                  ))}
                </div>
                <p className="font-bold text-lg" style={{color: finalColors.secondary}}>
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-sm opacity-70" style={{color: finalColors.secondary}}>
                  {testimonials[currentTestimonial].location} • Utilisateur {testimonials[currentTestimonial].product}
                </p>
              </div>
            </div>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'scale-150' : 'scale-100 opacity-50'
                  }`}
                  style={{backgroundColor: finalColors.accent}}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div 
              key={index}
              className={`animate-on-scroll group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden ${
                visibleElements.has(`card-${index}`) 
                  ? 'translate-y-0 opacity-100 rotate-0' 
                  : 'translate-y-20 opacity-0 rotate-1'
              }`}
              data-element={`card-${index}`}
              style={{transitionDelay: `${index * 300}ms`}}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{background: `linear-gradient(135deg, ${finalColors.primary}, ${finalColors.accent})`}}></div>
              
              {/* Floating Quote */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" style={{background: `linear-gradient(135deg, ${finalColors.accent}, ${finalColors.success})`}}>
                <Quote className="text-white" size={20} />
              </div>
              
              <div className="relative z-10">
                {/* Avatar */}
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2 group-hover:animate-bounce">
                    {testimonial.avatar}
                  </div>
                  <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r" style={{background: `linear-gradient(90deg, ${finalColors.accent}, ${finalColors.success})`}}></div>
                </div>

                {/* Star Rating with Animation */}
                <div className="flex justify-center mb-4 gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className="transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" 
                      style={{
                        color: finalColors.success, 
                        fill: finalColors.success,
                        animationDelay: `${i * 100}ms`
                      }} 
                    />
                  ))}
                </div>
                
                {/* Review Text */}
                <blockquote className="text-base mb-6 leading-relaxed group-hover:scale-105 transition-transform duration-300" style={{color: finalColors.primary}}>
                  "{testimonial.review}"
                </blockquote>
                
                {/* Author Info */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-bold text-lg" style={{color: finalColors.secondary}}>
                    {testimonial.name}
                  </p>
                  <p className="text-sm opacity-70 flex items-center justify-center gap-2" style={{color: finalColors.secondary}}>
                    📍 {testimonial.location}
                    <span className="px-2 py-1 rounded-full text-xs font-medium" style={{backgroundColor: finalColors.accent + '20', color: finalColors.accent}}>
                      Vérifié
                    </span>
                  </p>
                </div>

                {/* Product Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white group-hover:animate-pulse" style={{backgroundColor: finalColors.primary}}>
                  {testimonial.product}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div 
          className={`animate-on-scroll mt-16 ${
            visibleElements.has('trust') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } transition-all duration-1000`}
          data-element="trust"
        >
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Heart className="text-white animate-pulse fill-current" size={24} />
                </div>
                <p className="font-bold text-xl" style={{color: finalColors.primary}}>100%</p>
                <p className="text-sm opacity-80" style={{color: finalColors.secondary}}>Satisfaction</p>
              </div>
              
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Star className="text-white animate-pulse fill-current" size={24} />
                </div>
                <p className="font-bold text-xl" style={{color: finalColors.primary}}>5⭐</p>
                <p className="text-sm opacity-80" style={{color: finalColors.secondary}}>Note Moyenne</p>
              </div>
              
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Users className="text-white animate-pulse" size={24} />
                </div>
                <p className="font-bold text-xl" style={{color: finalColors.primary}}>1.5k+</p>
                <p className="text-sm opacity-80" style={{color: finalColors.secondary}}>Clients Fidèles</p>
              </div>
              
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <TrendingUp className="text-white animate-pulse" size={24} />
                </div>
                <p className="font-bold text-xl" style={{color: finalColors.primary}}>98%</p>
                <p className="text-sm opacity-80" style={{color: finalColors.secondary}}>Recommandent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div 
          className={`animate-on-scroll text-center mt-16 ${
            visibleElements.has('cta') ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          } transition-all duration-1000`}
          data-element="cta"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-white to-gray-50 rounded-full shadow-lg border-2 group hover:scale-105 transition-all duration-300" style={{borderColor: finalColors.accent}}>
            <Heart className="text-red-500 fill-current animate-pulse" />
            <span className="font-bold text-lg" style={{color: finalColors.primary}}>
              Rejoignez plus de 15,000 clients satisfaits!
            </span>
            <Sparkles className="animate-spin" style={{color: finalColors.success}} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;