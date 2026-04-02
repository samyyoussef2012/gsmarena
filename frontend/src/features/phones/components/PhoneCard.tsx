'use client';

import React from 'react';
import { Device } from '../services/phoneService';
import { motion } from 'framer-motion';
import { Calendar, Monitor, Camera, Cpu, GitCompare, Plus } from 'lucide-react';
import Link from 'next/link';
import { useCompareStore } from '@/store/useCompareStore';

interface PhoneCardProps {
  device: Device;
}

export default function PhoneCard({ device }: PhoneCardProps) {
  const { addDevice, devices } = useCompareStore();
  const isAdded = devices.some(d => d.id === device.id);

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="glass-dark card-hover overflow-hidden rounded-[var(--radius-custom-xl)] p-5 border border-white/5 group"
    >
      <div className="relative aspect-[3/4] rounded-lg bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center p-6 mb-6 overflow-hidden">
        {/* Subtle glow behind device */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent blur-3xl opacity-50" />
        
        <img 
          src={device.thumbnail} 
          alt={device.model} 
          className="h-full w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110"
        />

        {/* Compare Button on-hover */}
        <button 
           onClick={(e) => {
              e.preventDefault();
              addDevice(device);
           }}
           className="absolute top-4 right-4 z-20 w-10 h-10 bg-[var(--color-brand)] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:scale-110 active:scale-95"
           title="Add to Compare"
        >
           {isAdded ? <GitCompare size={18} /> : <Plus size={18} />}
        </button>
      </div>

      <Link href={`/devices/${device.slug}`}>
        <div className="space-y-4">
          <div>
            <span className="text-[var(--color-brand)] text-xs font-bold uppercase tracking-wider outfit mb-1 block">
              {device.brand}
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-[var(--color-brand)] transition-colors">
              {device.model}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-[var(--color-text-dim)] pt-2 border-t border-white/5">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="opacity-50 text-[var(--color-brand)]" />
              <span>{device.releaseDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor size={14} className="opacity-50 text-[var(--color-brand)]" />
              <span>{device.specs.display.split(' ')[0]}</span>
            </div>
             <div className="flex items-center gap-2">
              <Camera size={14} className="opacity-50 text-[var(--color-brand)]" />
              <span>{device.specs.camera.split(' ')[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu size={14} className="opacity-50 text-[var(--color-brand)]" />
              <span>{device.specs.chipset.split(' ')[0]}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
