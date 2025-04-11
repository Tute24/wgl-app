'use client'
import { useContextWrap } from '@/contextAPI/context'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export type giftedProductsType = {
    id: number
    presenter: string
    relatedWeddingTitle: string
    relatedWeddingDate: string
    quantityGifted: number
    gift: string
    giftLink: string
    giftedAt: string
}

export default function useGetGiftedProducts() {
  const { id } = useParams()
  const weddingId = Number(id)
  const { userToken } = useContextWrap()
  const [giftedProducts, setGiftedProducts] = useState<giftedProductsType[]>([])

  useEffect(() => {
    if (!userToken) return

    async function getGiftedProducts() {
      try {
        const response = await axios.get('http://localhost:3000/getGiftedProducts', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          params: {
            id: weddingId,
          },
        })

        if(response.status === 200){
            setGiftedProducts(response.data.giftedGifts) 
        }
      } catch (error) {
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
    getGiftedProducts()
  }, [userToken])
  return giftedProducts
}
