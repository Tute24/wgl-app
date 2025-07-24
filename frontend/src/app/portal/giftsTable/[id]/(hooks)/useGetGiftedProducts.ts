'use client'
import { AxiosApi } from '@/common/axios-api/axios-api'
import AxiosErrorHandler from '@/functions/axios-error-handler'
import { useGiftsStore } from '@/stores/gifts/gifts.provider'
import { GiftedProductsProps } from '@/stores/gifts/gifts.store'
import { useParams, useRouter } from 'next/navigation'
import { useShallow } from 'zustand/shallow'

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
  const route = useRouter()
  const { setGiftedProducts } = useGiftsStore(
    useShallow((store) => ({
      setGiftedProducts: store.setGiftedProducts,
    })),
  )

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
        setGiftedProducts(response.data.giftedProducts as GiftedProductsProps[])
      }
    } catch (error) {
      AxiosErrorHandler({ error, route })
    }
  }
  return getGiftedProducts
}
