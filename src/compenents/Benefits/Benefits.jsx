import React from 'react';
import { ChevronDown, Star, Shield, Leaf, Clock, Users, ArrowRight, Check, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import hero from '../../assets/hero.jpg';

function Benefits({ colors }) {
  return (
    <section className="py-20" style={{ backgroundColor: colors.light }}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* === Left Side: Benefits Text === */}
          <div>
            <h2 className="text-4xl font-bold mb-8" style={{ color: colors.primary }}>
              La science rencontre la nature
            </h2>

            <div className="space-y-6">
              {[
                {
                  icon: Shield,
                  title: 'Protection Avancée',
                  desc: 'Formule cliniquement prouvée bloque les odeurs pendant 48 heures',
                },
                {
                  icon: Leaf,
                  title: 'Ingrédients Naturels',
                  desc: 'Botaniques organiques et huiles essentielles nourrissent votre peau',
                },
                {
                  icon: Users,
                  title: 'Pour Tous',
                  desc: 'Convient à tous les types de peau, y compris les peaux sensibles',
                },
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  {/* Icon Container */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <benefit.icon size={24} className="text-white" />
                  </div>

                  {/* Benefit Text */}
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>
                      {benefit.title}
                    </h3>
                    <p style={{ color: colors.secondary }}>{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* === Right Side: Animated Product Card === */}
          <div className="relative">
            <motion.div
              className="relative w-[450px] h-[450px] rounded-3xl shadow-2xl p-4"
              style={{
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`,
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                rotateX: 10,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
            >
              {/* === Inner Image Card === */}
              <motion.div
                className="w-full h-full rounded-2xl overflow-hidden flex items-center justify-center"
                style={{
                  backgroundColor: colors.primary,
                  boxShadow: 'inset 0 0 20px rgba(255,255,255,0.3)',
                }}
                whileHover={{
                  scale: 1.03,
                  rotateY: -5,
                  rotateX: -5,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <motion.img
                  src={hero}
                  alt="Hero Product"
                  className="w-full h-full object-cover rounded-2xl"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>

              {/* === Floating Badge === */}
              <motion.div
                className="absolute top-5 right-5 px-4 py-2 rounded-full shadow-lg text-white font-semibold text-sm"
                style={{ backgroundColor: colors.success }}
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                New ✨
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Benefits;
