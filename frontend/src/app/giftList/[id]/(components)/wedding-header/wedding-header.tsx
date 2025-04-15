'use client'

import { useContextWrap } from '@/contextAPI/context'
import Link from 'next/link'
import { useEffect } from 'react'
import { IoArrowRedoSharp } from 'react-icons/io5'
import useGetData from '../../(hooks)/useGetData'
interface weddingHeaderProps {
  owner: boolean
}
export default function WeddingHeader({ owner }: weddingHeaderProps) {
  const { weddingData } = useContextWrap()
  return (
    <>
      {owner && (
        <div className="flex flex-row justify-end items-end w-full pr-6 text-[18px]">
          <h2 className="font-bold text-amber-800">
            <Link
              className="flex flex-row gap-2 text-center items-center underline"
              href={`/giftsTable/${weddingData.id}`}
            >
              View gifted products <IoArrowRedoSharp size={18} />
            </Link>
          </h2>
        </div>
      )}
      <div className="flex flex-col text-center items-center">
        <h1 className="font-bold text-amber-800 text-[32px] pb-3">
          {`${weddingData.weddingTitle}: `}
          <span className="text-paleGold">{weddingData.weddingDate}</span>
        </h1>
      </div>
    </>
  )
}
