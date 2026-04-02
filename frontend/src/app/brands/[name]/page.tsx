import React from 'react';
import { phoneService } from '@/features/phones/services/phoneService';
import BrandSidebar from '@/features/phones/components/BrandSidebar';
import MiniPhoneCard from '@/features/phones/components/MiniPhoneCard';
import { List, Newspaper, Calendar, TrendingUp } from 'lucide-react';

interface BrandPageProps {
  params: Promise<{ name: string }>;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  
  // Fetch required data in parallel
  const [brands, phones] = await Promise.all([
    phoneService.getBrands(),
    phoneService.getByBrand(decodedName) // Fetch the 24 dense phones for this brand
  ]);

  const brandObj = brands.find(b => b.name.toLowerCase() === decodedName.toLowerCase());
  const displayName = brandObj?.name || (decodedName.charAt(0).toUpperCase() + decodedName.slice(1));

  return (
    <div className="bg-white">
      <div className="max-w-[1240px] mx-auto px-4 flex gap-4 pt-4">
        {/* Pass brandName to sidebar so it shows brand-specific reviews sidebar like the image */}
        <BrandSidebar initialBrands={brands} activeBrand={displayName} />

        <main className="flex-1 min-w-0">
          
          {/* Main Hero Banner for Brand */}
          <div className="relative w-full h-[220px] bg-[#1a1a2e] mb-0 overflow-hidden">
             {/* Note: using a generic photo instead of the s24 ultra camera cluster, just a placeholder image */}
             <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
             <img src="https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra-5g-sm-s928-u1.jpg" alt={`${displayName} Hero`} className="w-full h-full object-cover opacity-50" />
             <h1 className="absolute bottom-6 left-6 text-white text-4xl font-bold tracking-tight z-20 drop-shadow-md">
                {displayName} phones
             </h1>
          </div>

          {/* Navigation/Sort Toolbar directly under the banner */}
          <div className="bg-[#555] flex justify-between items-stretch h-[36px] w-full mb-4 px-2">
             <div className="flex gap-2">
                <button className="flex items-center gap-1 text-white text-[11px] font-bold uppercase hover:bg-white/10 px-3 cursor-pointer">
                   <List size={14} className="opacity-80" /> Compare
                </button>
                <button className="flex items-center gap-1 text-white text-[11px] font-bold uppercase hover:bg-white/10 px-3 cursor-pointer">
                   <Newspaper size={14} className="opacity-80" /> {displayName} NEWS
                </button>
             </div>
             
             <div className="flex">
                <button className="flex items-center gap-1 bg-[#d21f29] text-white text-[11px] font-bold uppercase px-4 cursor-pointer">
                   <Calendar size={14} className="opacity-80" /> Time of release
                </button>
                <button className="flex items-center gap-1 hover:bg-[#666] text-white text-[11px] font-bold uppercase px-4 cursor-pointer transition-colors">
                   <TrendingUp size={14} className="opacity-80" /> Popularity
                </button>
             </div>
          </div>

          {/* Dense Filters Bar (Screenshot replication) */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-[11px] tracking-wide">
            <span className="font-bold text-[#333]">Filters:</span>
            {['Card slot', '3.5mm jack', 'eSIM', 'Wireless charging', '120Hz+ display', 'Foldables', 'Tablets', 'Watches'].map((filter) => (
                <button key={filter} className="text-[#0056b3] hover:underline cursor-pointer">
                  {filter}
                </button>
            ))}
            <button className="text-[#777] hover:underline ml-2">
                More filters
            </button>
          </div>

          {/* Phone Grid matching exactly the screenshot (5 cols usually) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-6">
            {phones.map((phone) => (
              <MiniPhoneCard 
                  key={phone.id}
                  slug={phone.slug}
                  thumbnail={phone.thumbnail}
                  model={phone.model.replace(`${displayName} `, '')}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
