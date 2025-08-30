import React from 'react'


import { ChevronDown, Star, Shield, Leaf, Clock, 
  Users, ArrowRight, Check, Menu, X } from 'lucide-react';
function Benefits({ colors }) {
  return (
     <section className="py-20" style={{backgroundColor: colors.light}}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8" style={{color: colors.primary}}>
                Science Meets Nature
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Shield, title: 'Advanced Protection', desc: 'Clinically proven formula blocks odor for 48 hours' },
                  { icon: Leaf, title: 'Natural Ingredients', desc: 'Organic botanicals and essential oils nurture your skin' },
                  { icon: Users, title: 'For Everyone', desc: 'Suitable for all skin types, including sensitive skin' }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: colors.accent}}>
                      <benefit.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{color: colors.primary}}>{benefit.title}</h3>
                      <p style={{color: colors.secondary}}>{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="w-96 h-96 mx-auto rounded-2xl flex items-center justify-center" style={{backgroundColor: colors.secondary}}>
                <div className="w-48 h-80 rounded-3xl flex items-center justify-center text-4xl font-bold text-white" style={{backgroundColor: colors.primary}}>
                  FRESH
                  <br />
                  GUARD
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Benefits