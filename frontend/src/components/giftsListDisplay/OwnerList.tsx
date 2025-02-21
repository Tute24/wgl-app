import giftsListProps from '@/types/giftsListProps'
import giftsProps from '@/types/giftsProps'
import Link from 'next/link'
import { ButtonHTMLAttributes, ChangeEvent, ReactHTMLElement, SetStateAction, useState } from 'react'

interface HandleGiftingProps {
  giftsArray: giftsProps[]
  updateProps: {
    giftID: number
    productName: string
    quantity: number
    productLink: string
  }
  selectedGiftID: number
  setSelectedGiftID: (value: number) => void
  setUpdateProps: React.Dispatch<
    SetStateAction<{
      giftID: number
      productName: string
      quantity: number
      productLink: string
    }>
  >
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  submitChange: React.MouseEventHandler<HTMLButtonElement>
  toUpdate:boolean
  setToUpdate: React.Dispatch<
  SetStateAction<boolean>
>
  deleteGift:(value:number) => void
}

export default function OwnerList({
  giftsArray,
  updateProps,
  setUpdateProps,
  onChange,
  selectedGiftID,
  setSelectedGiftID,
  submitChange,
  toUpdate,
  setToUpdate,
  deleteGift
}: HandleGiftingProps) {
  

  // const [updateProps, setUpdateProps] = useState({
  //   giftID: 0,
  //   productName: '',
  //   quantity: 0,
  //   productLink: '',
  // })

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
            {!toUpdate && (
              <>
                <h2 className="font-bold p-2">{gift.productName}</h2>
                <div className="flex flex-col sm:flex-row justify-between gap-4 items-center sm:ml-5 sm:mr-5 ">
                  <p className="text-xs sm:text-sm">
                    Quantity: {gift.quantity}
                  </p>
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
                  <button
                    onClick={() => {
                      setUpdateProps({
                        giftID: gift.id,
                        productName: gift.productName,
                        quantity: gift.quantity,
                        productLink: gift.productLink,
                      })
                      setSelectedGiftID(gift.id)
                      setToUpdate(true)
                    }}
                    className="font-semibold border-solid border-gray-200 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-gray-200"
                  >
                    Update Item
                  </button>
                  <button onClick={()=>{
                    deleteGift(gift.id)
                  }} className="font-semibold border-solid border-red-300 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-red-400">
                    Remove Item
                  </button>
                </div>
              </>
            )}
            {toUpdate && gift.id !== selectedGiftID && (
              <>
                <h2 className="font-bold p-2">{gift.productName}</h2>
                <div className="flex flex-col sm:flex-row justify-between gap-4 items-center sm:ml-5 sm:mr-5 ">
                  <p className="text-xs sm:text-sm">
                    Quantity: {gift.quantity}
                  </p>
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
                  <button
                    onClick={() => {
                      setSelectedGiftID(gift.id)

                      setUpdateProps((prev) => ({
                        ...prev,
                        giftID: gift.id,
                      }))
                      setToUpdate(true)
                    }}
                    className="font-semibold border-solid border-gray-200 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-gray-200"
                  >
                    Update Item
                  </button>
                  <button className="font-semibold border-solid border-red-300 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-red-400">
                    Remove Item
                  </button>
                </div>
              </>
            )}
            {toUpdate && gift.id === selectedGiftID && (
              <>
                <label htmlFor="productName">Update the gift's title:</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={updateProps.productName}
                  onChange={onChange}
                />
                <div className="flex flex-col sm:flex-row justify-between gap-4 items-center sm:ml-5 sm:mr-5 ">
                  <label htmlFor="quantity">Update the quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={updateProps.quantity}
                    onChange={onChange}
                  />
                  <div className="flex flex-row items-center gap-3">
                    <label htmlFor="productLink">
                      Update the gift's purchase link
                    </label>
                    <input
                      type="text"
                      id="productLink"
                      name="productLink"
                      value={updateProps.productLink}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="flex flex-row">
                  <button
                    onClick={submitChange
                    }
                    className="font-semibold border-solid border-gray-200 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-gray-200"
                  >
                    Confirm Update
                  </button>
                  <button
                    onClick={() => {
                      setToUpdate(false)
                    }}
                    className="font-semibold border-solid border-red-300 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-red-400"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </li>
        </div>
      ))}
    </ul>
  )
}
