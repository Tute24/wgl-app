import LoggedHeader from '../../components/Headers/LoggedHeader'
import WeddingsOwn from './(components)/weddingsDisplay/OwnWeddings'
import WeddingsGuest from './(components)/weddingsDisplay/GuestWeddings'

export default function Dashboard() {
  return (
    <>
      <LoggedHeader />
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-center items-center w-1/2">
          <h2 className="font-bold flex flex-col items-center">My weddings:</h2>
          <div className="m-auto">
            <WeddingsOwn />
          </div>
        </div>
        <div className="flex flex-col items-center w-1/2">
          <h2 className="font-bold mt-0">Weddings I'm a guest at:</h2>
          <div className="m-auto">
            <WeddingsGuest />
          </div>
        </div>
      </div>
    </>
  )
}
