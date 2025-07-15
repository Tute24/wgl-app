/* eslint-disable @typescript-eslint/no-explicit-any */
import { authStoreInstance } from '@/stores/auth/auth.provider'
import axios from 'axios'

export interface AxiosApiProps {
  httpMethod: 'get' | 'post'
  data?: Record<string, any>
  params?: Record<string, any>
  route: string
}

const apiURL = process.env.NEXT_PUBLIC_API_URL
export const axiosInstance = axios.create({
  baseURL: apiURL,
  timeout: 2000,
})

export function AxiosApi({ httpMethod, data, params, route }: AxiosApiProps) {
  const token = authStoreInstance.getState().token
  return axiosInstance.request({
    method: httpMethod,
    data,
    params,
    url: route,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
