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
             Prêt à découvrir la fraîcheur ultime
            </h2>
            <p className="text-xl mb-8" style={{color: colors.secondary}}>
              Rejoignez des milliers de clients satisfaits qui font confiance à FreshGuard pour leur protection quotidienne
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="px-8 py-4 rounded-full font-semibold text-white transition-transform hover:scale-105 flex items-center justify-center" style={{backgroundColor: colors.success}}>
              Commandez maintenant<ArrowRight size={20} className="ml-2" />
              </button>
            </div>
            <div className="flex justify-center items-center space-x-8 text-sm" style={{color: colors.secondary}}>
              <div className="flex items-center">
                <Check size={16} className="mr-2" style={{color: colors.success}} />
                Retours sous 3 jours
              </div>
              <div className="flex items-center">
                <Check size={16} className="mr-2" style={{color: colors.success}} />
                Garantie de remboursement
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Cta