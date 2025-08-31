import React from "react";
import { motion } from "framer-motion";
import { Shield, Leaf, Clock } from "lucide-react";

function Features({ colors }) {
  // Title animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Left to right animation
  const leftToRight = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Right to left animation
  const rightToLeft = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Fade-in for center card
  const fadeIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="features"
      className="py-20"
      style={{ backgroundColor: colors.light }}
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: colors.primary }}
          >
           Pourquoi choisir oussoBody ?
          </h2>
          <p
            className="text-xl opacity-80"
            style={{ color: colors.secondary }}
          >
            - La protection avancée rencontre les soins naturels
           <br/> - Des produits à formulations uniques
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Card */}
          <motion.div
            className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
            initial="hidden"
            whileInView="visible"
            variants={leftToRight}
            viewport={{ once: true }}
          >
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.accent }}
            >
              <Shield size={32} className="text-white" />
            </div>
            <h3
              className="text-2xl font-semibold mb-4"
              style={{ color: colors.primary }}
            >
              48-Hour Protection
            </h3>
            <p style={{ color: colors.secondary }}>
              La formule avancée offre une protection inégalée qui dure jusqu'à 48
              heures, même pendant les entraînements intenses.
            </p>
          </motion.div>

          {/* Center Card */}
          <motion.div
            className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.success }}
            >
              <Leaf size={32} className="text-white" />
            </div>
            <h3
              className="text-2xl font-semibold mb-4"
              style={{ color: colors.primary }}
            >
              Ingrédients naturels
            </h3>
            <p style={{ color: colors.secondary }}>
              Fabriqué avec des plantes biologiques et des huiles essentielles, sans produits chimiques agressifs ni aluminium.
            </p>
          </motion.div>

          {/* Right Card */}
          <motion.div
            className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
            initial="hidden"
            whileInView="visible"
            variants={rightToLeft}
            viewport={{ once: true }}
          >
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.secondary }}
            >
              <Clock size={32} className="text-white" />
            </div>
            <h3
              className="text-2xl font-semibold mb-4"
              style={{ color: colors.primary }}
            >
              Formule à séchage rapide
            </h3>
            <p style={{ color: colors.secondary }}>
              S'applique en douceur et sèche instantanément, sans laisser de traces blanches ni de résidus collants sur vos vêtements.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Features;
