import React from 'react'

import { ChevronDown, Star, Shield, Leaf, Clock, 
  Users, ArrowRight, Check, Menu, X } from 'lucide-react';

  function Stats({ colors }) {
  return (
       <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                {[
                  { number: '50K+', label: 'Happy Customers' },
                  { number: '48hr', label: 'Protection' },
                  { number: '100%', label: 'Natural' },
                  { number: '4.9★', label: 'Rating' }
                ].map((stat, index) => (
                  <div key={index} className="p-6">
                    <div className="text-4xl font-bold mb-2" style={{color: colors.accent}}>{stat.number}</div>
                    <div className="text-lg" style={{color: colors.secondary}}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
  )
}

export default Stats