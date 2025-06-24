import LoggedHeader from '../../components/Headers/logged-header'
import WeddingsOwn from './(components)/weddingsDisplay/own-weddings'
import WeddingsGuest from './(components)/weddingsDisplay/guest-weddings'

export default function Dashboard() {
  return (
    <>
      <LoggedHeader />
      <div className="grid lg:grid-cols-2 gap-5 lg:gap-20 items-center md:items-start w-full pb-5 md:px-20 xl:px-40">
        <div className="flex flex-col gap-6 items-center">
          <h1 className="font-bold text-amber-800 text-2xl">My Weddings:</h1>
          <WeddingsOwn />
        </div>
        <div className="flex flex-col gap-6 items-center">
          <h1 className="font-bold text-amber-800 text-2xl">
            Weddings I'm a guest at:
          </h1>
          <WeddingsGuest />
        </div>
      </div>
    </>
  )
}
