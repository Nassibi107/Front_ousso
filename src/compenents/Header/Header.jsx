import React ,{useState , useEffect}from 'react'



import LOGO from '../../assets/logo.png';
import { ChevronDown, Star, Shield, Leaf, Clock, 
  Users, ArrowRight, Check, Menu, X } from 'lucide-react';
function Header({ colors }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
   <header className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold" style={{color: colors.primary}}>
                <img src={LOGO} alt="Logo" className="w-50 h-15" />
              </div>
              
              <div className="hidden md:flex space-x-8">
                <a href="#home" className="hover:opacity-80 transition-opacity" style={{color: colors.primary}}>Home</a>
                <a href="#features" className="hover:opacity-80 transition-opacity" style={{color: colors.primary}}>Features</a>
                <a href="#products" className="hover:opacity-80 transition-opacity" style={{color: colors.primary}}>Products</a>
                <a href="#testimonials" className="hover:opacity-80 transition-opacity" style={{color: colors.primary}}>Reviews</a>
                <a href="#contact" className="hover:opacity-80 transition-opacity" style={{color: colors.primary}}>Contact</a>
              </div>
  
              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{color: colors.primary}}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
  
            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 p-4 rounded-lg" style={{backgroundColor: colors.light}}>
                <a href="#home" className="block py-2 hover:opacity-80" style={{color: colors.primary}}>Home</a>
                <a href="#features" className="block py-2 hover:opacity-80" style={{color: colors.primary}}>Features</a>
                <a href="#products" className="block py-2 hover:opacity-80" style={{color: colors.primary}}>Products</a>
                <a href="#testimonials" className="block py-2 hover:opacity-80" style={{color: colors.primary}}>Reviews</a>
                <a href="#contact" className="block py-2 hover:opacity-80" style={{color: colors.primary}}>Contact</a>
              </div>
            )}
          </nav>
     </header>
  
  )
}

export default Header