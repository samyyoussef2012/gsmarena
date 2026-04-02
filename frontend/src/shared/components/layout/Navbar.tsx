import React from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Rss, Camera, Video, User, LogIn, ChevronRight } from 'lucide-react';

const navigation = [
  'HOME', 'NEWS', 'REVIEWS', 'VIDEOS', 'FEATURED', 'PHONE FINDER', 'DEALS', 'MERCH', 'COVERAGE', 'CONTACT'
];

export default function Navbar() {
  return (
    <header className="w-full flex justify-center flex-col items-center">
      {/* Top Dark Header */}
      <div className="w-full bg-[#3b3b3b] flex justify-center h-[50px]">
        <div className="max-w-[1240px] w-full px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
             <span className="text-white text-3xl font-black italic tracking-tighter">gsm<span className="text-white">arena</span></span>
          </Link>

          <div className="flex-1 max-w-md mx-6 flex relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-3 pr-10 py-1.5 text-sm bg-white/90 focus:bg-white focus:outline-none placeholder:text-gray-500 rounded-sm"
            />
            <button className="absolute right-0 top-0 bottom-0 px-3 bg-[#e5e5e5] border-l border-[#ccc] text-[#555] rounded-r-sm hover:bg-[#d5d5d5] transition-colors">
              <Search size={16} />
            </button>
          </div>

          <div className="flex items-center gap-4 text-white/80">
             <div className="flex gap-3 text-xs pr-4 border-r border-white/20">
                <Link href="#" className="flex flex-col items-center hover:text-white group"><span className="uppercase text-[9px] mb-0.5 opacity-80 group-hover:opacity-100">Tip Us</span><ChevronRight size={14} /></Link>
                <Link href="#" className="flex flex-col items-center hover:text-white group"><span className="uppercase text-[9px] mb-0.5 opacity-80 group-hover:opacity-100">2.1M</span><Video size={14} /></Link>
                <Link href="#" className="flex flex-col items-center hover:text-white group"><span className="uppercase text-[9px] mb-0.5 opacity-80 group-hover:opacity-100">160K</span><Camera size={14} /></Link>
                <Link href="#" className="flex flex-col items-center hover:text-white group"><span className="uppercase text-[9px] mb-0.5 opacity-80 group-hover:opacity-100">RSS</span><Rss size={14} /></Link>
             </div>
             <div className="flex gap-4 text-[11px] font-bold">
                <Link href="#" className="hover:text-white">EV</Link>
                <Link href="#" className="hover:text-white">MERCH</Link>
                <Link href="#" className="hover:text-white">LOG IN</Link>
                <Link href="#" className="hover:text-white">SIGN UP</Link>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Light Nav */}
      <div className="w-full bg-[#f4f4f4] border-b border-[#ddd] flex justify-center h-[40px] shadow-sm">
        <div className="max-w-[1240px] w-full px-4 flex items-center justify-between">
          {navigation.map((item) => (
             <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-[#555] hover:text-[#d21f29] font-medium text-[13px] px-3 transition-colors h-full flex items-center">
                {item}
             </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
