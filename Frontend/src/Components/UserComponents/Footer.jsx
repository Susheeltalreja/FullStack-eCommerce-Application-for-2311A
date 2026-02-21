import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '../ui/button'

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-zinc-800">
      <div className="max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tighter hover:text-orange-500 transition-colors cursor-pointer">
            ShopEase
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Elevating your style with curated collections and premium quality. 
            Join our community of over 50k fashion enthusiasts.
          </p>
          <div className="flex space-x-4 pt-2">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
              <a 
                key={idx} 
                href="#" 
                className="p-2 bg-zinc-900 rounded-full hover:bg-orange-500 hover:-translate-y-1 transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Shop Categories</h3>
          <ul className="space-y-4 text-zinc-400 text-sm">
            {['Men', 'Women', 'Kids', 'Accessories', 'New Arrivals'].map((item) => (
              <li key={item}>
                <Link 
                  to={`/user/list/${item}`} 
                  className="hover:text-orange-500 hover:pl-2 transition-all duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Customer Care</h3>
          <ul className="space-y-4 text-zinc-400 text-sm">
            {['Track Order', 'Return Policy', 'Shipping Info', 'FAQs', 'Contact Us'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
          <p className="text-zinc-400 text-sm">Subscribe to get special offers and first look at new drops.</p>
          <div className="flex flex-col space-y-2">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors"
            />
            <Button className="bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all font-bold w-full">
              Subscribe
            </Button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-[80%] mx-auto mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-xs gap-4">
        <p>© {currentYear} ShopEase Inc. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer