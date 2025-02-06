'use client'

import axios from 'axios'
import GiftListForm from '../../components/Forms/NewList'
import LoggedHeader from '../../components/Headers/LoggedHeader'
import { useContextWrap } from '../../contextAPI/context'
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

  async function listSubmitHandler(event: FormEvent) {
    event.preventDefault()
    const userToken = JSON.parse(localStorage.getItem('userToken') ?? 'null')

    if (userToken) {
      console.log(listData)
      try {
        const response = await axios.post(
          'http://localhost:3000/createList',
          listData,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )

        if(response.status === 200){
          setStatusMessage('List successfully created!')
        }
      } catch (error) {}
    }
  }

  async function LogOut() {}

  return (
    <>
      <LoggedHeader onClick={LogOut} />
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
