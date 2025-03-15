'use client'

import { useContextWrap } from '@/contextAPI/context'
import useGiftPresent from '@/functions/giftPresentFunction'
import Link from 'next/link'
import { useState } from 'react'

export default function GuestList() {
  const { giftsArray } = useContextWrap()

  const [isGiftingSetup, setIsGiftingSetup] = useState<boolean>(false)

  const [quantity, setQuantity] = useState<string>('')

  return (
    <ul className="flex flex-col text-center items-center">
      {giftsArray.map((gift) => (
        <div
          id={gift.id.toString()}
          key={gift.id}
          className="p-3 sm:p-5 border-gray-400 w-full sm:w-3/5"
        >
          <li
            key={gift.id}
            className="flex flex-col justify-center cursor-pointer border-solid border-2 shadow-md rounded-lg hover:shadow-lg hover:bg-gray-100"
          >
            <h2 className="font-bold p-2">{gift.productName}</h2>
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center sm:ml-5 sm:mr-5 ">
              <p className="text-xs sm:text-sm">Quantity: {gift.quantity}</p>
              <div className="flex flex-row items-center gap-3">
                <Link
                  href={
                    gift.productLink.startsWith('http')
                      ? gift.productLink
                      : `https://${gift.productLink}`
                  }
                  target="_blank"
                  className=" text-xs  text-orangeText hover:underline sm:text-base"
                >
                  Check the product's page
                </Link>
              </div>
            </div>
            <div className="flex flex-row">
              {!isGiftingSetup && (
                <button
                  onClick={() => {
                    setIsGiftingSetup(true)
                  }}
                  className=" font-semibold border-solid border-gray-200 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-gray-200"
                >
                  Mark this item as gifted
                </button>
              )}
              {isGiftingSetup && (
                <>
                  <button
                    onClick={() => {
                      setIsGiftingSetup(false)
                    }}
                    className="font-semibold border-solid border-red-200 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-red-300"
                  >
                    Cancel
                  </button>
                  <label htmlFor={`quantityGifted-${gift.id}`}>
                    How many of this product you'll be gifting?
                  </label>
                  <input
                    type="number"
                    max={gift.quantity}
                    min="0"
                    id={`quantityGifted-${gift.id}`}
                    onChange={(e) => setQuantity(e.target.value)}
                    name="quantity"
                    value={quantity}
                  />
                  <button
                    onClick={useGiftPresent(gift.id, quantity)}
                    className="font-semibold border-solid border-green-200 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-green-300"
                  >
                    Confirm
                  </button>
                </>
              )}
            </div>
          </li>
        </div>
      ))}
    </ul>
  )
}
