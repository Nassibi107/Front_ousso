import React from 'react'
import { ChevronDown, Star, Shield, Leaf, Clock, 
  Users, ArrowRight, Check, Menu, X } from 'lucide-react';
function Testimonials({ colors }) {
  return (
    <section id="testimonials" className="py-20" style={{backgroundColor: colors.light}}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{color: colors.primary}}>
              What Our Customers Say
            </h2>
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} fill={colors.success} style={{color: colors.success}} />
              ))}
            </div>
            <p className="text-xl" style={{color: colors.secondary}}>4.9/5 from over 10,000 reviews</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', review: 'Finally found a deodorant that actually works all day! Love the natural ingredients.', rating: 5 },
              { name: 'Mike R.', review: 'As an athlete, I need serious protection. FreshGuard delivers every time.', rating: 5 },
              { name: 'Lisa K.', review: 'Sensitive skin friendly and smells amazing. Will never switch brands again!', rating: 5 }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill={colors.success} style={{color: colors.success}} />
                  ))}
                </div>
                <p className="mb-4 italic" style={{color: colors.primary}}>"{testimonial.review}"</p>
                <p className="font-semibold" style={{color: colors.secondary}}>- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Testimonials