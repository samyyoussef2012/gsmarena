import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Device } from '@/features/phones/services/phoneService';

interface CompareState {
  devices: Device[];
  addDevice: (device: Device) => void;
  removeDevice: (deviceId: string) => void;
  clear: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set) => ({
      devices: [],
      addDevice: (device) => set((state) => {
        if (state.devices.find((d) => d.id === device.id)) return state;
        if (state.devices.length >= 3) return state; // Limit to 3 for desktop/mobile UX
        return { devices: [...state.devices, device] };
      }),
      removeDevice: (deviceId) => set((state) => ({
        devices: state.devices.filter((d) => d.id !== deviceId)
      })),
      clear: () => set({ devices: [] }),
    }),
    { name: 'compare-storage' }
  )
);
