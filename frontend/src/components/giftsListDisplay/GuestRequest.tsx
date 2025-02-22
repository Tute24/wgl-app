import Link from 'next/link'
interface GuestRequestProps {
  submitRequest: React.MouseEventHandler<HTMLButtonElement>
}

export default function GuestRequest({ submitRequest }: GuestRequestProps) {
  return (
    <div className="py-3 flex flex-row justify-center gap-2">
      <Link href="/dashboard">
        <button className="font-semibold border-solid border-gray-200 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-gray-200">
          <span className="text-xs">Go back to the dashboard</span>
        </button>
      </Link>
      <button
        onClick={submitRequest}
        className="px-5 py-2 bg-black text-white font-bold rounded-3xl hover:bg-black"
      >
        <span className="text-xs">Request Access to the list</span>
      </button>
    </div>
  )
}
