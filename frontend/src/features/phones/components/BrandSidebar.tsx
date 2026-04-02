import React from 'react';
import Link from 'next/link';
import { Smartphone, List, Radio, Clock, HelpCircle } from 'lucide-react';
import { Device } from '@/features/phones/services/phoneService';

interface Brand {
  name: string;
  count: number;
}

interface LeftSidebarProps {
  initialBrands: Brand[];
  latestDevices?: Device[];
  activeBrand?: string;
  activeDevice?: string;
}

export default function BrandSidebar({ initialBrands, latestDevices = [], activeBrand, activeDevice }: LeftSidebarProps) {
  return (
    <aside className="w-[180px] lg:w-[220px] xl:w-[250px] flex-shrink-0 flex flex-col gap-6">
      
      {/* 1. PHONE FINDER WIDGET */}
      <div className="bg-[#f0f0f0]">
        <div className="bg-[#ccc] text-[#333] font-bold text-[13px] p-2 flex items-center justify-center gap-2 border-b border-b-white">
          <Smartphone size={16} /> PHONE FINDER
        </div>
        <div className="grid grid-cols-4 whitespace-nowrap p-1 text-[10px] font-bold leading-loose tracking-tighter">
          {initialBrands.slice(0, 24).map((brand) => (
            <Link 
              key={brand.name}
              href={`/brands/${brand.name.toLowerCase()}`}
              className={`px-1 hover:text-[#d21f29] hover:bg-white truncate ${activeBrand?.toLowerCase() === brand.name.toLowerCase() ? 'text-[#d21f29] bg-white' : 'text-[#555]'}`}
            >
              {brand.name.toUpperCase()}
            </Link>
          ))}
        </div>
        <div className="flex border-t border-t-white">
           <Link href="/brands" className="flex-1 bg-[#ccc] text-[#333] hover:bg-[#bbb] p-2 text-[10px] font-bold flex justify-center items-center gap-1 border-r border-white">
              <List size={12} /> ALL BRANDS
           </Link>
           <Link href="/rumors" className="flex-1 bg-[#ccc] text-[#333] hover:bg-[#bbb] p-2 text-[10px] font-bold flex justify-center items-center gap-1">
              <Radio size={12} /> RUMOR MILL
           </Link>
        </div>
      </div>

      {/* CONDITIONAL RENDER FOR DEVICE DETAIL PAGE */}
      {activeDevice ? (
        <>
          {/* PRICES WIDGET */}
          <div>
            <h3 className="text-[#333] font-bold text-[15px] border-b border-[#e5e5e5] pb-1 mx-2 mb-2 uppercase">PRICES</h3>
            <div className="px-2">
               <div className="border border-[#e5e5e5] bg-white text-sm text-[#333] mb-4 relative">
                  <div className="flex justify-between items-center bg-[#f6f6f6] border-b border-[#e5e5e5] p-2 font-bold mb-2 text-[12px]">
                     {activeDevice} <HelpCircle size={12} className="text-[#999]" />
                  </div>
                  
                  <div className="px-3 pb-2 border-b border-[#e5e5e5]">
                     <div className="text-[11px] font-bold text-[#555] mb-2">128GB 8GB RAM</div>
                     <div className="flex justify-between items-center mb-1 hover:bg-[#f6f6f6] px-1 cursor-pointer">
                        <span className="font-bold">amazon.<span className="text-[#ff9900]">de</span></span>
                        <span className="text-[#d21f29] font-bold">€ 529.00</span>
                     </div>
                  </div>

                  <div className="px-3 py-2 border-b border-[#e5e5e5]">
                     <div className="text-[11px] font-bold text-[#555] mb-2">256GB 8GB RAM</div>
                     <div className="flex justify-between items-center mb-1 hover:bg-[#f6f6f6] px-1 cursor-pointer">
                        <span className="font-bold">amazon.<span className="text-[#ff9900]">co.uk</span></span>
                        <span className="text-[#d21f29] font-bold">£ 529.00</span>
                     </div>
                     <div className="flex justify-between items-center mb-1 hover:bg-[#f6f6f6] px-1 cursor-pointer">
                        <span className="font-bold">amazon.<span className="text-[#ff9900]">in</span></span>
                        <span className="text-[#d21f29] font-bold">₹ 56,999</span>
                     </div>
                  </div>

                  <div className="px-3 py-2 mb-8">
                     <div className="text-[11px] font-bold text-[#555] mb-2">512GB 12GB RAM</div>
                     <div className="flex justify-between items-center mb-1 hover:bg-[#f6f6f6] px-1 cursor-pointer">
                        <span className="font-bold">amazon.<span className="text-[#ff9900]">co.uk</span></span>
                        <span className="text-[#fbb878] font-bold">£ 699.00</span>
                     </div>
                  </div>
                  
                  <div className="absolute inset-x-0 bottom-0 bg-[#ccc] text-center text-[10px] font-bold text-white py-1 cursor-pointer hover:bg-[#999]">
                     SHOW ALL PRICES
                  </div>
               </div>
            </div>
          </div>
          
          {/* DEVICE IN THE NEWS */}
          <div>
            <h3 className="text-[#333] font-bold text-[13px] border-b border-[#e5e5e5] pb-1 mx-2 mb-2 uppercase">{activeDevice} IN THE NEWS</h3>
            <div className="flex flex-col gap-3 px-2 text-[#333]">
               {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-2 text-[11px] leading-tight border-b border-[#e5e5e5] pb-2 last:border-0 hover:bg-[#f9f9f9] p-1 cursor-pointer group">
                     <img src={`https://picsum.photos/seed/${i + 15}/40/40`} className="w-10 h-10 border border-[#ccc]" />
                     <div>
                        <span className="font-bold group-hover:text-[#d21f29]">Hot take: {activeDevice} and upcoming models</span>
                        <span className="block text-[#999] text-[9px] mt-1">🕒 29 Mar 2026</span>
                     </div>
                  </div>
               ))}
               <div className="text-right text-[10px] font-bold hover:underline cursor-pointer">
                 MORE RELATED ARTICLES &raquo;
               </div>
            </div>
          </div>
        </>
      ) : activeBrand ? (
        <>
          {/* BRAND REVIEWS */}
          <div>
            <h3 className="text-[#333] font-bold text-[13px] border-b border-[#e5e5e5] pb-1 mx-2 mb-2 uppercase">{activeBrand} REVIEWS</h3>
            <div className="flex flex-col gap-2 px-2">
               {[1, 2, 3, 4].map(i => (
                  <div key={i} className="relative w-full h-[100px] border border-[#ccc] bg-gray-200 overflow-hidden cursor-pointer group">
                     <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                     <img src={`https://picsum.photos/seed/${i + 20}/300/150`} alt={`${activeBrand} Review`} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform" />
                     <h4 className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-bold z-20 group-hover:underline uppercase bg-white/90 text-[#333] p-1 shadow">
                        {activeBrand} Galaxy S26 Review {i}
                     </h4>
                  </div>
               ))}
            </div>
          </div>
          
          {/* DAILY DEALS */}
          <div>
            <h3 className="text-[#333] font-bold text-[13px] border-b border-[#e5e5e5] pb-1 mx-2 mb-2 uppercase flex justify-between items-center">
               DAILY DEALS <Clock size={12} />
            </h3>
            <div className="flex flex-col gap-2 px-2">
               <div className="bg-[#f0f0f0] p-2 text-center text-xs text-[#555] border border-[#ccc]">
                  Deals coming soon...
               </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Default Home Page Widgets */}
          {/* 2. LATEST DEVICES WIDGET */}
          {latestDevices && latestDevices.length > 0 && (
            <div>
              <h3 className="text-[#333] font-bold text-[13px] border-b border-[#e5e5e5] pb-1 mx-2 mb-2">LATEST DEVICES</h3>
              <div className="grid grid-cols-2 gap-2 px-2 relative">
                 <div className="absolute right-0 top-0 bottom-0 w-2 bg-gray-200 rounded-full my-1 mr-1 shadow-inner">
                    <div className="w-full h-1/3 bg-gray-400 rounded-full mt-2"></div>
                 </div>
                 {latestDevices.slice(0, 6).map(device => (
                   <Link key={device.id} href={`/devices/${device.slug}`} className="flex flex-col items-center p-2 text-center group hover:bg-[#f9f9f9] rounded-md transition-colors">
                      <div className="h-[75px] mb-2 flex items-end">
                         <img src={device.thumbnail} alt={device.model} className="max-h-full w-auto object-contain" />
                      </div>
                      <span className="text-[11px] font-bold text-[#333] group-hover:text-[#d21f29] leading-tight flex flex-col">
                        <span>{device.brand}</span>
                        <span>{device.model.replace(`${device.brand} `, '')}</span>
                      </span>
                   </Link>
                 ))}
              </div>
            </div>
          )}

          {/* 3. IN STORES NOW WIDGET */}
          {latestDevices && latestDevices.length > 0 && (
            <div>
              <h3 className="text-[#333] font-bold text-[13px] border-b border-[#e5e5e5] pb-1 mx-2 mb-2">IN STORES NOW</h3>
              <div className="grid grid-cols-2 gap-2 px-2 relative">
                 <div className="absolute right-0 top-0 bottom-0 w-2 bg-gray-200 rounded-full my-1 mr-1 shadow-inner">
                    <div className="w-full h-1/3 bg-gray-400 rounded-full mt-2"></div>
                 </div>
                 {latestDevices.slice(0, 4).map(device => (
                   <Link key={device.id} href={`/devices/${device.slug}`} className="flex flex-col items-center p-2 text-center group hover:bg-[#f9f9f9] rounded-md transition-colors">
                      <div className="h-[75px] mb-2 flex items-end">
                         <img src={device.thumbnail} alt={device.model} className="max-h-full w-auto object-contain" />
                      </div>
                      <span className="text-[11px] font-bold text-[#333] group-hover:text-[#d21f29] leading-tight flex flex-col">
                        <span>{device.brand}</span>
                        <span>{device.model.replace(`${device.brand} `, '')}</span>
                      </span>
                   </Link>
                 ))}
              </div>
            </div>
          )}
        </>
      )}
      
    </aside>
  );
}
