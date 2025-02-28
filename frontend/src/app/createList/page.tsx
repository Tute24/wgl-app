'use client'

import GiftListForm from '../../components/Forms/NewList'
import LoggedHeader from '../../components/Headers/LoggedHeader'
import { useContextWrap } from '../../contextAPI/context'
import checkAuth from '@/functions/checkAuthFunction'
import useLogOut from '@/functions/logOutFunction'

export default function newList() {
  const { statusMessage, setNotGuest} = useContextWrap()

  checkAuth()
  const logOut = useLogOut()

  return (
    <>
      <LoggedHeader onClick={logOut} setNotGuest={setNotGuest} />
      <GiftListForm
        statusMessage={statusMessage}
      />
    </>
  )
}
