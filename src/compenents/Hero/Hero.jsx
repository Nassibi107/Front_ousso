import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import FLAG11 from '../../assets/FLAG11.png';

export default function Hero({ colors }) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const fadeInDelay = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.8 } }
  };

  const imageAnim = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1 } }
  };

  return (
    <section id="home" className="pt-20 pb-16 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` }}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Text Section */}
          <motion.div
            className="text-white"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Restez frais
              <span className="block" style={{ color: colors.accent }}>Toute la journée</span>
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Protection révolutionnaire de 48 heures avec des ingrédients naturels. Découvrez la confiance d'une fraîcheur durable.
            </p>

            <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInDelay}>
              <button className="px-8 py-4 rounded-full  cursor-pointer font-semibold text-white transition-transform hover:scale-105" style={{ backgroundColor: colors.success }}>
                commander
              </button>
              <button className={`px-8 py-4 rounded-full cursor-pointer font-semibold border-2 border-white text-white hover:scale-105 transition-colors`}>
                En savoir plus
              </button>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="relative"
            initial="hidden"
            animate="visible"
            variants={imageAnim}
          >
            <div
              className="w-50 h-50 mx-auto rounded-full flex items-center justify-center transform hover:scale-105 transition-transform cursor-pointer"
              style={{ backgroundColor: colors.light }}
            >
              <img
                src={FLAG11}
                alt="Product"
                className="object-contain transition-all duration-500 ease-in-out w-200 h-200"
              />
            </div>

            <div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full animate-pulse"
              style={{ backgroundColor: colors.success }}
            ></div>
            <div
              className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full animate-bounce"
              style={{ backgroundColor: colors.accent }}
            ></div>
          </motion.div>

        </div>
      </div>

      {/* Chevron */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-white opacity-60" />
      </div>
    </section>
  );
}
