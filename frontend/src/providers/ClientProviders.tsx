'use client'

import dynamic from 'next/dynamic'
import { GeneralStoreProvider } from '@/stores/general/general.provider'

const ResetStatusMessage = dynamic(
  () => import('@/app/(auxiliary-functions)/reset-status-message'),
  { ssr: false },
)

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <GeneralStoreProvider>
      <ResetStatusMessage />
      {children}
    </GeneralStoreProvider>
  )
}
