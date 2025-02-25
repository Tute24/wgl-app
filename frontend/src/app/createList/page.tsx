'use client'

import GiftListForm from '../../components/Forms/NewList'
import LoggedHeader from '../../components/Headers/LoggedHeader'
import { useContextWrap } from '../../contextAPI/context'
import { ChangeEvent } from 'react'
import checkAuth from '@/functions/checkAuthFunction'
import useLogOut from '@/functions/logOutFunction'
import useSubmitList from '@/functions/useSubmitList'

export default function newList() {
  const { statusMessage, setNotGuest, listData, setListData } = useContextWrap()

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

  checkAuth()

  const submitList = useSubmitList()

  const logOut = useLogOut()

  return (
    <>
      <LoggedHeader onClick={logOut} setNotGuest={setNotGuest} />
      <GiftListForm
        listDataType={listData}
        onChange={listInputHandler}
        onSubmit={submitList}
        giftsChange={listGiftInputHandler}
        setListData={setListData}
        statusMessage={statusMessage}
      />
    </>
  )
}
