import GiftListForm from './(components)/NewListForm/NewList'
import LoggedHeader from '../../components/Headers/logged-header'

export default function newList() {
  return (
    <>
      <LoggedHeader />
      <GiftListForm />
    </>
  )
}
