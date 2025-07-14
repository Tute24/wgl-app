'use client'

import LoggedHeader from '@/components/Headers/logged-header'
import { useAuthStore } from '@/stores/auth/auth.provider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ClipLoader } from 'react-spinners'
import { useShallow } from 'zustand/shallow'

export function AuthWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter()
  const { hasHydrated, token } = useAuthStore(
    useShallow((store) => ({
      hasHydrated: store.hasHydrated,
      token: store.token,
    })),
  )
  useEffect(() => {
    if (hasHydrated && !token) {
      router.replace('/401-page')
    }
  }, [hasHydrated, token, router])

  if (!hasHydrated)
    return (
      <div className="flex flex-col m-auto h-screen justify-center items-center">
        <ClipLoader color="#92400e" size={150} />
      </div>
    )
  if (!token)
    return (
      <div className="flex flex-col m-auto h-screen justify-center items-center">
        <ClipLoader color="#92400e" size={150} />
      </div>
    )
  return (
    <>
      <LoggedHeader /> <main>{children}</main>
    </>
  )
}
