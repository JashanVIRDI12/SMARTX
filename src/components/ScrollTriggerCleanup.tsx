'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollTriggerCleanup() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
      ScrollTrigger.clearScrollMemory();
    };
  }, [pathname]);

  return null;
}
