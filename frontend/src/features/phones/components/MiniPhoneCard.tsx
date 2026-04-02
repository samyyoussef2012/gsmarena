import React from 'react';
import Link from 'next/link';

interface MiniPhoneCardProps {
  slug: string;
  thumbnail: string;
  model: string;
}

export default function MiniPhoneCard({ slug, thumbnail, model }: MiniPhoneCardProps) {
  return (
    <Link href={`/devices/${slug}`} className="block text-center p-2 hover:bg-[#f6f6f6] border border-transparent hover:border-[#e5e5e5] transition-colors mb-4">
      <div className="flex justify-center mb-2">
        <img 
          src={thumbnail} 
          alt={model} 
          className="h-[140px] w-auto object-contain"
          // GSMArena typical minimal image class
        />
      </div>
      <h3 className="text-[#333] text-sm font-bold min-h-[40px]">
        {model}
      </h3>
    </Link>
  );
}
