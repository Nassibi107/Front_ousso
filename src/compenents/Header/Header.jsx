import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LOGO from '../../assets/logo.png';
import { Menu, X, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';

function Header({ colors }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navigationItems = [
    { href: '#home', label: 'Home', type: 'anchor' },
    { href: '#features', label: 'Features', type: 'anchor' },
    { href: '#products', label: 'Products', type: 'anchor' },
    { to: '/testimonials', label: 'Reviews', type: 'link' },
    { to: '/contact', label: 'Contact', type: 'link' },
    { href: '#faq', label: 'FAQ', type: 'anchor' }
  ];

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full z-30 transition-all duration-700 ease-out backdrop-blur-xl shadow-2xl border-b border-opacity-30`}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderBottomColor: colors.accent
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic gradient overlay */}
      <div 
        className="absolute inset-0 w-full h-full opacity-20 transition-opacity duration-500"
        style={{
          background: "rgba(255, 255, 255, 0.1)"
        }}
      />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full transition-all duration-1000 ${
              isHovered ? 'opacity-60' : 'opacity-20'
            }`}
            style={{
              backgroundColor: colors.accent,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animation: 'float 3s ease-in-out infinite'
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px ${colors.accent}40; }
          50% { box-shadow: 0 0 20px ${colors.accent}60, 0 0 30px ${colors.accent}40; }
        }
      `}</style>
      
      <nav className="container mx-auto px-4 py-3 relative">
        <div className="flex items-center justify-evenly">
          {/* Logo Section with Enhanced Effects */}
          <div className="flex items-center space-x-3 lg:space-x-6 group">
            <div className="relative">
              {/* Rotating background ring - responsive sizing */}
              <div 
                className="absolute -inset-1 lg:-inset-2 w-20 h-18 rounded-full transition-all duration-500 group-hover:rotate-180"
                style={{ 
                  background: `conic-gradient(${colors.accent}, ${colors.secondary}, ${colors.primary}, ${colors.accent})`,
                  padding: '2px lg:3px'
                }}
              >
                <div 
                  className="w-full h-full rounded-full"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                />
              </div>
              
              {/* Multiple glow layers */}
              <div 
                className="absolute -inset-1 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500"
                style={{ backgroundColor: colors.accent }}
              />
              <div 
                className="absolute -inset-2 lg:-inset-3 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-all duration-700"
                style={{ backgroundColor: colors.secondary }}
              />
              
              {/* Logo with responsive sizing */}
              <img 
                src={LOGO} 
                alt="Logo" 
                className="relative w-22 h-17 object-contain transition-all duration-500 group-hover:scale-110 lg:group-hover:scale-125 group-hover:rotate-12 z-10" 
                style={{
                  filter: `drop-shadow(0 3px 6px ${colors.accent}50) brightness(1.1)`,
                  animation: isHovered ? 'pulse-glow 2s ease-in-out infinite' : 'none'
                }}
              />
              
              {/* Enhanced sparkle effects - responsive */}
              <Sparkles 
                className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-4 h-4 lg:w-6 lg:h-6 transition-all duration-300 group-hover:scale-125 lg:group-hover:scale-150 group-hover:rotate-45"
                style={{ color: colors.accent }}
              />
              <Sparkles 
                className="absolute -bottom-1 -left-1 w-3 h-3 lg:w-4 lg:h-4 transition-all duration-500 group-hover:scale-110 lg:group-hover:scale-125 group-hover:-rotate-45 opacity-60"
                style={{ color: colors.secondary }}
              />
            </div>
            
            {/* Brand name - hidden on mobile, visible on larger screens */}
            <div className="relative hidden md:block">
              <div 
                className="text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight transition-all duration-300 group-hover:scale-105"
                style={{ 
                  color: colors.primary,
                  textShadow: `0 2px 4px ${colors.primary}25`
                }}
              >
                OUSSO BODY
              </div>
              
              {/* Enhanced animated underline for brand name */}
              <div 
                className="absolute -bottom-1 left-0 h-0.5 lg:h-1 bg-gradient-to-r transition-all duration-500 group-hover:w-full rounded-full"
                style={{ 
                  width: isHovered ? '100%' : '0%',
                  background: `linear-gradient(90deg, ${colors.accent}, ${colors.secondary}, ${colors.primary})`
                }}
              />
              
              {/* Shimmer effect on brand name */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden"
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform -skew-x-12 group-hover:animate-shimmer"
                  style={{ animation: 'shimmer 2s ease-in-out infinite' }}
                />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              item.type === 'anchor' ? (
                <a
                  key={index}
                  href={item.href}
                  className="relative px-3 xl:px-4 py-2 font-medium text-sm xl:text-base tracking-wide transition-all duration-300 group hover:scale-105"
                  style={{ color: colors.primary }}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Hover background */}
                  <div 
                    className="absolute inset-0 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 opacity-10"
                    style={{ backgroundColor: colors.accent }}
                  />
                  
                  {/* Animated underline */}
                  <span 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-3/4 rounded-full"
                    style={{ backgroundColor: colors.accent }}
                  />
                  
                  {/* Subtle glow effect */}
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"
                    style={{ backgroundColor: colors.secondary }}
                  />
                </a>
              ) : (
                <Link
                  key={index}
                  to={item.to}
                  className="relative px-3 xl:px-4 py-2 font-medium text-sm xl:text-base tracking-wide transition-all duration-300 group hover:scale-105"
                  style={{ color: colors.primary }}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Hover background */}
                  <div 
                    className="absolute inset-0 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 opacity-10"
                    style={{ backgroundColor: colors.accent }}
                  />
                  
                  {/* Animated underline */}
                  <span 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-3/4 rounded-full"
                    style={{ backgroundColor: colors.accent }}
                  />
                  
                  {/* Subtle glow effect */}
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"
                    style={{ backgroundColor: colors.secondary }}
                  />
                </Link>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button 
              className="relative px-4 xl:px-6 py-2 xl:py-3 font-semibold text-white text-sm xl:text-base rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl group overflow-hidden"
              
            >
              <span className="relative z-10"></span>
              
              {/* Animated background */}
              <div 
                className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"
                style={{ backgroundColor: colors.secondary }}
              />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(45deg, transparent 30%, ${colors.light}40 50%, transparent 70%)`
                  }}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden relative p-2 rounded-lg transition-all duration-300 hover:scale-110"
            onClick={handleMenuClick}
            style={{ 
              color: colors.primary,
              backgroundColor: isMenuOpen ? `${colors.accent}20` : 'transparent'
            }}
          >
            <div className="relative">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              
              {/* Button glow */}
              <div 
                className="absolute inset-0 rounded-lg opacity-0 hover:opacity-30 transition-opacity duration-300 blur-sm"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div 
            className="mt-4 p-4 rounded-2xl shadow-2xl backdrop-blur-md border border-opacity-20"
            style={{ 
              backgroundColor: `${colors.light}f5`,
              borderColor: colors.accent
            }}
          >
            {/* Mobile menu items */}
            <div className="space-y-1">
              {navigationItems.map((item, index) => (
                item.type === 'anchor' ? (
                  <a
                    key={index}
                    href={item.href}
                    className="block px-3 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-md group"
                    style={{ 
                      color: colors.primary,
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = `${colors.accent}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center justify-between">
                      {item.label}
                      <ChevronDown 
                        size={14} 
                        className="transform group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </span>
                  </a>
                ) : (
                  <Link
                    key={index}
                    to={item.to}
                    className="block px-3 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-md group"
                    style={{ 
                      color: colors.primary,
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = `${colors.accent}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center justify-between">
                      {item.label}
                      <ChevronDown 
                        size={14} 
                        className="transform group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </span>
                  </Link>
                )
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-4 pt-3 border-t border-opacity-20" style={{ borderColor: colors.accent }}>
              <button 
                className="w-full py-2.5 px-4 font-semibold text-white text-sm rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group"
                style={{ backgroundColor: colors.accent }}
              >
                {/* <span className="relative z-10">Get Started</span> */}
                
                {/* Animated background */}
                <div 
                  className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300"
                  style={{ backgroundColor: colors.secondary }}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 overflow-hidden">
        <div 
          className="h-full transition-all duration-300"
          style={{
            width: scrollY > 50 ? '100%' : '0%',
            background: `linear-gradient(90deg, ${colors.accent} 0%, ${colors.secondary} 50%, ${colors.primary} 100%)`
          }}
        />
      </div>
    </header>
  );
}

export default Header;