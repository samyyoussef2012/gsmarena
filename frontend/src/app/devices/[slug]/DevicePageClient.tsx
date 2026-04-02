'use client';

import React from 'react';
import { Device } from '@/features/phones/services/phoneService';
import { useCompareStore } from '@/store/useCompareStore';
import { ChevronLeft, GitCompare, Share2, Star } from 'lucide-react';
import Link from 'next/link';

interface DevicePageClientProps {
  device: Device;
}

export default function DevicePageClient({ device }: DevicePageClientProps) {
  const { addDevice, devices } = useCompareStore();
  const isAdded = devices.some(d => d.id === device.id);

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <Link href="/" className="flex items-center gap-2 text-[var(--color-text-dim)] hover:text-white transition-colors group">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to listing
        </Link>
        <div className="flex items-center gap-4">
          <button 
             onClick={() => addDevice(device)}
             className={`p-3 rounded-xl transition-all ${isAdded ? 'bg-[var(--color-brand)] text-white' : 'bg-white/5 text-white/50 hover:text-[var(--color-brand)] hover:bg-white/10'}`}
          >
            <GitCompare size={20} />
          </button>
          <button className="p-3 bg-white/5 rounded-xl text-white/50 hover:text-[var(--color-brand)] hover:bg-white/10 transition-all">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div className="relative aspect-square flex items-center justify-center p-12 glass dark group overflow-hidden rounded-[var(--radius-custom-xl)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand)]/10 to-transparent blur-3xl opacity-30" />
          <img 
            src={device.thumbnail} 
            alt={device.model} 
            className="h-full w-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative z-10 group-hover:scale-105 transition-transform duration-700" 
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[var(--color-brand)]/10 border border-[var(--color-brand)]/20 rounded-full text-[var(--color-brand)] text-[10px] font-black uppercase tracking-widest outfit">
              {device.brand}
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" className="opacity-30" />
            </div>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter outfit leading-tight mb-8">
            {device.model}
          </h1>

          <div className="grid grid-cols-2 gap-6 pb-12 border-b border-white/5 mb-12">
            <div>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black outfit mb-1">Status</p>
              <p className="text-sm font-bold text-white">{device.detailedSpecs?.launch.status}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black outfit mb-1">Est. Price</p>
              <p className="text-sm font-bold text-[var(--color-brand-light)]">{device.detailedSpecs?.misc.price}</p>
            </div>
          </div>

          <div className="space-y-4">
            <button 
               onClick={() => addDevice(device)}
               className="w-full py-4 bg-[var(--color-brand)] text-white font-black rounded-2xl shadow-[0_20px_40px_rgba(255,107,0,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all outfit tracking-wider uppercase"
            >
              {isAdded ? 'Already in comparison' : 'Compare this device'}
            </button>
            <button className="w-full py-4 bg-white/5 border border-white/10 text-white/80 font-black rounded-2xl hover:bg-white/10 transition-all outfit tracking-wider uppercase">
              Full Review (2026)
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
