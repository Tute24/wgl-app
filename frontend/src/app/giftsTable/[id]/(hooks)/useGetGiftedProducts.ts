'use client'
import { useContextWrap } from '@/contextAPI/context'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
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
  const route = useRouter()

  useEffect(() => {
    if (!userToken) return

    async function getGiftedProducts() {
      try {
        const response = await axios.get(
          'http://localhost:3000/getGiftedProducts',
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
            params: {
              id: weddingId,
            },
          }
        )

        if (response.status === 200) {
          setGiftedProducts(response.data.giftedGifts)
        }
      } catch (error) {
        AxiosErrorHandler({ error, route })
      }
    }
    getGiftedProducts()
  }, [userToken])
  return giftedProducts
}
