import React, { createContext, useContext, useState } from 'react';
import { ShoppingCart, Plus, Minus, X, Package, Star, Check } from 'lucide-react';

const colors = {
  primary: '#025984',
  secondary: '#0a8899',
  accent: '#0fb5a0',
  light: '#e7d8c4',
  success: '#01af4c'
};

import women from '../../assets/women.png'
import man from '../../assets/man.png'
import manWomen from '../../assets/w+m.jpg'
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice,
      clearCart,
      isCheckoutOpen,
      setIsCheckoutOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Sample Deodorant Products Data
const sampleProducts = [
  {
    id: 1,
    name: "Fresh Ocean Breeze",
    price: 15.99,
    description: "Déodorant anti-transpirant longue durée avec parfum frais océanique. Protection 48h garantie, sans alcool, enrichi en aloe vera pour apaiser la peau.",
    images: [
      women,
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400"
    ],
    icon: "🌊",
    rating: 4.8,
    features: ["Protection 48h", "Sans Alcool", "Aloe Vera", "Parfum Océan"]
  },
  {
    id: 2,
    name: "Active Sport Pro",
    price: 18.50,
    description: "Déodorant spécialement conçu pour les sportifs. Résiste à l'effort intense, sèche rapidement et offre une fraîcheur durable même pendant l'exercice.",
    images: [
      manWomen,
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400"
    ],
    icon: "💪",
    rating: 4.9,
    features: ["Anti-Transpirant", "Séchage Rapide", "Sport Intense", "72h Protection"]
  },
  {
    id: 3,
    name: "Sensitive Care Natural",
    price: 16.75,
    description: "Déodorant naturel pour peaux sensibles, formulé sans parabènes ni aluminium. Ingrédients biologiques, hypoallergénique et testé dermatologiquement.",
    images: [
     man,
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400"
    ],
    icon: "🌿",
    rating: 4.7,
    features: ["100% Naturel", "Sans Aluminium", "Hypoallergénique", "Bio Certifié"]
  },
];

// Product Detail Modal
const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
              {product.icon} {product.name}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`border-2 rounded-lg overflow-hidden transition-all ${
                      index === currentImageIndex
                        ? 'border-2'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    style={{
                      borderColor: index === currentImageIndex ? colors.accent : undefined
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.rating})</span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="mb-6">
                <h3 className="font-semibold mb-3" style={{ color: colors.primary }}>
                  Key Features:
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check size={16} style={{ color: colors.success }} className="mr-2" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold" style={{ color: colors.primary }}>
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500">Free shipping included</span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 px-6 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.accent }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Icon Component
const CartIcon = () => {
  const { getTotalItems, setIsCheckoutOpen } = useCart();

  return (
    <button
      onClick={() => setIsCheckoutOpen(true)}
      className="fixed top-4 right-4 p-3 rounded-full text-white shadow-lg hover:opacity-90 transition-opacity z-40"
      style={{ backgroundColor: colors.accent }}
    >
      <div className="relative">
        <ShoppingCart size={24} />
        {getTotalItems() > 0 && (
          <span
            className="absolute -top-2 -right-2 text-xs font-bold text-white rounded-full w-5 h-5 flex items-center justify-center"
            style={{ backgroundColor: colors.primary }}
          >
            {getTotalItems()}
          </span>
        )}
      </div>
    </button>
  );
};

// Checkout Modal
const CheckoutModal = () => {
  const { 
    cartItems, 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    getTotalPrice, 
    updateQuantity, 
    removeFromCart,
    clearCart 
  } = useCart();

  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    ville: ''
  });

  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitOrder = () => {
    if (formData.prenom && formData.nom && formData.telephone && formData.ville) {
      setIsOrderComplete(true);
      setTimeout(() => {
        clearCart();
        setIsCheckoutOpen(false);
        setIsOrderComplete(false);
        setFormData({ prenom: '', nom: '', telephone: '', ville: '' });
      }, 3000);
    }
  };

  const closeModal = () => {
    setIsCheckoutOpen(false);
    setIsOrderComplete(false);
  };

  if (!isCheckoutOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
              <ShoppingCart className="inline mr-2" size={28} />
              Shopping Cart
            </h2>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {isOrderComplete ? (
            <div className="text-center py-8">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: colors.success }}
              >
                <Check size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: colors.success }}>
                Commande Confirmée!
              </h3>
              <p className="text-gray-600">
                Merci pour votre commande. Nous vous contacterons bientôt.
              </p>
            </div>
          ) : (
            <>
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <Package size={64} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">Votre panier est vide</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center border-b py-4">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-gray-600">${item.price}</p>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="mx-3 min-w-[2rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span style={{ color: colors.primary }}>${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                      Informations de Livraison
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Prénom *</label>
                        <input
                          type="text"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-2"
                          style={{ borderColor: colors.accent }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Nom *</label>
                        <input
                          type="text"
                          name="nom"
                          value={formData.nom}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-2"
                          style={{ borderColor: colors.accent }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Téléphone *</label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-2"
                        style={{ borderColor: colors.accent }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Ville ou Adresse *</label>
                      <input
                        type="text"
                        name="ville"
                        value={formData.ville}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-2"
                        style={{ borderColor: colors.accent }}
                      />
                    </div>

                    <button
                      onClick={handleSubmitOrder}
                      className="w-full py-3 px-6 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                      style={{ backgroundColor: colors.success }}
                      disabled={!formData.prenom || !formData.nom || !formData.telephone || !formData.ville}
                    >
                      Confirmer la Commande
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, onClick }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
    >
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 text-2xl">{product.icon}</div>
        <div className="absolute top-3 right-3 flex items-center text-yellow-400">
          <Star size={16} fill="currentColor" />
          <span className="text-white text-sm ml-1 bg-black bg-opacity-50 px-1 rounded">
            {product.rating}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg mb-2" style={{ color: colors.primary }}>
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {product.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full text-white"
              style={{ backgroundColor: colors.secondary }}
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold" style={{ color: colors.primary }}>
            ${product.price}
          </span>
          <button
            onClick={handleQuickAdd}
            className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colors.accent }}
          >
            Quick Add
          </button>
        </div>
      </div>
    </div>
  );
};

// Main ProductSalesPage Component
const ProductSalesPage = ({ colors: appColors }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <CartProvider>
      <div className="min-h-screen" style={{ backgroundColor: colors.light }}>
        <div className="py-8 px-4" style={{ backgroundColor: colors.primary }}>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-white text-center mb-2">
              Collection Déodorants Premium
            </h1>
            <p className="text-center text-gray-200">
              Découvrez notre gamme de déodorants de qualité supérieure
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </div>

        <CartIcon />
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
        <CheckoutModal />
      </div>
    </CartProvider>
  );
};

export default ProductSalesPage;