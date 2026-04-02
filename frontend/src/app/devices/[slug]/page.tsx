import React from 'react';
import { phoneService } from '@/features/phones/services/phoneService';
import SpecTable from '@/features/phones/components/SpecTable';
import BrandSidebar from '@/features/phones/components/BrandSidebar';
import { notFound } from 'next/navigation';
import { Share2, Calendar, Smartphone, Settings, Database, Heart, ArrowUpRight, MessageSquare, Image as ImageIcon, DollarSign, Layers } from 'lucide-react';

export default async function DevicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brandsPromise = phoneService.getBrands();
  const device = await phoneService.getBySlug(slug);
  const brands = await brandsPromise;

  if (!device) notFound();

  return (
    <div className="bg-white">
      <div className="max-w-[1240px] mx-auto px-4 flex gap-4 pt-4">
        {/* Pass activeDevice to render device-specific Sidebar widgets */}
        <BrandSidebar initialBrands={brands} activeDevice={`${device.brand} ${device.model.replace(`${device.brand} `, '')}`} />

        <main className="flex-1 min-w-0">
          
          {/* GSMArena Classic Purple Device Hero */}
          <div className="border border-[#c6bced] rounded-t-lg bg-gradient-to-b from-[#f2effa] to-[#ffffff] mb-4">
             {/* Header Bar */}
             <div className="bg-[#b3a8eb] flex justify-between items-center px-4 py-2 rounded-t flex-wrap">
                <h1 className="text-white text-2xl font-bold drop-shadow-sm tracking-tight m-0">
                   {device.brand} {device.model.replace(`${device.brand} `, '')}
                </h1>
                <Share2 className="text-white/80 cursor-pointer hover:text-white" size={18} />
             </div>
             
             {/* Middle Details Box */}
             <div className="p-4 flex gap-6 border-b border-[#e5e5e5] flex-col md:flex-row">
                
                {/* Left: Device Image */}
                <div className="w-[140px] flex-shrink-0 bg-white border border-[#e5e5e5] rounded flex items-center justify-center p-2 shadow-sm">
                   <img src={device.thumbnail} alt={device.model} className="max-h-[180px] w-auto object-contain" />
                </div>
                
                {/* Middle: Text Specs */}
                <div className="flex-1 flex flex-col justify-center gap-2 text-[#555] text-sm font-medium">
                   <div className="flex items-center gap-2"><Calendar size={14} /> Exp. release {device.detailedSpecs?.launch.status.match(/\d{4}/)?.[0] || '2026'}, April</div>
                   <div className="flex items-center gap-2"><Smartphone size={14} /> 179g, 6.9mm thickness</div>
                   <div className="flex items-center gap-2"><Settings size={14} /> {device.detailedSpecs?.platform.os || 'Android 15'}</div>
                   <div className="flex items-center gap-2"><Database size={14} /> 128GB/256GB/512GB storage, no card slot</div>
                </div>

                {/* Right: Accolades Badges */}
                <div className="w-[180px] flex flex-col gap-2 shrink-0">
                   <div className="bg-[#f0edfa] border border-[#c6bced] text-[#7158c3] rounded px-3 py-2 flex flex-col items-center justify-center shadow-sm">
                      <div className="flex items-center gap-1 text-2xl font-black italic"><ArrowUpRight size={20} /> 95%</div>
                      <div className="text-[10px] font-bold tracking-wider">1,109,679 HITS</div>
                   </div>
                   <div className="bg-[#e4ddf4] border border-[#c6bced] text-[#7158c3] rounded px-3 py-2 flex flex-col items-center justify-center shadow-sm cursor-pointer hover:bg-[#d5cbf0] transition-colors">
                      <div className="flex items-center gap-1 text-2xl font-black italic"><Heart size={18} /> 148</div>
                      <div className="text-[10px] font-bold tracking-wider">BECOME A FAN</div>
                   </div>
                </div>
             </div>

             {/* Bottom Quick Specs Grid */}
             <div className="flex justify-between items-center px-6 py-4 divide-x divide-[#e5e5e5]">
                <div className="flex-1 flex gap-3 text-[#333]">
                   <Smartphone size={32} strokeWidth={1} className="text-[#333]" />
                   <div>
                      <div className="text-xl font-bold leading-tight">{device.specs.display.split(' ')[0]}</div>
                      <div className="text-[10px] text-[#777]">1080x2340 pixels</div>
                   </div>
                </div>
                <div className="flex-1 flex gap-3 text-[#333] pl-6">
                   <div className="w-8 h-8 rounded-full border-2 border-[#333] relative">
                      <div className="absolute inset-0 m-auto w-3 h-3 bg-[#333] rounded-full"></div>
                   </div>
                   <div>
                      <div className="text-xl font-bold leading-tight">{device.specs.camera.split(' ')[0]}</div>
                      <div className="text-[10px] text-[#777]">2160p</div>
                   </div>
                </div>
                <div className="flex-1 flex gap-3 text-[#333] pl-6">
                   <Database size={32} strokeWidth={1} className="text-[#333]" />
                   <div>
                      <div className="text-xl font-bold leading-tight">{device.specs.ram.split(' ')[0]}</div>
                      <div className="text-[10px] text-[#777]">{device.specs.chipset}</div>
                   </div>
                </div>
                <div className="flex-1 flex gap-3 text-[#333] pl-6">
                   <div className="w-5 h-8 border-[2px] border-[#333] relative">
                      <div className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-2 h-[2px] bg-[#333]"></div>
                   </div>
                   <div>
                      <div className="text-xl font-bold leading-tight">{device.specs.battery.split(' ')[0]}</div>
                      <div className="text-[10px] text-[#777]">45W</div>
                   </div>
                </div>
             </div>

             {/* Functional Toolbar */}
             <div className="bg-[#b3a8eb] flex gap-1 h-[36px] w-full px-1 py-1 rounded-b font-bold text-xs uppercase shadow-inner">
                <button className="flex-1 bg-white/20 text-white rounded hover:bg-white/30 flex justify-center items-center gap-2"><MessageSquare size={14} /> OPINIONS</button>
                <button className="flex-1 bg-white/20 text-white rounded hover:bg-white/30 flex justify-center items-center gap-2"><Layers size={14} /> COMPARE</button>
                <button className="flex-1 bg-white/20 text-white rounded hover:bg-white/30 flex justify-center items-center gap-2"><ImageIcon size={14} /> PICTURES</button>
                <button className="flex-1 bg-white/40 text-white rounded hover:bg-white/50 flex justify-center items-center gap-2"><DollarSign size={14} /> PRICES</button>
             </div>
          </div>

          <div className="mb-2 text-xs text-[#555] font-medium border-b border-[#ccc] pb-2">
             Also known as {device.brand} {device.model} 5G
          </div>

          {/* Technical Specs Table */}
          {device.detailedSpecs && <SpecTable specs={device.detailedSpecs} />}
        </main>
      </div>
    </div>
  );
}
