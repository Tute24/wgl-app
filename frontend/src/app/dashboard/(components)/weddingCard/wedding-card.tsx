import Link from 'next/link'

export interface WeddingCardProps {
  id: number
  title: string
  date: string
}
export default function WeddingCard({ id, title, date }: WeddingCardProps) {
  return (
    <>
      <li
        key={`${id}`}
        className="flex flex-col px-2 justify-center border-solid bg-softBeige border-2 border-dustyRose shadow-sm shadow-dustyRose rounded-lg hover:shadow-lg hover:shadow-dustyRose "
      >
        <h2 className="font-bold p-2 text-amber-800">{title}</h2>
        <div className="flex flex-col justify-between items-center">
          <p className="text-base"><span className='text-amber-800 font-bold'>Wedding date:</span> <span className='text-mutedTaupe font-bold'>{date}</span></p>
          <div className="flex flex-row items-center gap-3 p-2">
            <Link
              href={`/giftList/${id}`}
              className=" text-xs  text-orangeText hover:underline sm:text-base"
            >
             <span className='text-amber-800 font-bold'>See this wedding's gift list</span>
            </Link>
          </div>
        </div>
      </li>
    </>
  )
}
