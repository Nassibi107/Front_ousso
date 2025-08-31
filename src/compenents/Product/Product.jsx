import React, { useState, useEffect } from 'react';
import { Check, Star, Sparkles, ArrowRight, Heart, Leaf } from 'lucide-react';
import { image } from 'framer-motion/client';

import women from '../../assets/women.png'
import man from '../../assets/man.png'
import manWomen from '../../assets/w+m.jpg'

function Product({ colors = {} }) {
  // Default colors in case colors prop is undefined
  const defaultColors = {
    primary: '#1f2937',
    secondary: '#374151', 
    accent: '#0d9488', 
    success: '#10b981',
    light: '#f9fafb'
  };
  
  const finalColors = { ...defaultColors, ...colors };

  const [visibleCards, setVisibleCards] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const products = [
     {
      name: 'Déodorant Naturel Femme', 
      price: '129 DH', 
      originalPrice: '149 DH',
      features: ['Essentiel Beauté', 'SPF Protection', 'Pour Femme', 'Formule Délicate'], 
      image: man,
      bgColor: 'from-purple-50 to-violet-50'
    },
    { 
      name: 'Déodorant Naturel Classic', 
      price: '199 DH', 
      // originalPrice: '149 DH',
      features: ['Routine Quotidien','SPF Protection', 'Efficace 48 heures', 'Ralentit la repousse'],
        popular: true,
      image: manWomen,
      bgColor: 'from-orange-100 to-red-100'
    },
   
    { 
      name: 'Déodorant Naturel unisexe', 
      price: '129 DH', 
      originalPrice: '149 DH',
      features: ['Formule Unisexe', 'Extra Forte', 'Parfum Frais', 'Longue Durée'],
      bgColor: 'from-green-50 to-emerald-50',
      image: women,
    }
  ];

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden relative">
      <div className="container mx-auto px-6">
        {/* Animated Header */}
        <div className="text-center mb-16 transform">
          <div className="inline-flex items-center gap-3 mb-6">
            <Leaf className="animate-pulse" style={{color: finalColors.accent}} size={32} />
            <h2 className="text-5xl font-bold bg-gradient-to-r from-teal-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
              Notre Gamme OUSSO BODY
            </h2>
            <Heart className="animate-pulse text-red-500 fill-current" size={32} />
          </div>
          <p className="text-xl text-gray-600 font-medium">
            Déodorants naturels 100% efficaces • 0% Aluminium • Protection longue durée
          </p>
        </div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {products.map((product, index) => (
            <div 
              key={index}
              data-index={index}
              className={`product-card group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer transform bg-gradient-to-br ${product.bgColor} ${
                visibleCards.has(String(index)) 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-20 opacity-0 scale-95'
              } ${product.popular ? 'ring-4 ring-yellow-400 ring-opacity-60' : ''}`}
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              {/* Popular Badge */}
              {product.popular && (
                <div className="absolute  left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white text-sm font-bold flex items-center gap-2 animate-pulse shadow-lg z-20">
                  <Star size={16} className="fill-current animate-spin" />
                  Plus Populaire
                  <Star size={16} className="fill-current animate-spin" />
                </div>
              )}
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-green-500 to-emerald-500 opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
              
              <div className="relative z-10 p-8 text-center">
                {/* Product Image with 3D Animation */}
                <div className="relative mb-8 group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-green-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-spin" style={{animationDuration: '4s'}}></div>
                  <div className="relative w-40 h-40 mx-auto">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full rounded-2xl object-cover shadow-xl group-hover:shadow-2xl transition-all duration-500 border-4 border-white"
                    />
                    {/* Floating Badge */}
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                      <Leaf size={20} className="text-white" />
                    </div>
                    {/* Quality Badge */}
                    <div className="absolute -bottom-2 -left-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-xs font-bold animate-pulse">
                      0% Aluminium
                    </div>
                  </div>
                </div>

                {/* Product Name with Gradient */}
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Price Section */}
                <div className="mb-6 flex items-center justify-center gap-3">
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  <div className="relative">
                    <p className="text-3xl font-black text-teal-600 group-hover:scale-110 transition-transform duration-300">
                      {product.price}
                    </p>
                    <div className="absolute -top-1 -right-1">
                      <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-bold animate-bounce">
                    PROMO
                  </span>
                </div>
                
                {/* Animated Features List */}
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      className={`flex items-center justify-center transform transition-all duration-500 group-hover:scale-105 ${
                        visibleCards.has(String(index)) 
                          ? 'translate-x-0 opacity-100' 
                          : 'translate-x-10 opacity-0'
                      }`}
                      style={{transitionDelay: `${(index * 200) + (idx * 100)}ms`}}
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center mr-3 group-hover:rotate-180 transition-transform duration-500">
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                {/* Enhanced Button */}
                <button className="relative w-full py-4 rounded-xl font-bold text-white overflow-hidden group transition-all duration-300 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 hover:scale-105 hover:shadow-xl">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Ajouter au Panier
                    <div className="w-6 h-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                      <ArrowRight size={16} />
                    </div>
                  </span>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -skew-x-12 transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-teal-100 to-green-100 rounded-full shadow-lg animate-bounce border border-teal-200">
            <Sparkles className="text-teal-500 animate-spin" />
            <span className="font-bold text-gray-700">Livraison gratuite à partir de 200 DH!</span>
            <Sparkles className="text-green-500 animate-spin" style={{animationDirection: 'reverse'}} />
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 opacity-80">
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center">
              <Leaf className="text-white animate-pulse" size={24} />
            </div>
            <p className="text-sm font-medium text-gray-600">100% Naturel</p>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
              <Check className="text-white animate-pulse" size={24} />
            </div>
            <p className="text-sm font-medium text-gray-600">Testé Dermato</p>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
              <Heart className="text-white animate-pulse fill-current" size={24} />
            </div>
            <p className="text-sm font-medium text-gray-600">Made in Morocco</p>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Star className="text-white animate-pulse fill-current" size={24} />
            </div>
            <p className="text-sm font-medium text-gray-600">5★ Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;