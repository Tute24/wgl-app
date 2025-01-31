'use client'

import GiftListForm from '@/components/Forms/NewList'
import LoggedHeader from '@/components/Headers/LoggedHeader'
import { useContextWrap } from '@/contextAPI/context'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function newList() {
  const { setStatusMessage } = useContextWrap()

  const [listData, setListData] = useState({
    listTitle: '',
    weddingDate: '',
    gifts: [
      {
        productName: '',
        productLink: '',
        quantity: 0,
      },
    ],
  })

  function listInputHandler(event: ChangeEvent<HTMLInputElement>) {
    setListData({
      ...listData,
      [event.target.name]: event.target.value,
    })
  }

  function listGiftInputHandler(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    setListData((prevState) => ({
      ...prevState,
      gifts: prevState.gifts.map((gift, i) =>
        i === index
          ? { ...gift, [event.target.name]: event.target.value }
          : gift
      ),
    }))
  }

  function listSubmitHandler(event: FormEvent) {
    event.preventDefault()

    console.log(listData)
  }

  return (
    <>
      <LoggedHeader />
      <GiftListForm
        listDataType={listData}
        onChange={listInputHandler}
        onSubmit={listSubmitHandler}
        giftsChange={listGiftInputHandler}
        setListData={setListData}
      />
    </>
  )
}
