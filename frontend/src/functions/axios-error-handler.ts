import weddingHeaderInfoProps from '@/types-props/weddingHeaderInfo'
import axios from 'axios'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { SetStateAction } from 'react'

export interface AxiosErrorHandlerProps {
  error: unknown
  notGuest?: boolean
  setNotGuest?: React.Dispatch<SetStateAction<boolean>>
  setStatusMessage?: React.Dispatch<SetStateAction<string>>
  setWeddingHeaderInfo?: React.Dispatch<SetStateAction<weddingHeaderInfoProps>>
  route?: AppRouterInstance
}
export default function AxiosErrorHandler({
  error,
  notGuest,
  setNotGuest,
  setStatusMessage,
  route,
  setWeddingHeaderInfo,
}: AxiosErrorHandlerProps) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      console.log('User not authenticated.')
      if (setStatusMessage !== undefined) {
        setStatusMessage(`Not signed in.`)
      }
      route?.push('/401-page')
    }
    if (error.response?.status === 403) {
      console.log('User is not authorized.')
      if (setNotGuest !== undefined && !notGuest && setWeddingHeaderInfo) {
        setNotGuest(true)
        setWeddingHeaderInfo(error.response.data.weddingInfo)
      }
      if (setStatusMessage !== undefined) {
        setStatusMessage(`You're not authorized to access this page.`)
      }
      if (setNotGuest === undefined && setStatusMessage === undefined) {
        if (route) {
          route?.push('/403-page')
        }
      }
    }
    if (error.response?.status === 404) {
      console.log('User or page not found.')
      if (route) {
        route?.push('/404-page')
      }
    }
    if (error.response?.status === 500) {
      console.log('Server error.')
      if (setStatusMessage !== undefined) {
        setStatusMessage(`Something went wrong. Try again.`)
      }
    }
  }
}
