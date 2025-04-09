'use client'

import { useEffect } from 'react'
import useGetGiftedProducts from './(hooks)/useGetGiftedProducts'
import LoggedHeader from '@/components/Headers/LoggedHeader'

export default function giftTablePage() {
  const giftedProductsArray = useGetGiftedProducts()

  useEffect(() => {
    console.log(giftedProductsArray)
  }, [giftedProductsArray])
  return (
    <>
      <LoggedHeader />
      <div>
        Oi
      </div>
    </>
  )
}
