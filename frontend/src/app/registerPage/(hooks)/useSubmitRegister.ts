import { axiosInstance } from '@/common/axios-api/axios-api'
import { useContextWrap } from '@/contextAPI/context'
import { authStoreInstance } from '@/stores/auth/auth.provider'
import usersDataSchema from '@/zodSchemas/usersDataSchema'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

export default function useSubmitRegister() {
  type usersData = z.infer<typeof usersDataSchema>
  const { setStatusMessage } = useContextWrap()
  const setToken = authStoreInstance.getState().setToken
  const router = useRouter()

  async function submitRegister(data: usersData) {
    if (data.password !== data.confirmPassword) {
      setStatusMessage('Passwords must be the same!')
    } else {
      try {
        const response = await axiosInstance.post('/users/user-create', data)

        if (response.status === 200) {
          const userToken = response.data.token as string
          setToken(userToken)
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
