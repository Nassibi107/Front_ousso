import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, Sparkles, Leaf, Shield, Clock, Users, Check } from 'lucide-react';

function FAQ({ colors = {} }) {
  // Default colors matching your palette
  const defaultColors = {
    primary: '#025984',
    secondary: '#0a8899',
    accent: '#0fb5a0',
    light: '#e7d8c4',
    success: '#01af4c'
  };
  
  const finalColors = { ...defaultColors, ...colors };

  const [openFaq, setOpenFaq] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.dataset.element]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      question: "Les déodorants OUSSO BODY sont-ils vraiment 100% naturels ?",
      answer: "Oui, absolument ! Nos déodorants sont formulés avec des ingrédients 100% naturels, sans aluminium, sans parabènes et sans substances chimiques nocives. Nous utilisons des huiles essentielles et des extraits de plantes pour une protection efficace et naturelle.",
      icon: Leaf
    },
    {
      question: "Combien de temps dure la protection ?",
      answer: "Nos déodorants offrent une protection efficace jusqu'à 48 heures. La formule advanced permet une protection longue durée même lors d'activités sportives intenses, tout en respectant votre peau.",
      icon: Clock
    },
    {
      question: "Conviennent-ils aux peaux sensibles ?",
      answer: "Parfaitement ! Notre gamme 'Sensitive Care' est spécialement conçue pour les peaux sensibles. Testés dermatologiquement, nos produits sont hypoallergéniques et sans parfum agressif.",
      icon: Shield
    },
    {
      question: "Y a-t-il des traces blanches sur les vêtements ?",
      answer: "Non, nos déodorants ont une formule invisible qui ne laisse aucune trace blanche sur les vêtements noirs ou de couleur. La texture légère s'absorbe rapidement sans résidus.",
      icon: Check
    },
    {
      question: "Quelle est la différence entre vos gammes ?",
      answer: "Nous proposons 3 gammes : 'Classic Fresh' pour usage quotidien, 'Sport Active' pour protection renforcée, et 'Sensitive Care' pour peaux délicates. Chaque formule est adaptée à des besoins spécifiques.",
      icon: Users
    },
    {
      question: "Où puis-je acheter les produits OUSSO BODY ?",
      answer: "Nos produits sont disponibles en ligne avec livraison gratuite à partir de 200 DH partout au Maroc. Nous livrons également dans les principales pharmacies et magasins bio du royaume.",
      icon: HelpCircle
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 animate-pulse" style={{backgroundColor: finalColors.accent}}></div>
        <div className="absolute top-60 right-20 w-24 h-24 rounded-full opacity-30 animate-bounce" style={{backgroundColor: finalColors.primary}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 rounded-full opacity-25 animate-pulse" style={{backgroundColor: finalColors.secondary, animationDelay: '1s'}}></div>
        <div className="absolute bottom-60 right-1/3 w-20 h-20 rounded-full opacity-30 animate-bounce" style={{backgroundColor: finalColors.success, animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Animated Header */}
        <div className="text-center mb-16">
          <div 
            className={`animate-on-scroll transform transition-all duration-1000 ${
              visibleElements.has('header') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            data-element="header"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <HelpCircle className="animate-pulse" style={{color: finalColors.accent}} size={36} />
              <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-900 via-teal-700 to-green-600 bg-clip-text text-transparent">
                Questions Fréquentes
              </h2>
              <Sparkles className="animate-spin" style={{color: finalColors.success}} size={36} />
            </div>
            <p className="text-xl font-medium" style={{color: finalColors.secondary}}>
              Tout ce que vous devez savoir sur OUSSO BODY
            </p>
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`animate-on-scroll group ${
                  visibleElements.has(`faq-${index}`) 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-20 opacity-0'
                } transition-all duration-700`}
                data-element={`faq-${index}`}
                style={{transitionDelay: `${index * 150}ms`}}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-l-4 group-hover:scale-105" style={{borderColor: finalColors.accent}}>
                  {/* Question Header */}
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between group-hover:bg-gray-50 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* Animated Icon */}
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'rotate-12 scale-110' : ''}`}>
                        <faq.icon className="text-white" size={20} />
                      </div>
                      
                      <h3 className="text-lg font-bold flex-1 group-hover:translate-x-2 transition-transform duration-300" style={{color: finalColors.primary}}>
                        {faq.question}
                      </h3>
                    </div>
                    
                    {/* Animated Chevron */}
                    <ChevronDown 
                      className={`transition-all duration-500 ${openFaq === index ? 'rotate-180 scale-110' : ''}`}
                      style={{color: finalColors.accent}}
                      size={24}
                    />
                  </button>
                  
                  {/* Answer Content with Slide Animation */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ${
                      openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <div className="pl-16 relative">
                        {/* Decorative Line */}
                        <div className="absolute left-6 top-0 w-0.5 h-full bg-gradient-to-b opacity-30" style={{background: `linear-gradient(to bottom, ${finalColors.accent}, ${finalColors.success})`}}></div>
                        
                        <p className="text-base leading-relaxed" style={{color: finalColors.secondary}}>
                          {faq.answer}
                        </p>
                        
                        {/* Floating Check Mark */}
                        {openFaq === index && (
                          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full animate-bounce" style={{backgroundColor: finalColors.success + '10'}}>
                            <Check size={16} style={{color: finalColors.success}} />
                            <span className="text-sm font-medium" style={{color: finalColors.success}}>
                              Réponse vérifiée
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div 
          className={`animate-on-scroll mt-16 text-center ${
            visibleElements.has('help') ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          } transition-all duration-1000`}
          data-element="help"
        >
          <div className="bg-gradient-to-r from-white to-gray-50 rounded-3xl p-8 shadow-xl max-w-2xl mx-auto border-2" style={{borderColor: finalColors.accent + '30'}}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center animate-pulse">
                <HelpCircle className="text-white" size={28} />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4" style={{color: finalColors.primary}}>
              Une autre question ?
            </h3>
            <p className="text-lg mb-6 opacity-80" style={{color: finalColors.secondary}}>
              Notre équipe est là pour vous aider ! Contactez-nous pour toute question supplémentaire.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700">
                💬 Chat en Direct
              </button>
              <button className="px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:bg-white" style={{color: finalColors.primary, borderColor: finalColors.primary}}>
                📧 Nous Contacter
              </button>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div 
          className={`animate-on-scroll mt-12 ${
            visibleElements.has('tips') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } transition-all duration-1000`}
          data-element="tips"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Shield className="text-white" size={20} />
              </div>
              <h4 className="font-bold mb-2" style={{color: finalColors.primary}}>Application</h4>
              <p className="text-sm opacity-80" style={{color: finalColors.secondary}}>
                Appliquez sur peau propre et sèche pour une efficacité optimale
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Leaf className="text-white" size={20} />
              </div>
              <h4 className="font-bold mb-2" style={{color: finalColors.primary}}>Naturel</h4>
              <p className="text-sm opacity-80" style={{color: finalColors.secondary}}>
                Formule 100% naturelle, sans aluminium ni produits chimiques
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Clock className="text-white" size={20} />
              </div>
              <h4 className="font-bold mb-2" style={{color: finalColors.primary}}>Durée</h4>
              <p className="text-sm opacity-80" style={{color: finalColors.secondary}}>
                Protection longue durée jusqu'à 48h, même pendant le sport
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;