import LoggedHeader from '../../../components/Headers/LoggedHeader'

import ConditionalRenderingListPage from './(components)/conditionalRender'

export default function giftsList() {
  return (
    <>
      <div>
        <LoggedHeader />
      </div>
      <ConditionalRenderingListPage/>
    </>
  )
}
