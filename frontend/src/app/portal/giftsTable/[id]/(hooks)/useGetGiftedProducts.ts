'use client'
import { AxiosApi } from '@/common/axios-api/axios-api'
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler'
import { useGiftsStore } from '@/stores/gifts/gifts.provider'
import {
  GiftedProductsProps,
  listHeaderProps,
} from '@/stores/gifts/gifts.store'
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
  const { setGiftedProducts, setListHeader } = useGiftsStore(
    useShallow((store) => ({
      setGiftedProducts: store.setGiftedProducts,
      setListHeader: store.setListHeader,
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
        setListHeader(
          response.data.giftedProducts.listHeader as listHeaderProps,
        )
        setGiftedProducts(
          response.data.giftedProducts
            .mappingAddGifter as GiftedProductsProps[],
        )
      }
    } catch (error) {
      AxiosErrorHandler({ error, route })
    }
  }
  return getGiftedProducts
}
