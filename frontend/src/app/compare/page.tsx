'use client';

import React from 'react';
import { useCompareStore } from '@/store/useCompareStore';
import { X, GitCompare, Landmark } from 'lucide-react';
import Link from 'next/link';

export default function ComparePage() {
  const { devices, removeDevice } = useCompareStore();

  if (devices.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
         <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8">
            <GitCompare size={40} className="text-white/20" />
         </div>
         <h1 className="text-3xl font-black text-white outfit mb-4">No devices selected</h1>
         <p className="text-[var(--color-text-dim)] max-w-sm mb-10">
            Select up to 3 devices from the home page to start a detailed side-by-side technical comparison.
         </p>
         <Link href="/">
            <button className="px-8 py-4 bg-[var(--color-brand)] text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all uppercase tracking-widest text-xs">
               Browse Devices
            </button>
         </Link>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="mb-16">
         <h1 className="text-5xl font-black text-white outfit tracking-tighter mb-4">
            Technical <span className="text-gradient">Comparison</span>
         </h1>
         <p className="text-[var(--color-text-dim)]">Side-by-side evaluation of the world's leading flagships.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
         {devices.map((device) => (
            <div key={device.id} className="relative group">
               <button 
                  onClick={() => removeDevice(device.id)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/5 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
               >
                  <X size={16} />
               </button>
               
               <div className="glass-dark rounded-3xl p-8 border border-white/5 text-center transition-all group-hover:border-[var(--color-brand)]/30">
                  <div className="aspect-[3/4] mb-8 flex items-center justify-center">
                     <img 
                        src={device.thumbnail} 
                        alt={device.model} 
                        className="h-64 h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" 
                     />
                  </div>
                  <span className="text-[10px] font-black text-[var(--color-brand)] uppercase tracking-widest outfit mb-2 block">{device.brand}</span>
                  <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight">{device.model}</h3>
                  <Link href={`/devices/${device.slug}`}>
                     <button className="text-xs font-bold text-white/40 hover:text-[var(--color-brand)] transition-colors uppercase tracking-widest">
                        Full Specs
                     </button>
                  </Link>
               </div>
            </div>
         ))}
         
         {devices.length < 3 && (
            <Link href="/" className="border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center min-h-[400px] hover:border-[var(--color-brand)]/30 hover:bg-white/[0.02] transition-all group">
               <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Landmark size={24} className="text-white/20" />
               </div>
               <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Add Device</span>
            </Link>
         )}
      </div>

      {/* Simplified Matrix Table for Structure */}
      <div className="space-y-4">
         <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-black text-white outfit tracking-tight">Technical Matrix</h2>
            <div className="h-px flex-grow bg-white/5" />
         </div>
         
         {/* Mapping over some key specs for comparison */}
         {['Display', 'Chipset', 'Camera', 'Battery', 'RAM'].map((specKey) => (
            <div key={specKey} className="grid grid-cols-1 md:grid-cols-3 border-b border-white/5 py-8 group">
               <div className="md:col-span-3 mb-4">
                  <h4 className="text-[10px] font-black text-[var(--color-brand)] uppercase tracking-widest outfit">{specKey}</h4>
               </div>
               {devices.map((d) => {
                  const specVal = (d.specs as any)[specKey.toLowerCase()];
                  return (
                     <div key={d.id} className="text-sm font-medium text-white/80 pr-12">
                        {specVal || 'N/A'}
                     </div>
                  );
               })}
            </div>
         ))}
      </div>
    </div>
  );
}
