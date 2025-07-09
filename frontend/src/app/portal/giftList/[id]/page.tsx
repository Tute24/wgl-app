import LoggedHeader from '../../../components/Headers/logged-header'

import ConditionalRenderingListPage from './(components)/conditionalRender/conditionalRender'

export default function giftsList() {
  return (
    <>
      <div>
        <LoggedHeader />
      </div>
      <ConditionalRenderingListPage />
    </>
  )
}
