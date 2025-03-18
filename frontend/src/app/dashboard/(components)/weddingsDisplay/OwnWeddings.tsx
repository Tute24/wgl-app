'use client'

import Link from 'next/link'
import useDeleteWedding from '@/app/dashboard/(hooks)/useDeleteWedding'
import { useContextWrap } from '@/contextAPI/context'
import useGetOwnWeddings from '../../(hooks)/useGetOwnWeddings'

export default function WeddingsOwn() {
  const deleteWedding = useDeleteWedding()
  const { ownWeddingsArray } = useContextWrap()
  useGetOwnWeddings()
  if (ownWeddingsArray.length > 0) {
    return (
      <ul className="flex flex-col text-center items-center">
        {ownWeddingsArray.map((wedding) => (
          <div
            id={`${wedding.id}`}
            key={wedding.id}
            className="p-3 sm:p-5 border-gray-400 w-full sm:w-3/5 flex flex-row"
          >
            <li
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
            <button
              onClick={() => deleteWedding(wedding.id)}
              className="font-semibold text-xs border-solid border-red-200 border-2 rounded-3xl px-2 py-1 mr-2 hover:bg-red-300"
            >
              Delete this wedding
            </button>
          </div>
        ))}
      </ul>
    )
  } else {
    return (
      <h2 className="flex flex-col justify-center items-center font-bold">
        You haven't registered any weddings
      </h2>
    )
  }
}
