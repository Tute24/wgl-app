'use client'

import Link from 'next/link'
import { IoArrowRedoSharp } from 'react-icons/io5'

interface weddingHeaderProps {
  owner: boolean
  weddingTitle: string
  weddingDate: string
  id: number
}
export default function WeddingHeader({
  owner,
  weddingDate,
  weddingTitle,
  id,
}: weddingHeaderProps) {
  return (
    <>
      {owner && (
        <div className="flex flex-row justify-end items-end w-full pr-6 text-[18px]">
          <h2 className="font-bold text-amber-800">
            <Link
              className="flex flex-row gap-2 text-center items-center underline"
              href={`/giftsTable/${id}`}
            >
              View gifted products <IoArrowRedoSharp size={18} />
            </Link>
          </h2>
        </div>
      )}
      <div className="flex flex-col text-center items-center">
        <h1 className="font-bold text-amber-800 text-[32px] pb-3">
          {`${weddingTitle}: `}
          <span className="text-paleGold">{weddingDate}</span>
        </h1>
      </div>
    </>
  )
}
