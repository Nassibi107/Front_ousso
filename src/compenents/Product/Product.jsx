import React from 'react'
import { ChevronDown, Star, Shield, Leaf, Clock, 
  Users, ArrowRight, Check, Menu, X } from 'lucide-react';


function Product({ colors }) {
  return (
     <section id="products" className="py-20 bg-white">
           <div className="container mx-auto px-6">
             <div className="text-center mb-16">
               <h2 className="text-4xl font-bold mb-4" style={{color: colors.primary}}>
                 Our Product Line
               </h2>
               <p className="text-xl opacity-80" style={{color: colors.secondary}}>
                 Choose the perfect protection for your lifestyle
               </p>
             </div>
   
             <div className="grid md:grid-cols-3 gap-8">
               {[
                 { name: 'Classic Fresh', price: '$12.99', features: ['24h Protection', 'Fresh Scent', 'Aluminum Free'] },
                 { name: 'Sport Active', price: '$15.99', features: ['48h Protection', 'Sweat Resistant', 'Quick Dry'], popular: true },
                 { name: 'Sensitive Care', price: '$14.99', features: ['Gentle Formula', 'Hypoallergenic', 'Unscented'] }
               ].map((product, index) => (
                 <div key={index} className={`relative p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 ${product.popular ? 'ring-4' : ''}`} style={{backgroundColor: colors.light, ringColor: product.popular ? colors.success : 'transparent'}}>
                   {product.popular && (
                     <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-white text-sm font-semibold" style={{backgroundColor: colors.success}}>
                       Most Popular
                     </div>
                   )}
                   
                   <div className="text-center">
                     <div className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{backgroundColor: colors.accent}}>
                       FG
                     </div>
                     <h3 className="text-2xl font-semibold mb-2" style={{color: colors.primary}}>{product.name}</h3>
                     <p className="text-3xl font-bold mb-6" style={{color: colors.secondary}}>{product.price}</p>
                     
                     <ul className="space-y-3 mb-8">
                       {product.features.map((feature, idx) => (
                         <li key={idx} className="flex items-center justify-center">
                           <Check size={16} className="mr-2" style={{color: colors.success}} />
                           <span style={{color: colors.primary}}>{feature}</span>
                         </li>
                       ))}
                     </ul>
                     
                     <button className="w-full py-3 rounded-full font-semibold text-white transition-transform hover:scale-105" style={{backgroundColor: colors.secondary}}>
                       Add to Cart
                     </button>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </section>
  )
}

export default Product