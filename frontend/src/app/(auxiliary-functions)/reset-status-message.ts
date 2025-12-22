'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useGeneralStore } from '@/stores/general/general.provider';

export default function ResetStatusMessage() {
  const pathname = usePathname();
  const setStatusMessage = useGeneralStore((state) => state.setStatusMessage);

  useEffect(() => {
    setStatusMessage('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
