'use client';

import dynamic from 'next/dynamic';

// We do the dynamic import safely inside this Client Component
const Map = dynamic(() => import('./Map'), { ssr: false });

export default function MapWrapper({ readings }: { readings: any[] }) {
  return <Map readings={readings} />;
}