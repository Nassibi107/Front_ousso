import React, { useState } from 'react';
import { ChevronDown, Star, Shield, Leaf, Clock, Users, ArrowRight, Check, Menu, X, Instagram, MessageCircle, Mail, Phone, MapPin, Heart } from 'lucide-react';

function Footer({colors}) {
 
  const [hoveredLink, setHoveredLink] = useState(null);
  const [email, setEmail] = useState('');

  return (
    <footer className="relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`
        }}
      />
      
      {/* Floating Orbs Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-64 h-64 rounded-full opacity-10 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
            top: '-32px',
            left: '10%',
            animationDelay: '0s',
            animationDuration: '6s'
          }}
        />
        <div 
          className="absolute w-48 h-48 rounded-full opacity-10 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${colors.light} 0%, transparent 70%)`,
            bottom: '20%',
            right: '15%',
            animationDelay: '2s',
            animationDuration: '8s'
          }}
        />
        <div 
          className="absolute w-32 h-32 rounded-full opacity-10 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${colors.success} 0%, transparent 70%)`,
            top: '40%',
            left: '70%',
            animationDelay: '4s',
            animationDuration: '5s'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Newsletter Section */}
         

          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-12 text-white mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-white bg-clip-text">
                OussBody
              </h3>
              <p className="text-lg opacity-90 mb-8 leading-relaxed">
               Protection déodorante révolutionnaire avec des ingrédients 100 % naturels, conçue pour les modes de vie modernes et les consommateurs conscients qui exigent l'excellence.
              </p>
              
              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Leaf, text: "100% Natural" },
                  { icon: Shield, text: "24h Protection" },
                  { icon: Star, text: "Premium Quality" },
                  { icon: Clock, text: "Long Lasting" }
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-opacity-10 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-20">
                    <feature.icon className="w-5 h-5" style={{ color: colors.accent }} />
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Products */}
            <div>
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colors.accent }} />
                Products
              </h4>
              <ul className="space-y-4">
                {[
                  "Déodorant Naturel Femme",
                  "Naturel Classic (Femme + unisexe)",
                  "Déodorant Naturel unisexe"
                ].map((product, i) => (
                  <li key={i}>
                    <a 
                      href="#products"
                      className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-all duration-300 group"
                      onMouseEnter={() => setHoveredLink(`product-${i}`)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <div 
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          backgroundColor: hoveredLink === `product-${i}` ? colors.accent : 'rgba(255,255,255,0.5)' 
                        }}
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{product}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colors.success }} />
                Support
              </h4>
              <ul className="space-y-4">
                {[
                  { text: "FAQ", link: "#faq", icon: null },
                  { text: "Informations sur le produit", link: "#benefits", icon: null },
                  { text: "Contactez-nous", link: "http://localhost:5173/contact", icon: Mail }
                ].map((item, i) => (
                  <li key={i}>
                    <a 
                      href={item.link}
                      className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-all duration-300 group"
                      onMouseEnter={() => setHoveredLink(`support-${i}`)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <div 
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          backgroundColor: hoveredLink === `support-${i}` ? colors.success : 'rgba(255,255,255,0.5)' 
                        }}
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item.text}</span>
                      {item.icon && <item.icon className="w-4 h-4 opacity-50" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Connect */}
            <div>
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colors.light }} />
                Connect
              </h4>
              
              {/* Social Links */}
              <div className="space-y-4 mb-8">
                {[
                  { text: "Instagram", icon: Instagram, color: colors.accent },
                  { text: "WhatsApp", icon: MessageCircle, color: colors.success }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-lg  bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300 group"
                  >
                    <social.icon className="w-5 h-5" style={{ color: social.color }} />
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-300 ">{social.text}</span>
                  </a>
                ))}
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3 opacity-80">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4" style={{ color: colors.accent }} />
                  <span className="text-sm">+212 XXX XXX XXX</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" style={{ color: colors.accent }} />
                  <span className="text-sm">hello@oussbody.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" style={{ color: colors.accent }} />
                  <span className="text-sm">Casablanca, Morocco</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div 
            className="border-t border-opacity-20 pt-8"
            style={{ borderColor: colors.light }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6 text-white opacity-80">
                <p>&copy; 2025 OussBody. All rights reserved.</p>
                <span className="hidden md:block w-1 h-1 rounded-full bg-white opacity-40" />
                <p>Made with ❤️ in Morocco</p>
              </div>
              
              <div className="flex items-center gap-6">
                {["Privacy Policy", "Terms of Service", "Cookies"].map((link, i) => (
                  <a 
                    key={i}
                    href="#"
                    className="text-white opacity-80 hover:opacity-100 text-sm transition-opacity duration-300"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;