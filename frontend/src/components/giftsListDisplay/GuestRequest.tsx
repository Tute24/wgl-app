import Link from 'next/link'
import { SetStateAction } from 'react'
interface GuestRequestProps {
  submitRequest: React.MouseEventHandler<HTMLButtonElement>
  setNotGuest: React.Dispatch<SetStateAction<boolean>>
  statusMessage: string
}

export default function GuestRequest({
  submitRequest,
  setNotGuest,
  statusMessage,
}: GuestRequestProps) {
  return (
    <div className="flex flex-col">
      <div className="py-3 flex flex-row justify-center gap-2">
        <Link href="/dashboard">
          <button
            onClick={() => {
              setNotGuest(false)
            }}
            className="font-semibold border-solid border-gray-200 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-gray-200"
          >
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
      <div>
        <span className="font-bold text-xs py-3">{statusMessage}</span>
      </div>
    </div>
  )
}
