'use client';

import React from 'react';
import { useCompareStore } from '@/store/useCompareStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CompareTray() {
  const { devices, removeDevice, clear } = useCompareStore();

  if (devices.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-4"
      >
        <div className="glass-dark border border-[var(--color-brand)]/20 shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-3xl p-4 flex items-center justify-between gap-6 overflow-hidden">
           {/* Background Decoration */}
           <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand)]/5 to-transparent pointer-events-none" />
           
           <div className="flex items-center gap-4 relative z-10 overflow-x-auto whitespace-nowrap scrollbar-hide py-1">
              {devices.map((device) => (
                <div key={device.id} className="flex-shrink-0 group relative w-12 h-16 bg-white/5 rounded-xl flex items-center justify-center p-2 border border-white/5 hover:border-[var(--color-brand)] transition-colors">
                   <img src={device.thumbnail} alt={device.model} className="h-full w-auto object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]" />
                   <button 
                      onClick={() => removeDevice(device.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                   >
                      <X size={10} />
                   </button>
                </div>
              ))}
              
              {devices.length < 3 && (
                <div className="w-12 h-16 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center text-white/10 text-[10px] font-bold">
                   +{3 - devices.length}
                </div>
              )}
           </div>

           <div className="flex items-center gap-3 relative z-10 flex-shrink-0">
              <button 
                 onClick={clear}
                 className="text-[10px] uppercase tracking-widest font-black text-white/30 hover:text-white transition-colors"
              >
                 Clear all
              </button>
              <Link href="/compare">
                 <button className="flex items-center gap-2 px-6 py-3 bg-[var(--color-brand)] hover:scale-105 active:scale-95 transition-all text-white rounded-xl text-xs font-black tracking-widest uppercase shadow-lg">
                    Compare <ArrowRight size={14} />
                 </button>
              </Link>
           </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
