import  { useState, useEffect } from 'react';
import { ChevronDown, Star, Shield, Leaf, Clock, 
  Users, ArrowRight, Check, Menu, X } from 'lucide-react';
import { Footer , Header , Hero , Product , Stats , Testimonials , Cta, Benefits, Features , Gallery } from './compenents';



const App = () => {

  const colors = {
    primary: '#025984',
    secondary: '#0a8899',
    accent: '#0fb5a0',
    light: '#e7d8c4',
    success: '#01af4c'
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header colors={colors} />

      {/* Hero Section */}
      <Hero colors={colors} />

      {/* Features Section */}
      <Features colors={colors} />
      {/* Gallery Section */}
      <Gallery colors={colors} />

      {/* Product Showcase */}
      <Product colors={colors} />


      {/* Testimonials */}
      <Testimonials colors={colors} />

      {/* Stats Section */}
      <Stats colors={colors} />

      {/* Benefits Section */}
      <Benefits colors={colors} />
    

      {/* CTA Section */}
      <Cta colors={colors} />

      {/* Footer */}
      <Footer colors={colors} />
    </div>
  );
};

export default App;