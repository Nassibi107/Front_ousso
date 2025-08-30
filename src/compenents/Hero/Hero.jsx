import React from 'react'

import { ChevronDown, Star, Shield, Leaf, Clock, 
  Users, ArrowRight, Check, Menu, X } from 'lucide-react';
import FLAG11 from '../../assets/FLAG11.png';

export default function Hero({ colors }) {

  return (
        <section id="home" className="pt-20 pb-16 relative overflow-hidden" style={{background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`}}>
           <div className="container mx-auto px-6 relative z-10">
             <div className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
               <div className="text-white">
                 <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                   Stay Fresh
                   <span className="block" style={{color: colors.accent}}>All Day Long</span>
                 </h1>
                 <p className="text-xl mb-8 opacity-90">
                   Revolutionary 48-hour protection with natural ingredients. Experience the confidence of lasting freshness.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4">
                   <button className="px-8 py-4 rounded-full font-semibold text-white transition-transform hover:scale-105" style={{backgroundColor: colors.success}}>
                     Shop Now
                   </button>
                   <button className="px-8 py-4 rounded-full font-semibold border-2 border-white text-white hover:bg-white transition-colors" style={{'&:hover': {color: colors.primary}}}>
                     Learn More
                   </button>
                 </div>
               </div>
               
                 <div className="relative">
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
       </div>
             </div>
           </div>
           
           <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
             <ChevronDown size={32} className="text-white opacity-60" />
           </div>
         </section>
  )
}
