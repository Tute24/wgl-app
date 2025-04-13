import axios from 'axios'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import { SetStateAction } from 'react'

export interface AxiosErrorHandlerProps {
  error: unknown
  notGuest?: boolean
  setNotGuest?: React.Dispatch<SetStateAction<boolean>>
  setStatusMessage?: React.Dispatch<SetStateAction<string>>
  route: AppRouterInstance
}
export default function AxiosErrorHandler({
  error,
  notGuest,
  setNotGuest,
  setStatusMessage,
  route
}: AxiosErrorHandlerProps) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      console.log('User not authenticated.')
    }
    if (error.response?.status === 403) {
      console.log('Invalid/Expired token.')
      if (setNotGuest!== undefined && !notGuest) {
        setNotGuest(true)
      }
    }
    if (error.response?.status === 404) {
      console.log('User not found.')
      route.push('/404-page')
    }
    if (error.response?.status === 500) {
      console.log('Server error.')
    }
  }
}
