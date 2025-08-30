import React from 'react'
import { ChevronDown, Star, Shield, Leaf, Clock, 
  Users, ArrowRight, Check, Menu, X } from 'lucide-react';
function Footer({ colors }) {
  return (
     <footer className="py-16" style={{backgroundColor: colors.primary}}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-white">
            <div>
              <h3 className="text-2xl font-bold mb-4">FreshGuard</h3>
              <p className="opacity-80">
                Revolutionary deodorant protection with natural ingredients for modern lifestyles.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <ul className="space-y-2 opacity-80">
                <li>Classic Fresh</li>
                <li>Sport Active</li>
                <li>Sensitive Care</li>
                <li>Travel Size</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 opacity-80">
                <li>FAQ</li>
                <li>Shipping Info</li>
                <li>Returns</li>
                <li>Contact Us</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 opacity-80">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Newsletter</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white border-opacity-20 mt-12 pt-8 text-center text-white opacity-60">
            <p>&copy; 2025 ousso body. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer