import Link from 'next/link'
import { IoTrashOutline, IoArrowRedoSharp } from 'react-icons/io5'

import useDeleteWedding from '../../(hooks)/useDeleteWedding'
export interface WeddingCardProps {
  id: number
  title: string
  date: string
  isOwn: boolean
}
export default function WeddingCard({
  id,
  title,
  date,
  isOwn,
}: WeddingCardProps) {
  const deleteWedding = useDeleteWedding()
  const trashIcon = <IoTrashOutline />
  const arrowIcon = <IoArrowRedoSharp />
  return (
    <>
      <li
        key={`${id}`}
        className="flex flex-col px-2 w-full justify-center border-solid bg-softBeige border-2 border-dustyRose shadow-sm shadow-dustyRose rounded-lg hover:shadow-lg hover:shadow-dustyRose "
      >
        <div className="flex flex-col justify-between">
          {isOwn && (
            <div className="flex justify-end mt-1 -mb-1">
              <button onClick={() => deleteWedding(id)}>
                <span className="text-red-500">{trashIcon}</span>
              </button>
            </div>
          )}
          <h2 className="font-bold p-2 text-amber-800">{title}</h2>
        </div>
        <div className="flex flex-col justify-between items-center">
          <p className="text-base">
            <span className="text-amber-800 font-bold">Wedding date:</span>{' '}
            <span className="text-mutedTaupe font-bold">{date}</span>
          </p>
          <div className="flex flex-row items-center gap-2 p-2 hover:underline">
            <Link
              href={`/giftList/${id}`}
              className="text-orangeText  text-base"
            >
              <span className="text-amber-800 font-bold flex flex-row gap-2 items-center">
                See this wedding's gift list {arrowIcon}
              </span>
            </Link>
          </div>
        </div>
      </li>
    </>
  )
}
