import axios from 'axios'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export interface AxiosErrorHandlerProps {
  error: unknown
  setStatusMessage?: (statusMessage: string) => void
  route?: AppRouterInstance
}
export default function AxiosErrorHandler({
  error,
  setStatusMessage,
  route,
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

      if (route) {
        route?.push('/portal/403-page')
      }
    }
    if (error.response?.status === 404) {
      console.log('User or page not found.')
      if (route) {
        route?.push('/portal/404-page')
      }
    }
    if (error.response?.status === 409) {
      console.log('Conflict')
      if (setStatusMessage)
        setStatusMessage(
          'You submitted a gift with a name that already exists.',
        )
    }
    if (error.response?.status === 500) {
      console.log('Server error.')
      if (setStatusMessage !== undefined) {
        setStatusMessage(`Something went wrong. Try again.`)
      }
    }
  }
}
