
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-8 lg:px-16 py-12">
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">About</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white text-sm">Career</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white text-sm">Products</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/business" className="text-gray-400 hover:text-white text-sm">Business</Link></li>
              <li><Link to="/sales" className="text-gray-400 hover:text-white text-sm">Sales</Link></li>
              <li><Link to="/team" className="text-gray-400 hover:text-white text-sm">Team</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-white text-sm">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase">Helpful Links</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-400 hover:text-white text-sm">FAQ</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-white text-sm">Support</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-white text-sm">Cookie Policy</Link></li>
              <li><Link to="/compliance" className="text-gray-400 hover:text-white text-sm">Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 px-4 md:px-8 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} APRO.AI. All rights reserved.
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube size={18} />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
