import { useContextWrap } from '@/contextAPI/context'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export default function useSignIn() {
  const { setStatusMessage } = useContextWrap()
  const router = useRouter()
  async function loginSubmitHandler(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:3000/logIn',
        usersSign
      )
      if (response.status === 200) {
        const userToken = response.data.token
        localStorage.setItem('userToken', JSON.stringify(userToken))
        router.push('/dashboard')
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setStatusMessage(`This email doesn't belong to an existent user`)
        }
        if (error.response?.status === 403) {
          setStatusMessage('Incorrect password.')
        }
        if (error.response?.status === 500) {
          setStatusMessage('Something went wrong. Try again!')
        }
      }
      console.log(error)
    }
  }

  return loginSubmitHandler
}
