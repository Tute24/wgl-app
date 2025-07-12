'use client'
import { AxiosApi } from '@/common/axios-api/axios-api'
import AxiosErrorHandler from '@/functions/axios-error-handler'
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
  const [giftedProducts, setGiftedProducts] = useState<giftedProductsType[]>([])
  const route = useRouter()

  useEffect(() => {
    async function getGiftedProducts() {
      try {
        const response = await AxiosApi({
          httpMethod: 'get',
          route: '/gifts/gifted-products',
          params: {
            id: weddingId,
          },
        })

        if (response.status === 200) {
          setGiftedProducts(response.data.giftedProducts)
        }
      } catch (error) {
        AxiosErrorHandler({ error, route })
      }
    }
    getGiftedProducts()
  }, [])
  return giftedProducts
}
