import React from 'react'

import { ChevronDown, Star, Shield, Leaf, Clock, 
  Users, ArrowRight, Check, Menu, X } from 'lucide-react';
function Features({ colors }) {
  return (
      <section id="features" className="py-20" style={{backgroundColor: colors.light}}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{color: colors.primary}}>
              Why Choose FreshGuard?
            </h2>
            <p className="text-xl opacity-80" style={{color: colors.secondary}}>
              Advanced protection meets natural care
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{backgroundColor: colors.accent}}>
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{color: colors.primary}}>48-Hour Protection</h3>
              <p style={{color: colors.secondary}}>Advanced formula provides unmatched protection that lasts up to 48 hours, even through intense workouts.</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{backgroundColor: colors.success}}>
                <Leaf size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{color: colors.primary}}>Natural Ingredients</h3>
              <p style={{color: colors.secondary}}>Made with organic botanicals and essential oils, free from harsh chemicals and aluminum.</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{backgroundColor: colors.secondary}}>
                <Clock size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{color: colors.primary}}>Quick Dry Formula</h3>
              <p style={{color: colors.secondary}}>Goes on smooth and dries instantly, leaving no white marks or sticky residue on your clothes.</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Features