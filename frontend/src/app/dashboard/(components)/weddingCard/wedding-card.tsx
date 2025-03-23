import Link from "next/link";

export interface WeddingCardProps {
    id: string
    title: string
    date: string
}
export default function WeddingCard ({id, title, date}: WeddingCardProps){
    <>
    <li
    key={id}
    className="flex flex-col justify-center cursor-pointer border-solid border-2 shadow-md rounded-lg hover:shadow-lg hover:bg-gray-100"
  >
    <h2 className="font-bold p-2">{title}</h2>
    <div className="flex flex-col sm:flex-row justify-between gap-4 items-center sm:ml-5 sm:mr-5 ">
      <p className="text-xs sm:text-sm">
        Wedding date: {date}
      </p>
      <div className="flex flex-row items-center gap-3">
        <Link
          href={`/giftList/${id}`}
          className=" text-xs  text-orangeText hover:underline sm:text-base"
        >
          See this wedding's gift list
        </Link>
      </div>
    </div>
  </li>
  </>
}