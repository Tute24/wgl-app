import Link from 'next/link'
import weddingListProps from '@/types/weddingListProps'

export default function WeddingsOwn({ weddingsArray }: weddingListProps) {
  return (
    <ul className="flex flex-col text-center items-center">
      {weddingsArray.map((wedding) => (
        <div
          id={wedding.id}
          key={wedding.id}
          className="p-3 sm:p-5 border-gray-400 w-full sm:w-3/5"
        >
          <li
            onClick={() => {}}
            key={wedding.id}
            className="flex flex-col justify-center cursor-pointer border-solid border-2 shadow-md rounded-lg hover:shadow-lg hover:bg-gray-100"
          >
            <h2 className="font-bold p-2">{wedding.weddingTitle}</h2>
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center sm:ml-5 sm:mr-5 ">
              <p className="text-xs sm:text-sm">
                Wedding date: {wedding.weddingDate}
              </p>
              <div className="flex flex-row items-center gap-3">
                <Link
                  href={`/giftList/${wedding.id}`}
                  className=" text-xs  text-orangeText hover:underline sm:text-base"
                >
                  See this wedding's gift list
                </Link>
              </div>
            </div>
          </li>
        </div>
      ))}
    </ul>
  )
}
