import LoggedHeader from '@/components/Headers/logged-header'
import TableSet from './(components)/table-set'

export default function giftTablePage() {
  return (
    <>
      <LoggedHeader />
      <div className="flex flex-col items-center">
        <div className="flex flex-col justify-center text-center gap-3 font-inter">
          <h2 className="text-xl text-amber-800 font-bold">
            Gifted Products table
          </h2>
          <p className="text-center text-stone-500 font-medium">
            Here, you can see the guests who have gifted the products on your
            gift list.
          </p>
        </div>
        <TableSet />
      </div>
    </>
  )
}
