import React from 'react';
import { phoneService } from '@/features/phones/services/phoneService';
import BrandSidebar from '@/features/phones/components/BrandSidebar';
import { MessageSquare, Bell } from 'lucide-react';

export default async function Home() {
  const [brands, latest] = await Promise.all([
    phoneService.getBrands(),
    phoneService.getLatest()
  ]);

  return (
    <div className="bg-white">
      <div className="max-w-[1240px] mx-auto px-4 flex gap-4 pt-4">
        {/* Left Sidebar: Brands & Latest Devices */}
        <BrandSidebar initialBrands={brands} latestDevices={latest} />

        {/* Middle Main Column */}
        <main className="flex-1 min-w-0">
          
          {/* Hero News Grid (Mimicking exactly the screenshot 5-block image grid) */}
          <div className="grid grid-cols-3 grid-rows-2 gap-1 h-[400px] mb-6">
             {/* Main large image (spans 2 cols, 2 rows normally, wait screenshot shows 2 cols 1 row but let's make it fit) 
                 Actually, looking at the screenshot carefully:
                 Top row: 1 large (spans 2 cols) + 2 small (stacked in 1 col) -> Wait.
                 It's a flex layout or grid. Let's do a simple flex/grid.
             */}
             
             {/* Left Large (Nothing Phone) */}
             <div className="col-span-2 row-span-1 relative bg-red-600 group cursor-pointer overflow-hidden h-[195px]">
                {/* Simulated BG */}
                <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute top-2 left-2 text-white text-[10px] font-bold z-20">🕒 31 MAR 2026</div>
                <div className="absolute top-2 right-2 text-white text-[10px] font-bold z-20 flex items-center gap-1"><MessageSquare size={10} /> 76</div>
                <h2 className="absolute bottom-4 left-4 text-white text-3xl font-black w-3/4 z-20 leading-none group-hover:underline shadow-black drop-shadow-md">
                   Nothing Phone (4a) review
                </h2>
             </div>
             
             {/* Top Right Stack */}
             <div className="col-span-1 row-span-1 flex flex-col gap-1 h-[195px]">
                <div className="flex-1 relative bg-orange-200 group cursor-pointer overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                   <h3 className="absolute bottom-2 left-2 text-white text-lg font-bold z-20 group-hover:underline leading-none">Oppo Find N6 review</h3>
                </div>
                <div className="flex-1 relative bg-blue-100 group cursor-pointer overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                   <h3 className="absolute bottom-2 left-2 text-white text-lg font-bold z-20 group-hover:underline leading-none">Xiaomi Pad 8 Pro review</h3>
                </div>
             </div>

             {/* Bottom Row - 3 images */}
             <div className="col-span-1 row-span-1 relative bg-pink-100 group cursor-pointer overflow-hidden h-[200px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <h3 className="absolute bottom-2 left-2 text-white text-[16px] font-bold z-20 group-hover:underline leading-tight pr-2">Honor X80i arrives with Dimensity 6500 and 7,000mAh battery</h3>
             </div>
             <div className="col-span-1 row-span-1 relative bg-gray-200 group cursor-pointer overflow-hidden h-[200px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <h3 className="absolute bottom-2 left-2 text-white text-[16px] font-bold z-20 group-hover:underline leading-tight pr-2">Tecno Pova Curve 2 hands-on</h3>
             </div>
             <div className="col-span-1 row-span-1 relative bg-gray-300 group cursor-pointer overflow-hidden h-[200px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <h3 className="absolute bottom-2 left-2 text-white text-[16px] font-bold z-20 group-hover:underline leading-tight pr-2">Samsung Galaxy S26 Ultra vs. Apple iPhone 17 Pro Max</h3>
             </div>
          </div>

          {/* Section Divider */}
          <div className="bg-[#f0f0f0] border border-[#ccc] p-3 flex justify-between items-center mb-6">
             <div className="border-l-4 border-red-400 pl-3">
                <h2 className="text-[#333] text-xl font-black uppercase tracking-tight leading-none mb-1">Ultra Camera Showdown</h2>
                <h3 className="text-[#777] text-xs font-bold uppercase tracking-wider">HUAWEI, OPPO, SAMSUNG, VIVO & XIAOMI FACE OFF</h3>
             </div>
             <Bell className="text-red-500" size={24} />
          </div>

          {/* Vertical News Feed */}
          <div className="flex flex-col gap-4 border border-[#e5e5e5] p-4 bg-white shadow-sm">
             {[
               { title: 'Honor Play 80 gets official too, here are the specs', desc: 'As the name implies, it\'s a lower-end companion to the Honor Play 80 Pro.', time: '41 MINUTES AGO', comments: '2' },
               { title: 'Apple\'s AirTag 2 gets an improvement for its anti-stalking feature', desc: 'The noise it makes is now different.', time: '1 HOUR AGO', comments: '4' },
               { title: 'Honor continues its teaser campaign for the 600 series', desc: 'These phones are definitely launching soon, we just don\'t know exactly when yet.', time: '2 HOURS AGO', comments: '12' }
             ].map((news, i) => (
                <div key={i} className="flex gap-4 border-b border-[#e5e5e5] pb-4 last:border-0 last:pb-0 group cursor-pointer">
                   <div className="w-[180px] h-[120px] bg-gray-200 border border-[#ccc] overflow-hidden shrink-0">
                      <img src={`https://picsum.photos/seed/${i}/200/150`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                   </div>
                   <div className="flex flex-col justify-between py-1">
                      <div>
                         <h3 className="text-[#0056b3] text-[18px] leading-tight font-medium group-hover:underline mb-2">{news.title}</h3>
                         <p className="text-[#555] text-[13px] leading-snug">{news.desc}</p>
                      </div>
                      <div className="flex gap-4 text-[#999] text-[10px] uppercase font-bold items-center mt-2">
                         <span>🕒 {news.time}</span>
                         <span className="flex items-center gap-1"><MessageSquare size={10} /> {news.comments}</span>
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </main>

        {/* Right Sidebar (Optional hidden on small, fixed width) */}
        <aside className="w-[160px] hidden xl:block flex-shrink-0">
           <div className="bg-[#f0f0f0] border border-[#ccc] h-[600px] flex items-center justify-center text-[#999] text-xs">
              ADVERTISEMENT
           </div>
        </aside>

      </div>
    </div>
  );
}
