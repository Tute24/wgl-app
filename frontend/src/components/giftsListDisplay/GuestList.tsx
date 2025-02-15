import Link from 'next/link'
import giftsListProps from '@/types/giftsListProps'

export default function Gifts({ giftsArray }: giftsListProps) {
  return (
    <ul className="flex flex-col text-center items-center">
      {giftsArray.map((gift) => (
        <div
          id = {gift.id.toString()}
          key={gift.id}
          className="p-3 sm:p-5 border-gray-400 w-full sm:w-3/5"
        >
          <li
            onClick={() => {}}
            key={gift.id}
            className="flex flex-col justify-center cursor-pointer border-solid border-2 shadow-md rounded-lg hover:shadow-lg hover:bg-gray-100"
          >
            <h2 className="font-bold p-2">{gift.productName}</h2>
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center sm:ml-5 sm:mr-5 ">
              <p className="text-xs sm:text-sm">
                Quantity: {gift.quantity}
              </p>
              <div className="flex flex-row items-center gap-3">
                <Link
                  href={gift.productLink}
                  className=" text-xs  text-orangeText hover:underline sm:text-base"
                >
                  Check the product's page
                </Link>
              </div>
            </div>
          </li>
        </div>
      ))}
    </ul>
  )
}