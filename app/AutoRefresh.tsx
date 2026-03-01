'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AutoRefresh({ interval = 3000 }: { interval?: number }) {
  const router = useRouter();

  useEffect(() => {
    // This tells Next.js to re-fetch the server data every 3 seconds
    const intervalId = setInterval(() => {
      router.refresh();
    }, interval);

    return () => clearInterval(intervalId);
  }, [router, interval]);

  return null; // This component is invisible!
}