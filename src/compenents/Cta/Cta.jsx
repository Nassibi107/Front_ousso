import React from 'react'

import { ChevronDown, Star, Shield, Leaf, Clock, 
  Users, ArrowRight, Check, Menu, X } from 'lucide-react';

function Cta({ colors }

) {
  return (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6" style={{color: colors.primary}}>
              Ready to Experience Ultimate Freshness?
            </h2>
            <p className="text-xl mb-8" style={{color: colors.secondary}}>
              Join thousands of satisfied customers who trust FreshGuard for their daily protection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="px-8 py-4 rounded-full font-semibold text-white transition-transform hover:scale-105 flex items-center justify-center" style={{backgroundColor: colors.success}}>
                Order Now <ArrowRight size={20} className="ml-2" />
              </button>
              <button className="px-8 py-4 rounded-full font-semibold border-2 transition-colors" style={{borderColor: colors.primary, color: colors.primary}}>
                Free Sample
              </button>
            </div>
            
            <div className="flex justify-center items-center space-x-8 text-sm" style={{color: colors.secondary}}>
              <div className="flex items-center">
                <Check size={16} className="mr-2" style={{color: colors.success}} />
                Free Shipping
              </div>
              <div className="flex items-center">
                <Check size={16} className="mr-2" style={{color: colors.success}} />
                30-Day Returns
              </div>
              <div className="flex items-center">
                <Check size={16} className="mr-2" style={{color: colors.success}} />
                Money Back Guarantee
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Cta