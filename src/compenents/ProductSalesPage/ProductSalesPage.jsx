import React, { createContext, useContext, useReducer, useState } from 'react';

// Cart Context
const CartContext = createContext();

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find(item => 
        item.id === action.payload.id && 
        item.size === action.payload.size && 
        item.color === action.payload.color
      );
      
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }
      return [...state, action.payload];
    
    case 'REMOVE_FROM_CART':
      return state.filter((item, index) => index !== action.payload);
    
    case 'UPDATE_QUANTITY':
      return state.map((item, index) =>
        index === action.payload.index
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
    
    case 'CLEAR_CART':
      return [];
    
    default:
      return state;
  }
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (index) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: index });
  };

  const updateQuantity = (index, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
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
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Updated ProductSalesPage with Cart Integration
const ProductSalesPage = ({ colors }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [showReviews, setShowReviews] = useState(false);
  const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    images: []
  });

  // Use cart context
  const { addToCart, cartItems, getCartCount, getCartTotal, removeFromCart, updateQuantity } = useCart();

  const defaultColors = {
    primary: '#025984',
    secondary: '#0a8899',
    accent: '#0fb5a0',
    light: '#e7d8c4',
    success: '#01af4c'
  };

  const themeColors = colors || defaultColors;

  const product = {
    id: 1,
    name: "Premium Collection Sneakers",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviewCount: 234,
    description: "Experience ultimate comfort and style with our Premium Collection Sneakers. Crafted with premium materials and innovative design, these shoes are perfect for both casual wear and athletic activities.",
    features: [
      "Premium leather and mesh construction",
      "Advanced cushioning technology",
      "Breathable and moisture-wicking interior",
      "Durable rubber outsole with superior grip",
      "Available in multiple colors and sizes"
    ],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'blue', hex: '#3B82F6', label: 'Ocean Blue' },
      { name: 'red', hex: '#EF4444', label: 'Crimson Red' },
      { name: 'black', hex: '#1F2937', label: 'Midnight Black' },
      { name: 'white', hex: '#F9FAFB', label: 'Pure White' }
    ]
  };

  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b2bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        verified: true
      },
      rating: 5,
      title: "Amazing quality and comfort!",
      comment: "These sneakers exceeded my expectations. The comfort level is incredible and they look great with any outfit. Highly recommended!",
      date: "2025-01-15",
      images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"],
      helpful: 23
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        verified: true
      },
      rating: 4,
      title: "Great for daily wear",
      comment: "Perfect for my daily walks and gym sessions. The grip is excellent and they're very durable. Only minor issue is they run slightly small.",
      date: "2025-01-10",
      images: [],
      helpful: 15
    }
  ];

  // Handle Add to Cart
  const handleAddToCart = () => {
    const selectedColorObj = product.colors.find(c => c.name === selectedColor);
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      colorLabel: selectedColorObj?.label || selectedColor,
      quantity: quantity
    };
    
    addToCart(cartItem);
    
    // Show success message or modal
    alert(`Added ${quantity} item(s) to cart!`);
  };

  // Simulate Google Sign-In
  const handleGoogleSignIn = () => {
    setIsGoogleSignedIn(true);
    setUserProfile({
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    });
  };

  const handleSubmitReview = () => {
    if (!isGoogleSignedIn) {
      alert("Please sign in with Google to submit a review");
      return;
    }
    
    if (!newReview.title || !newReview.comment) {
      alert("Please fill in all required fields");
      return;
    }

    alert("Review submitted successfully! Thank you for your feedback.");
    
    setNewReview({
      rating: 5,
      title: '',
      comment: '',
      images: []
    });
  };

  const renderStars = (rating, interactive = false, onRate = null) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${interactive ? 'cursor-pointer' : ''} ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        onClick={() => interactive && onRate && onRate(index + 1)}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Cart Modal Component
  const CartModal = () => {
    if (!showCartModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold" style={{ color: themeColors.primary }}>
              Shopping Cart ({getCartCount()})
            </h3>
            <button 
              onClick={() => setShowCartModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          {cartItems.length === 0 ? (
            <p className="text-center py-4 text-gray-500">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-3 mb-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">
                          Size: {item.size}, Color: {item.colorLabel}
                        </p>
                        <p className="font-bold" style={{ color: themeColors.accent }}>
                          DH{item.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        className="w-6 h-6 rounded text-white text-sm"
                        style={{ backgroundColor: themeColors.secondary }}
                      >
                        -
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className="w-6 h-6 rounded text-white text-sm"
                        style={{ backgroundColor: themeColors.accent }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="w-6 h-6 rounded bg-red-500 text-white text-sm ml-2"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg" style={{ color: themeColors.primary }}>
                    Total: DH{getCartTotal().toFixed(2)}
                  </span>
                </div>
                <button
                  className="w-full py-2 text-white font-semibold rounded-lg"
                  style={{ backgroundColor: themeColors.success }}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 35%, ${themeColors.accent} 100%)`
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 2px), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2px, transparent 2px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Cart Icon */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => setShowCartModal(true)}
          className="relative p-3 rounded-full text-white shadow-lg"
          style={{ backgroundColor: themeColors.accent }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M7 13h10m0 0v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m10 0V9a1 1 0 00-1-1H8a1 1 0 00-1-1V7" />
          </svg>
          {getCartCount() > 0 && (
            <span 
              className="absolute -top-2 -right-2 text-xs px-2 py-1 rounded-full text-white font-bold"
              style={{ backgroundColor: themeColors.primary }}
            >
              {getCartCount()}
            </span>
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Product Section */}
        <div 
          className="bg-white rounded-2xl shadow-2xl p-8 mb-8 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-2' : 'border-gray-200'
                    }`}
                    style={{ borderColor: selectedImage === index ? themeColors.accent : undefined }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold mb-4" style={{ color: themeColors.primary }}>
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {renderStars(Math.floor(product.rating))}
                  <span className="ml-2 text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold" style={{ color: themeColors.accent }}>
                  DH{product.price}
                </span>
                <span className="text-xl text-gray-500 line-through ml-3">
                  DH{product.originalPrice}
                </span>
                <span 
                  className="ml-3 px-3 py-1 rounded-full text-white text-sm font-semibold"
                  style={{ backgroundColor: themeColors.success }}
                >
                  Save DH{(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3" style={{ color: themeColors.primary }}>
                  Color: {product.colors.find(c => c.name === selectedColor)?.label}
                </h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name ? 'border-4' : 'border-gray-300'
                      }`}
                      style={{ 
                        backgroundColor: color.hex,
                        borderColor: selectedColor === color.name ? themeColors.accent : undefined
                      }}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3" style={{ color: themeColors.primary }}>
                  Size: {selectedSize}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border border-gray-300 rounded-lg transition-all ${
                        selectedSize === size ? 'text-white' : 'text-gray-700 hover:border-gray-400'
                      }`}
                      style={{ 
                        backgroundColor: selectedSize === size ? themeColors.accent : 'transparent',
                        borderColor: selectedSize === size ? themeColors.accent : undefined
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3" style={{ color: themeColors.primary }}>
                  Quantity
                </h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 text-white font-semibold text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 mb-4"
                style={{ backgroundColor: themeColors.accent }}
                onMouseEnter={(e) => e.target.style.backgroundColor = themeColors.secondary}
                onMouseLeave={(e) => e.target.style.backgroundColor = themeColors.accent}
              >
                Add to Cart - DH{(product.price * quantity).toFixed(2)}
              </button>

              {/* Features */}
              <div>
                <h3 className="font-semibold mb-3" style={{ color: themeColors.primary }}>
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 mr-2" style={{ color: themeColors.success }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div 
          className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ color: themeColors.primary }}>
              Customer Reviews ({product.reviewCount})
            </h2>
            <button
              onClick={() => setShowReviews(!showReviews)}
              className="px-6 py-2 rounded-lg font-semibold transition-all"
              style={{ 
                backgroundColor: showReviews ? themeColors.light : themeColors.accent,
                color: showReviews ? themeColors.primary : 'white'
              }}
            >
              {showReviews ? 'Hide Reviews' : 'Show Reviews'}
            </button>
          </div>

          {showReviews && (
            <>
              {/* Write Review Section */}
              <div className="border-b pb-8 mb-8">
                <h3 className="text-xl font-semibold mb-4" style={{ color: themeColors.primary }}>
                  Write a Review
                </h3>
                
                {!isGoogleSignedIn ? (
                  <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-4">Sign in with Google to write a review</p>
                    <button
                      onClick={handleGoogleSignIn}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold flex items-center mx-auto space-x-2 hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Sign in with Google</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center mb-4">
                      <img
                        src={userProfile.avatar}
                        alt={userProfile.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-semibold">{userProfile.name}</p>
                        <p className="text-sm text-gray-500">{userProfile.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: themeColors.primary }}>
                          Rating
                        </label>
                        <div className="flex items-center">
                          {renderStars(newReview.rating, true, (rating) => 
                            setNewReview({...newReview, rating})
                          )}
                          <span className="ml-2 text-gray-600">{newReview.rating}/5</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: themeColors.primary }}>
                          Review Title *
                        </label>
                        <input
                          type="text"
                          value={newReview.title}
                          onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-2"
                          style={{ focusBorderColor: themeColors.accent }}
                          onFocus={(e) => e.target.style.borderColor = themeColors.accent}
                          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                          placeholder="Summarize your experience"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block font-semibold mb-2" style={{ color: themeColors.primary }}>
                        Your Review *
                      </label>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-2"
                        onFocus={(e) => e.target.style.borderColor = themeColors.accent}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        placeholder="Share your thoughts about this product..."
                      />
                    </div>

                    <button
                      onClick={handleSubmitReview}
                      className="mt-4 px-6 py-3 text-white font-semibold rounded-lg transition-all hover:shadow-lg"
                      style={{ backgroundColor: themeColors.accent }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = themeColors.secondary}
                      onMouseLeave={(e) => e.target.style.backgroundColor = themeColors.accent}
                    >
                      Submit Review
                    </button>
                  </div>
                )}
              </div>

              {/* Existing Reviews */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.user.avatar}
                        alt={review.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="font-semibold mr-2">{review.user.name}</h4>
                          {review.user.verified && (
                            <span 
                              className="text-xs px-2 py-1 rounded-full text-white"
                              style={{ backgroundColor: themeColors.success }}
                            >
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center mb-2">
                          {renderStars(review.rating)}
                          <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                        </div>
                        
                        <h5 className="font-semibold mb-2" style={{ color: themeColors.primary }}>
                          {review.title}
                        </h5>
                        
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        
                        {review.images.length > 0 && (
                          <div className="flex space-x-2 mb-3">
                            {review.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Review image ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <button className="flex items-center space-x-1 hover:text-gray-700">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V9a2 2 0 00-2-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2h2m7-10l3.5 7" />
                            </svg>
                            <span>Helpful ({review.helpful})</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Cart Modal */}
      <CartModal />
    </div>
  );
};

// Main App Component with CartProvider
export default function App() {
  return (
    <CartProvider>
      <ProductSalesPage />
    </CartProvider>
  );
}