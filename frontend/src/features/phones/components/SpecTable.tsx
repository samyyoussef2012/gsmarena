import React from 'react';
import { DetailedSpecs } from '../services/phoneService';

interface SpecTableProps {
  specs: DetailedSpecs;
}

export default function SpecTable({ specs }: SpecTableProps) {
  const categories = [
    { label: 'Network', data: specs.network },
    { label: 'Launch', data: specs.launch },
    { label: 'Body', data: specs.body },
    { label: 'Display', data: specs.display },
    { label: 'Platform', data: specs.platform },
    { label: 'Memory', data: specs.memory },
    { label: 'Main Camera', data: specs.mainCamera },
    { label: 'Selfie Camera', data: specs.selfieCamera },
    { label: 'Sound', data: specs.sound },
    { label: 'Comms', data: specs.comms },
    { label: 'Features', data: specs.features },
    { label: 'Battery', data: specs.battery },
    { label: 'Misc', data: specs.misc },
  ];

  return (
    <div className="bg-white">
      {categories.map((cat) => (
        <table key={cat.label} className="gsm-table">
          <tbody>
            {Object.entries(cat.data).map(([key, value], index) => (
              <tr key={key}>
                {index === 0 ? (
                  <th rowSpan={Object.keys(cat.data).length} className="text-[#d21f29] font-bold uppercase text-[12px] bg-white text-left align-top pt-2 pr-4 border-b border-[#e5e5e5] border-r-0 border-l-0 border-t-0 p-0 m-0 w-[100px]">
                     {cat.label}
                  </th>
                ) : null}
                <td className="w-1/4 text-xs text-[#555] font-bold border border-[#e5e5e5] border-l-0 border-t-0 p-2 align-top">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </td>
                <td className="w-3/4 text-[13px] text-[#333] border border-[#e5e5e5] border-r-0 border-t-0 p-2 align-top bg-white">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}
