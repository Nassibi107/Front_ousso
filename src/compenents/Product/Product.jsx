import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Check, Star, Sparkles, ArrowRight, Heart, Leaf, 
  ShoppingCart, Plus, Minus, X, Eye, Package,
  MapPin, Phone, User, CreditCard
} from 'lucide-react';

import {CREATE_ORDER} from '../../../graphQL/queriers';
import { useMutation } from '@apollo/client/react';
// Configuration
const SERVER_URL = 'http://localhost:4000';
const GRAPHQL_ENDPOINT = `${SERVER_URL}/graphql`;

// GraphQL Queries
const GET_PRODUCTS_QUERY = `
  query GetProducts {
    get_Products {
        product_id
    name
    price
    Orginal_price
    features
    image
    bgColor
    popular
    description
    createdAt
    updatedAt
    hidden
    }
  }
`;


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
      return total + item.price * item.quantity;
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

const ProductDetailModal = ({ product, isOpen, onClose, colors }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const images = product.image || [];

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <img 
                  src={`${SERVER_URL}${images[selectedImage]}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
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
                      src={`${SERVER_URL}${img}`}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover aspect-square"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                {product.Original_price && (
                  <span className="text-xl text-gray-500 line-through">
                    {product.Original_price} DH
                  </span>
                )}
                <span className="text-4xl font-bold text-teal-600">
                  {product.priceDisplay}
                </span>
                {product.Original_price && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    PROMO
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3">Caractéristiques</h3>
                <ul className="space-y-2">
                  {product?.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check size={16} className="text-teal-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 bg-gradient-to-r from-teal-600 to-green-600"
              >
                Ajouter au Panier
              </button>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <Leaf className="mx-auto mb-1 text-green-500" size={24} />
                  <p className="text-xs font-medium">100% Naturel</p>
                </div>
                <div className="text-center">
                  <Check className="mx-auto mb-1 text-blue-500" size={24} />
                  <p className="text-xs font-medium">Testé Dermato</p>
                </div>
                <div className="text-center">
                  <Heart className="mx-auto mb-1 text-red-500" size={24} />
                  <p className="text-xs font-medium">Made in Morocco</p>
                </div>
                <div className="text-center">
                  <Star className="mx-auto mb-1 text-yellow-500" size={24} />
                  <p className="text-xs font-medium">5★ Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
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
              <ShoppingCart size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-4">Votre panier est vide</p>
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
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <img 
                      src={`${SERVER_URL}${item.image[0]}`}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <p className="text-teal-600 font-bold">{item.priceDisplay}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                          style={{backgroundColor: colors.accent}}
                        >
                          <Plus size={16} className="text-white" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold mb-4">
                  <span>Total:</span>
                  <span className="text-teal-600">{getTotalPrice().toFixed(2)} DH</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
                  style={{backgroundColor: colors.success}}
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

const CheckoutModal = ({ onClose, colors, onBack }) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [createOrder] = useMutation(CREATE_ORDER);
  const [formData, setFormData] = useState({
    address: "",
    city: "khouribga",
    first_name: "",
    last_name: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.first_name || !formData.last_name || !formData.phone || !formData.address) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    setIsSubmitting(true);

    try {
      const cartItemsMap = cartItems.map(item => ({ 
        id:parseInt( item.id), 
        quantity: item.quantity 
      }));

    await createOrder({variables: { customerInput: { ...formData ,total: getTotalPrice() }, items: cartItemsMap }});

      clearCart();
      alert('✅ Commande passée avec succès! Nous vous contacterons dans les plus brefs délais pour confirmer votre commande.');
      onClose();
    } catch (error) {
      console.error('Error submitting order:', error);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowRight size={24} className="rotate-180" />
            </button>
            <h2 className="text-3xl font-bold text-gray-800">Finaliser la Commande</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Résumé de la Commande</h3>
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-teal-600 text-sm">{item.priceDisplay}</p>
                      <p className="text-xs text-gray-500">Quantité: {item.quantity}</p>
                    </div>
                    <p className="font-bold">{(item.price * item.quantity).toFixed(2)} DH</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold mb-2">
                  <span>Total:</span>
                  <span className="text-teal-600">
                    {getTotalPrice() > 400 
                      ? getTotalPrice().toFixed(2) 
                      : (getTotalPrice() + 35).toFixed(2)
                    } DH
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {getTotalPrice() > 400 
                    ? 'Félicitations! Vous bénéficiez de la livraison gratuite.' 
                    : 'Frais de livraison : +35 DH. Livraison gratuite à partir de 400 DH d\'achat.'
                  }
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <CreditCard className="mx-auto mb-2 text-green-500" size={24} />
                  <p className="text-xs font-medium">Paiement à la livraison</p>
                </div>
                <div className="text-center">
                  <Package className="mx-auto mb-2 text-blue-500" size={24} />
                  <p className="text-xs font-medium">Livraison sous 24-48h</p>
                </div>
                <div className="text-center">
                  <Check className="mx-auto mb-2 text-teal-500" size={24} />
                  <p className="text-xs font-medium">Garantie satisfaction 100%</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Informations de Livraison</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom *</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Prénom *</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Téléphone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ville *</label>
                 <textarea
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Adresse Complète *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <button 
                  onClick={handleSubmit}
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
              </div>
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

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const finalColors = { ...defaultColors, ...colors };
  const { addToCart, isCartOpen, setIsCartOpen, getCartCount } = useCart();
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: GET_PRODUCTS_QUERY
          })
        });

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        const productsData = result.data.get_Products.filter(product => (product.hidden)).map(product => ({
          id: product.product_id,
          name: product.name,
          price: product.price,
          priceDisplay: `${product.price} DH`,
          Original_price: product.Orginal_price ? `${product.Orginal_price} DH` : null,
          features: product.features || [],
          image: product.image || [],
          bgColor: product.bgColor || 'from-gray-50 to-gray-100',
          description: product.description || '',
          popular: product.popular || false
        }));

        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
  }, [products]);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  return (
    <>
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

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
            <div className="absolute top-40 right-20 w-48 h-48 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {loading ? (
              <div className="col-span-3 text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Chargement des produits...</p>
              </div>
            ) : error ? (
              <div className="col-span-3 text-center py-12">
                <p className="text-red-600">Erreur: {error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-600">Aucun produit disponible</p>
              </div>
            ) : (
              products.map((product, index) => (
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
                  {product.popular != false ? (
                    <div className="absolute left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white text-sm font-bold flex items-center gap-2 animate-pulse shadow-lg z-20">
                     
                      <Star size={16} className="fill-current animate-spin" />
                      Plus Populaires
                      <Star size={16} className="fill-current animate-spin" />
                    </div>
                  ) : null}

                  <button 
                    onClick={() => openProductModal(product)}
                    className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20"
                  >
                    <Eye size={16} style={{color: finalColors.primary}} />
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-green-500 to-emerald-500 opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                  
                  <div className="relative z-10 p-8 text-center" onClick={() => openProductModal(product)}>
                    <div className="relative mb-8 group-hover:scale-110 transition-transform duration-500 cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-green-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-spin" style={{animationDuration: '4s'}}></div>
                      <div className="relative w-40 h-40 mx-auto">
                        <img 
                          src={`${SERVER_URL}${product.image[0]}`}
                          alt={product.name}
                          className="w-full h-full rounded-2xl object-cover shadow-xl group-hover:shadow-2xl transition-all duration-500 border-4 border-white"
                        />
                        <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                          <Leaf size={20} className="text-white" />
                        </div>
                        <div className="absolute -bottom-2 -left-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-xs font-bold animate-pulse">
                          0% Aluminium
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                      {product.name}
                    </h3>

                    <div className="mb-6 flex items-center justify-center gap-3">
                      {product.Original_price && (
                        <span className="text-sm text-gray-500 line-through">{product.Original_price}</span>
                      )}
                      <div className="relative">
                        <p className="text-3xl font-black text-teal-600 group-hover:scale-110 transition-transform duration-300">
                          {product.priceDisplay}
                        </p>
                        <div className="absolute -top-1 -right-1">
                          <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
                        </div>
                      </div>
                      {product.Original_price && (
                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-bold animate-bounce">
                          PROMO
                        </span>
                      )}
                    </div>

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

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="relative w-full py-4 rounded-xl font-bold text-white overflow-hidden group transition-all duration-300 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 hover:scale-105 hover:shadow-xl"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Ajouter au Panier
                        <div className="w-6 h-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                          <ArrowRight size={16} />
                        </div>
                      </span>
                      <div className="absolute inset-0 -skew-x-12 transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-center mt-16">
            <div className="flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-teal-100 to-green-100 rounded-full shadow-lg animate-bounce border border-teal-200">
              <Sparkles className="text-teal-500 animate-spin" />
              <span className="font-bold text-gray-700">Livraison gratuite à partir de 400 DH!</span>
              <Sparkles className="text-green-500 animate-spin" style={{animationDirection: 'reverse'}} />
            </div>
          </div>

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