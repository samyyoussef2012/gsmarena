export interface DetailedSpecs {
  network: { technology: string; bands: string };
  launch: { announced: string; status: string };
  body: { dimensions: string; weight: string; build: string; sim: string };
  display: { type: string; size: string; resolution: string; protection: string };
  platform: { os: string; chipset: string; cpu: string; gpu: string };
  memory: { internal: string; cardSlot: string };
  mainCamera: { triple?: string; quad?: string; features: string; video: string };
  selfieCamera: { single: string; features: string; video: string };
  sound: { loudspeaker: string; jack: string };
  comms: { wlan: string; bluetooth: string; gps: string; nfc: string; radio: string; usb: string };
  features: { sensors: string };
  battery: { type: string; charging: string };
  misc: { colors: string; price: string };
}

export interface Device {
  id: string;
  brand: string;
  model: string;
  slug: string;
  thumbnail: string;
  releaseDate: string;
  specs: {
    display: string;
    camera: string;
    battery: string;
    chipset: string;
    ram: string;
  };
  detailedSpecs?: DetailedSpecs;
}

export const phoneService = {
  getLatest: async (): Promise<Device[]> => {
    // ... same as before but truncated for space if needed, or I'll just keep it
    return [
      {
        id: '1',
        brand: 'Samsung',
        model: 'Galaxy S25 Ultra',
        slug: 'samsung-galaxy-s25-ultra',
        thumbnail: 'https://fdn2.gsmarena.com/videolib/cp-samsung-galaxy-s24-ultra.jpg',
        releaseDate: 'Mar 2026',
        specs: {
          display: '6.8" 144Hz AMOLED',
          camera: '200MP Quad-Cam',
          battery: '5500mAh 65W',
          chipset: 'Snapdragon 9 Gen 4',
          ram: '16GB LPDDR6'
        }
      },
      {
        id: '2',
        brand: 'Apple',
        model: 'iPhone 17 Pro Max',
        slug: 'apple-iphone-17-pro-max',
        thumbnail: 'https://fdn2.gsmarena.com/videolib/cp-apple-iphone-15-pro-max.jpg',
        releaseDate: 'Sep 2025',
        specs: {
          display: '6.9" ProMotion OLED',
          camera: '48MP Pro System',
          battery: '4800mAh 30W',
          chipset: 'A19 Bionic Pro',
          ram: '12GB G6'
        }
      },
    ];
  },

  getBySlug: async (slug: string): Promise<Device | null> => {
    // Mock detailed data
    const devices: Record<string, Device> = {
      'samsung-galaxy-s25-ultra': {
        id: '1',
        brand: 'Samsung',
        model: 'Galaxy S25 Ultra',
        slug: 'samsung-galaxy-s25-ultra',
        thumbnail: 'https://fdn2.gsmarena.com/videolib/cp-samsung-galaxy-s24-ultra.jpg',
        releaseDate: 'Mar 2026',
        specs: {
          display: '6.8" 144Hz AMOLED',
          camera: '200MP Quad-Cam',
          battery: '5500mAh 65W',
          chipset: 'Snapdragon 9 Gen 4',
          ram: '16GB LPDDR6'
        },
        detailedSpecs: {
          network: { technology: 'GSM / HSPA / LTE / 5G', bands: '5G' },
          launch: { announced: '2026, January', status: 'Available. Released 2026, February' },
          body: { dimensions: '162.3 x 79 x 8.6 mm', weight: '232 g', build: 'Glass front, Glass back, Titanium frame', sim: 'Nano-SIM and eSIM' },
          display: { type: 'Dynamic LTPO AMOLED 2X, 144Hz, HDR10+, 3000 nits', size: '6.8 inches', resolution: '1440 x 3120 pixels', protection: 'Corning Gorilla Armor' },
          platform: { os: 'Android 16, One UI 8', chipset: 'Snapdragon 9 Gen 4', cpu: 'Octa-core (1x4.3 GHz Oryon & 3x3.2 GHz & 4x2.4 GHz)', gpu: 'Adreno 850' },
          memory: { internal: '256GB 12GB RAM, 512GB 16GB RAM, 1TB 16GB RAM', cardSlot: 'No' },
          mainCamera: { quad: '200 MP (wide), 50 MP (periscope telephoto), 10 MP (telephoto), 12 MP (ultrawide)', features: 'LED flash, auto-HDR, panorama', video: '8K@24/30fps, 4K@30/60/120fps' },
          selfieCamera: { single: '12 MP (wide)', features: 'Dual Pixel PDAF', video: '4K@30/60fps' },
          sound: { loudspeaker: 'Yes, with stereo speakers', jack: 'No' },
          comms: { wlan: 'Wi-Fi 7', bluetooth: '5.4', gps: 'GPS, GLONASS, BDS, GALILEO', nfc: 'Yes', radio: 'No', usb: 'USB Type-C 3.2' },
          features: { sensors: 'Fingerprint (under display, ultrasonic), accelerometer, gyro, proximity, compass, barometer' },
          battery: { type: 'Li-Ion 5500 mAh, non-removable', charging: '65W wired, 25W wireless' },
          misc: { colors: 'Titanium Black, Titanium Gray, Titanium Violet', price: '$1,299.99' }
        }
      }
    };

    if (devices[slug]) {
      return devices[slug];
    }

    // Generate a generic mock device with full detailedSpecs so every link works
    const brandMatch = slug.split('-')[0];
    const brandName = brandMatch.charAt(0).toUpperCase() + brandMatch.slice(1);
    const modelName = slug.split('-').slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return {
      id: `mock-${slug}`,
      brand: brandName,
      model: modelName,
      slug: slug,
      thumbnail: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg',
      releaseDate: 'Coming soon',
      specs: {
        display: '6.7"',
        camera: '50MP',
        battery: '5000mAh',
        chipset: 'Octa-core',
        ram: '8GB'
      },
      detailedSpecs: {
        network: { technology: 'GSM / HSPA / LTE / 5G', bands: '5G Supported' },
        launch: { announced: '2025, Q4', status: 'Available. Released 2026' },
        body: { dimensions: '160.0 x 75.0 x 8.0 mm', weight: '195 g', build: 'Glass front, plastic frame, glass back', sim: 'Dual SIM' },
        display: { type: 'AMOLED, 120Hz', size: '6.7 inches', resolution: '1080 x 2400 pixels', protection: 'Corning Gorilla Glass' },
        platform: { os: 'Android 15', chipset: 'Octa-core Processor', cpu: 'Octa-core', gpu: 'Mali-G715' },
        memory: { internal: '256GB 8GB RAM', cardSlot: 'microSDXC' },
        mainCamera: { triple: '50 MP (wide) + 8 MP (ultrawide) + 2 MP (macro)', features: 'LED flash, HDR, panorama', video: '4K@30fps' },
        selfieCamera: { single: '32 MP (wide)', features: 'HDR', video: '1080p@30fps' },
        sound: { loudspeaker: 'Yes, with stereo speakers', jack: 'No' },
        comms: { wlan: 'Wi-Fi 802.11 a/b/g/n/ac/6', bluetooth: '5.3', gps: 'GPS', nfc: 'Yes', radio: 'No', usb: 'USB Type-C 2.0' },
        features: { sensors: 'Fingerprint (under display, optical), accelerometer, gyro, compass' },
        battery: { type: 'Li-Po 5000 mAh, non-removable', charging: '33W wired' },
        misc: { colors: 'Phantom Black, Glacier White, Mint Green', price: 'About $400' }
      }
    };
  },
  getByBrand: async (brandName: string): Promise<Device[]> => {
    // Generate some mock phones for the grid view
    const mockPhones: Device[] = Array.from({ length: 24 }).map((_, i) => ({
      id: `brand-phone-${i}`,
      brand: brandName.charAt(0).toUpperCase() + brandName.slice(1),
      model: `${brandName.charAt(0).toUpperCase() + brandName.slice(1)} Galaxy Model ${i + 1}`,
      slug: `${brandName.toLowerCase()}-galaxy-model-${i + 1}`,
      thumbnail: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg',
      releaseDate: '2025',
      specs: {
        display: '6.6"',
        camera: '50MP',
        battery: '5000mAh',
        chipset: 'Exynos',
        ram: '8GB'
      }
    }));
    return mockPhones;
  },

  getBrands: async () => {
    return [
      { name: 'Apple', count: 124 },
      { name: 'Samsung', count: 542 },
      { name: 'Google', count: 48 },
      { name: 'Xiaomi', count: 322 },
      { name: 'Oppo', count: 215 },
      { name: 'Vivo', count: 198 },
      { name: 'Realme', count: 145 },
      { name: 'Motorola', count: 187 },
      { name: 'Sony', count: 98 },
      { name: 'Asus', count: 45 },
      { name: 'OnePlus', count: 87 },
    ];
  }
};
