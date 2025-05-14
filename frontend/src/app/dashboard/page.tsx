import LoggedHeader from '../../components/Headers/LoggedHeader'
import WeddingsOwn from './(components)/weddingsDisplay/OwnWeddings'
import WeddingsGuest from './(components)/weddingsDisplay/GuestWeddings'

export default function Dashboard() {
  return (
    <>
      <LoggedHeader />
      <div className="flex flex-col gap-5 w-full sm:gap-0 sm:flex-row  items-center">
        <div className="flex flex-col items-center w-1/2">
          <h2 className="font-bold flex flex-col items-center text-amber-800">
            My weddings:
          </h2>
          <div className="">
            <WeddingsOwn />
          </div>
        </div>
        <div className="flex flex-col items-center w-1/2">
          <h2 className="font-bold mt-0 text-amber-800 items-center">
            Weddings I'm a guest at:
          </h2>
          <div className="m-auto">
            <WeddingsGuest />
          </div>
        </div>
      </div>
    </>
  )
}
