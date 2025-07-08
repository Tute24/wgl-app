import { useContextWrap } from '@/contextAPI/context'
import usersDataSchema from '@/zodSchemas/usersDataSchema'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

export default function useSubmitRegister() {
  type usersData = z.infer<typeof usersDataSchema>
  const { setStatusMessage } = useContextWrap()
  const router = useRouter()
  const apiURL = process.env.NEXT_PUBLIC_API_URL

  async function submitRegister(data: usersData) {
    if (data.password !== data.confirmPassword) {
      setStatusMessage('Passwords must be the same!')
    } else {
      try {
        const response = await axios.post(`${apiURL}/users/user-create`, data)

        if (response.status === 200) {
          const userToken = response.data.token
          localStorage.setItem('userToken', JSON.stringify(userToken))
          router.push('/dashboard')
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            setStatusMessage(
              'There is already an existent user with this e-mail!',
            )
          }
          if (error.response?.status === 500) {
            setStatusMessage(
              'Something went wrong within the server. Try again soon.',
            )
          }
          console.log(error)
        }
        console.log(error)
      }
    }
  }

  return submitRegister
}
