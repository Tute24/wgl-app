import axios from 'axios'
import LoggedHeader from '../../components/Headers/LoggedHeader'
import { headers } from 'next/headers'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const route = useRouter()

  async function LogOut() {
    const userToken = JSON.parse(localStorage.getItem('userToken') ?? 'null')

    if (userToken) {
      try {
        const response = await axios.get('http://localhost:3000/logOut', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })

        if (response.status === 200) {
          localStorage.removeItem('userToken')
          route.push('/')
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            console.log('User not authenticated.')
          }
          if (error.response?.status === 403) {
            console.log('Invalid/Expired token.')
          }
          if (error.response?.status === 404) {
            console.log('User not found.')
          }
          if (error.response?.status === 500) {
            console.log('Server error.')
          }
        }
      }
    }
  }
  return (
    <>
      <LoggedHeader onClick={LogOut} />
    </>
  )
}
