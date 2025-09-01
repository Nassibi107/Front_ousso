import React, { createContext, useContext, useReducer, useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Package } from 'lucide-react';

// Color palette
const colors = {
  primary: '#025984',
  secondary: '#0a8899',
  accent: '#0fb5a0',
  light: '#e7d8c4',
  success: '#01af4c'
};

// Cart Context
const CartContext = createContext();

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
    
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
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

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
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

// Sample Products Data
const sampleProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "🎧",
    description: "High-quality wireless headphones with noise cancellation",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299.99,
    image: "⌚",
    description: "Advanced smartwatch with fitness tracking and GPS",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Coffee Mug",
    price: 19.99,
    image: "☕",
    description: "Premium ceramic coffee mug with ergonomic handle",
    category: "Home & Kitchen"
  },
  {
    id: 4,
    name: "Laptop Bag",
    price: 49.99,
    image: "💼",
    description: "Durable laptop bag with multiple compartments",
    category: "Accessories"
  }
];

// Product Card Component
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
      style={{ borderTop: `4px solid ${colors.accent}` }}
    >
      <div className="text-4xl text-center mb-4">{product.image}</div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primary }}>
        {product.name}
      </h3>
      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span 
          className="text-sm px-2 py-1 rounded"
          style={{ backgroundColor: colors.light, color: colors.primary }}
        >
          {product.category}
        </span>
        <span className="text-xl font-bold" style={{ color: colors.secondary }}>
          ${product.price}
        </span>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full py-2 px-4 rounded-md font-medium text-white transition-colors hover:opacity-90 flex items-center justify-center gap-2"
        style={{ backgroundColor: colors.accent }}
      >
        <Plus size={16} />
        Add to Cart
      </button>
    </div>
  );
};

// Cart Item Component
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-3">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.image}</span>
        <div>
          <h4 className="font-medium" style={{ color: colors.primary }}>
            {item.name}
          </h4>
          <p className="text-sm" style={{ color: colors.secondary }}>
            ${item.price} each
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1 rounded-md text-white"
            style={{ backgroundColor: colors.secondary }}
          >
            <Minus size={16} />
          </button>
          <span className="px-3 py-1 font-medium" style={{ color: colors.primary }}>
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 rounded-md text-white"
            style={{ backgroundColor: colors.accent }}
          >
            <Plus size={16} />
          </button>
        </div>
        
        <span className="font-bold min-w-16 text-right" style={{ color: colors.primary }}>
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-1 rounded-md text-white ml-2"
          style={{ backgroundColor: '#ef4444' }}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

// Cart Summary Component
const CartSummary = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center p-8">
        <Package size={48} style={{ color: colors.secondary }} className="mx-auto mb-4" />
        <p style={{ color: colors.primary }}>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-3 mb-6">
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      
      <div 
        className="p-4 rounded-lg mb-4"
        style={{ backgroundColor: colors.light }}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-semibold" style={{ color: colors.primary }}>
            Total: ${getCartTotal().toFixed(2)}
          </span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={clearCart}
            className="flex-1 py-2 px-4 rounded-md font-medium text-white"
            style={{ backgroundColor: colors.secondary }}
          >
            Clear Cart
          </button>
          <button
            className="flex-1 py-2 px-4 rounded-md font-medium text-white"
            style={{ backgroundColor: colors.success }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('products');
  const { getCartCount } = useCart();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <header 
        className="p-4 text-white shadow-lg"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Store</h1>
          <nav className="flex items-center gap-6">
            <button
              onClick={() => setCurrentPage('products')}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentPage === 'products' ? 'bg-white text-black' : 'hover:bg-white hover:bg-opacity-20'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setCurrentPage('cart')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors relative ${
                currentPage === 'cart' ? 'bg-white text-black' : 'hover:bg-white hover:bg-opacity-20'
              }`}
            >
              <ShoppingCart size={20} />
              Cart
              {getCartCount() > 0 && (
                <span 
                  className="absolute -top-2 -right-2 text-xs px-2 py-1 rounded-full text-white font-bold"
                  style={{ backgroundColor: colors.accent }}
                >
                  {getCartCount()}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {currentPage === 'products' ? (
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>
              Our Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sampleProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>
              Shopping Cart
            </h2>
            <CartSummary />
          </div>
        )}
      </main>
    </div>
  );
};

// Wrap the App with CartProvider
export default function ShoppingCartApp() {
  return (
    <CartProvider>
      <App />
    </CartProvider>
  );
}