import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Check, Star, Sparkles, ArrowRight, Heart, Leaf, 
  ShoppingCart, Plus, Minus, X, Eye, Package,
  MapPin, Phone, User, CreditCard
} from 'lucide-react';

import women from "../../assets/man.png"
import man from "../../assets/women.png"
import manWomen from "../../assets/w+m.png"

const productImages = {
  women,
  man,
  manWomen
};

const productGalleryImages = {
  women: [
    women,
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop'
  ],
  man: [
      man,
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop'
  ],
  manWomen:  [
    manWomen,
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
  ]
};


const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(' DH', ''));
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getCartCount,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Product Detail Modal
const ProductDetailModal = ({ product, isOpen, onClose, colors }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const images = productGalleryImages[product.imageKey] || [product.image];

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Images Gallery */}
            <div>
              <div className="mb-4">
                <img 
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded-lg overflow-hidden transition-all ${
                      selectedImage === index 
                        ? 'border-teal-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                  <span className="text-4xl font-bold" style={{color: colors.primary}}>
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      PROMO
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Caractéristiques</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center mr-3"
                        style={{backgroundColor: colors.success}}
                      >
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Description</h3>
                <p className="text-gray-600 leading-relaxed">

                  {
                    product.id == 2? `Découvrez le pack Ousso Body, 
                    le duo naturel qui garde toute la famille fraîche et protégée toute 
                    la journée. Le déodorant unisexe, aux senteurs de bergamote, violette, fleur d’oranger et vanille, accompagne chacun de vos moments, au travail, au sport ou après la douche. Le déodorant féminin, aux notes de vanille, pamplemousse et 
                    fleurs, garde la peau douce et fraîche en toute occasion. 0% alcool, 0% aluminium – 
                    le choix sain pour tous.`  : product.id == 3 ? `Le nouveau déodorant unisexe Ousso Body t’accompagne partout ,au travail, au sport ou après la douche. Avec ses senteurs naturelles de bergamote, violette, 
                    fleur d’oranger et vanille, il garde ta peau fraîche et propre toute la journée. 0% alcool, 0% aluminium.` 
                    : `Le déodorant féminin Ousso Body est ton allié de chaque jour : au travail, pendant tes sorties ou après la douche. Avec ses senteurs naturelles de vanille,
                     pamplemousse et fleurs, il garde ta peau douce et fraîche toute la journée. 0% alcool, 0% aluminium.`
                  }
      
                </p>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                style={{backgroundColor: colors.primary}}
              >
                <ShoppingCart size={20} />
                Ajouter au Panier
                <ArrowRight size={20} />
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Leaf size={16} style={{color: colors.success}} />
                  100% Naturel
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={16} style={{color: colors.success}} />
                  Testé Dermato
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Heart size={16} className="text-red-500" />
                  Made in Morocco
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star size={16} className="text-yellow-500" />
                  5★ Clients
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Modal
const CartModal = ({ isOpen, onClose, colors }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  if (showCheckout) {
    return <CheckoutModal onClose={onClose} colors={colors} onBack={() => setShowCheckout(false)} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Votre Panier</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={64} className="mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-500 mb-4">Votre panier est vide</p>
              <button 
                onClick={onClose}
                className="px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
                style={{backgroundColor: colors.primary}}
              >
                Continuer vos achats
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                        style={{backgroundColor: colors.accent}}
                      >
                        <Plus size={16} className="text-white" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-semibold">Total:</span>
                  <span className="text-2xl font-bold" style={{color: colors.primary}}>
                    {getTotalPrice().toFixed(2)} DH
                  </span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
                  style={{backgroundColor: colors.primary}}
                >
                  Passer la Commande
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Checkout Modal
const CheckoutModal = ({ onClose, colors, onBack }) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    ville: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the order to your backend
      const orderData = {
        customer: formData,
        items: cartItems,
        total: getTotalPrice(),
        timestamp: new Date().toISOString()
      };
      
      console.log('Order submitted:', orderData);
      
      // Clear the cart only after successful order submission
      clearCart();
      
      alert('✅ Commande passée avec succès! Nous vous contacterons dans les plus brefs délais pour confirmer votre commande.');
      onClose();
    } catch (error) {
      alert('❌ Erreur lors de la commande. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowRight size={20} className="rotate-180" />
              </button>
              <h2 className="text-3xl font-bold text-gray-800">Finaliser la Commande</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Résumé de la Commande</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{item.name}</span>
                          <span className="font-semibold">
                            {(parseFloat(item.price.replace(' DH', '')) * item.quantity).toFixed(2)} DH
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">Quantité: {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span style={{color: colors.primary}}>{getTotalPrice().toFixed(2)} DH</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Livraison gratuite incluse
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span>Paiement à la livraison</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Package size={16} className="text-blue-600" />
                  </div>
                  <span>Livraison sous 24-48h</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Heart size={16} className="text-purple-600" />
                  </div>
                  <span>Garantie satisfaction 100%</span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Informations de Livraison</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User size={16} className="inline mr-1" />
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all disabled:bg-gray-100"
                      style={{'--tw-ring-color': colors.accent}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User size={16} className="inline mr-1" />
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all disabled:bg-gray-100"
                      style={{'--tw-ring-color': colors.accent}}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} className="inline mr-1" />
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    placeholder="+212 6XX XXX XXX"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all disabled:bg-gray-100"
                    style={{'--tw-ring-color': colors.accent}}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} className="inline mr-1" />
                    Ville *
                  </label>
                  <select
                    name="ville"
                    value={formData.ville}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all disabled:bg-gray-100"
                    style={{'--tw-ring-color': colors.accent}}
                  >
                    <option value="">Sélectionnez votre ville</option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Fès">Fès</option>
                    <option value="Tanger">Tanger</option>
                    <option value="Agadir">Agadir</option>
                    <option value="Meknès">Meknès</option>
                    <option value="Oujda">Oujda</option>
                    <option value="Kenitra">Kenitra</option>
                    <option value="Tétouan">Tétouan</option>
                    <option value="Autre">Autre ville</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} className="inline mr-1" />
                    Adresse Complète *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    rows={3}
                    placeholder="Rue, quartier, points de repère..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all disabled:bg-gray-100"
                    style={{'--tw-ring-color': colors.accent}}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                  }`}
                  style={{backgroundColor: colors.success}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      Confirmer la Commande
                      <Package size={20} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 text-xs text-gray-500 text-center">
                En passant votre commande, vous acceptez nos conditions de vente
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Product = ({ colors = {} }) => {
  const defaultColors = {
    primary: '#025984',
    secondary: '#0a8899',
    accent: '#0fb5a0',
    light: '#e7d8c4',
    success: '#01af4c'
  };
  
  const finalColors = { ...defaultColors, ...colors };
  const { addToCart, isCartOpen, setIsCartOpen, getCartCount } = useCart();

  const [visibleCards, setVisibleCards] = useState(new Set());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

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
      id: 1,
      name: 'Déodorant Naturel Femme',
      price: '149 DH',
      originalPrice: '170 DH',
      features: ['Essentiel Beauté', 'SPF Protection', 'Pour Femme', 'Formule Délicate'],
      image: productImages.women,
      imageKey: 'women',
      bgColor: 'from-purple-50 to-violet-50'
    },
    {
      id: 2,
      name: 'Déodorant Naturel Classic',
      price: '199 DH',
      features: ['Routine Quotidien', 'SPF Protection', 'Efficace 48 heures', 'Ralentit la repousse'],
      popular: true,
      image: productImages.manWomen,
      imageKey: 'manWomen',
      bgColor: 'from-orange-100 to-red-100'
    },
    {
      id: 3,
      name: 'Déodorant Naturel unisexe',
      price: '149 DH',
      originalPrice: '170 DH',
      features: ['Formule Unisexe', 'Extra Forte', 'Parfum Frais', 'Longue Durée'],
      bgColor: 'from-green-50 to-emerald-50',
      image: productImages.man,
      imageKey: 'man',
    }
  ];

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  return (
    <>
      {/* Cart Button */}
      <div className="fixed top-4 right-4 z-40">
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-4 rounded-full shadow-lg text-white transition-all duration-300 hover:scale-110"
          style={{backgroundColor: finalColors.primary}}
        >
          <ShoppingCart size={24} />
          {getCartCount() > 0 && (
            <span 
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
              style={{backgroundColor: finalColors.success}}
            >
              {getCartCount()}
            </span>
          )}
        </button>
      </div>

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
                key={product.id}
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
                  <div className="absolute left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white text-sm font-bold flex items-center gap-2 animate-pulse shadow-lg z-20">
                    <Star size={16} className="fill-current animate-spin" />
                    Plus Populaire
                    <Star size={16} className="fill-current animate-spin" />
                  </div>
                )}
                
                {/* View Details Button */}
                <button 
                  onClick={() => openProductModal(product)}
                  className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20"
                >
                  <Eye size={16} style={{color: finalColors.primary}} />
                </button>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-green-500 to-emerald-500 opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                
                <div className="relative z-10 p-8 text-center">
                  {/* Product Image with 3D Animation */}
                  <div 
                    className="relative mb-8 group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                    onClick={() => openProductModal(product)}
                  >
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
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                    <div className="relative">
                      <p className="text-3xl font-black text-teal-600 group-hover:scale-110 transition-transform duration-300">
                        {product.price}
                      </p>
                      <div className="absolute -top-1 -right-1">
                        <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
                      </div>
                    </div>
                    {product.originalPrice && (
                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-bold animate-bounce">
                        PROMO
                      </span>
                    )}
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
                  <button 
                    onClick={() => addToCart(product)}
                    className="relative w-full py-4 rounded-xl font-bold text-white overflow-hidden group transition-all duration-300 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 hover:scale-105 hover:shadow-xl"
                  >
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

      {/* Modals */}
      <ProductDetailModal 
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        colors={finalColors}
      />
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        colors={finalColors}
      />
    </>
  );
};

const App = () => {
  const colors = {
    primary: '#025984',
    secondary: '#0a8899',
    accent: '#0fb5a0',
    light: '#e7d8c4',
    success: '#01af4c'
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 m-4">
        <Product colors={colors} />
      </div>
    </CartProvider>
  );
};

export default App;