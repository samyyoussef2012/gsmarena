import React from 'react';
import Link from 'next/link';
import { MessageCircle, Camera, Video, Mail, Smartphone } from 'lucide-react';

const links = {
  products: [
    { name: 'Phone Finder', href: '/devices' },
    { name: 'Compare', href: '/compare' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Latest News', href: '/news' },
  ],
  support: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Contact Us', href: '/contact' },
  ],
  social: [
    { name: 'Twitter', icon: MessageCircle, href: '#' },
    { name: 'Instagram', icon: Camera, href: '#' },
    { name: 'Youtube', icon: Video, href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#f0f0f0] border-t border-[#ccc] mt-10 pt-8 pb-4 w-full">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-0 grid grid-cols-1 md:grid-cols-4 gap-8 text-[13px] text-[#333]">
        <div>
          <Link href="/" className="inline-block mb-4">
            <span className="text-xl font-bold font-sans tracking-tighter text-[#333]">
              GSM<span className="text-[#d21f29]">Arena</span>
            </span>
          </Link>
          <div className="flex gap-2">
            {links.social.map((item) => (
              <a key={item.name} href={item.href} className="w-8 h-8 bg-white border border-[#ccc] rounded flex items-center justify-center hover:bg-[#e0e0e0]">
                <item.icon size={14} className="text-[#555]" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4 uppercase text-[#d21f29]">Explore</h4>
          <ul className="space-y-2">
            {links.products.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-[#0056b3] hover:underline hover:text-[#d21f29]">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 uppercase text-[#d21f29]">Organization</h4>
          <ul className="space-y-2">
            {links.support.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-[#0056b3] hover:underline hover:text-[#d21f29]">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 uppercase text-[#d21f29]">Newsletter</h4>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full px-2 py-1.5 border border-[#ccc] focus:outline-none"
            />
            <button className="bg-[#d21f29] text-white px-3 font-bold">Go</button>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1200px] mx-auto px-4 lg:px-0 border-t border-[#ccc] mt-8 pt-4 flex justify-between items-center text-[11px] text-[#777]">
        <p>© 2000-2026 GSMArena.com Mobile version</p>
        <div className="flex gap-4">
           <Link href="/terms" className="hover:underline">Terms of use</Link>
           <Link href="/privacy" className="hover:underline">Privacy policy</Link>
        </div>
      </div>
    </footer>
  );
}
