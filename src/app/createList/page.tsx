'use client'

import GiftListForm from '@/components/Forms/NewList'
import LoggedHeader from '@/components/Headers/LoggedHeader'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function newList() {
  const [listData, setlistData] = useState({
    listTitle: '',
    weddingDate: '',
    gifts: [
      {
        productName: '',
        productLink: '',
        quantity: 0
      }
    ]
  })

  function listInputHandler(event: ChangeEvent<HTMLInputElement>) {
    setlistData({
      ...listData,
      [event.target.name]: event.target.value,
    })
  }

  function listSubmitHandler(event: FormEvent) {
    event.preventDefault()

    console.log(listData)
  }

  function newProductSet(){
    console.log('ok')
  }

  return (
    <>
    <LoggedHeader/>
    <GiftListForm
    listData={listData}
    onChange={listInputHandler}
    onSubmit={listSubmitHandler}
    newProductInputs={newProductSet}
    />
    </>
  )
}
