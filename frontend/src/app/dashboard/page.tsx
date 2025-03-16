import LoggedHeader from '../../components/Headers/LoggedHeader'
import WeddingsOwn from './(components)/weddingsDisplay/OwnWeddings'
import WeddingsGuest from './(components)/weddingsDisplay/GuestWeddings'

export default function Dashboard() {
  return (
    <>
      <div>
        <>
          <LoggedHeader />
          <div className="flex flex-row justify-center">
            <div className="w-1/2">
              <WeddingsOwn />
            </div>
            <div className="w-1/2">
              <WeddingsGuest />
            </div>
          </div>
        </>
      </div>
    </>
  )
}
