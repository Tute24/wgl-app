import useSubmitNewGift from '@/app/giftList/[id]/(hooks)/useSubmitNewGifts'
import giftCreateProps from '@/types/giftCreateProps'
import { ChangeEvent, useState } from 'react'

export default function NewGiftForm() {
  const [createNewGift, setCreateNewGift] = useState<giftCreateProps[]>([])
  function newGiftInputHandler(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    setCreateNewGift((prev) =>
      prev.map((gift, i) =>
        i === index
          ? { ...gift, [event.target.name]: event.target.value }
          : gift
      )
    )
  }
  return (
    <>
      <form onSubmit={useSubmitNewGift(createNewGift)}>
        <div>
          <ul>
            {createNewGift.map((gift, index) => (
              <li key={index}>
                <div className="p-2">
                  <label htmlFor={`productName-${index}`}>Product Name</label>
                  <input
                    className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200"
                    type="string"
                    id={`productName-${index}`}
                    name="productName"
                    value={gift.productName}
                    onChange={(event) => newGiftInputHandler(event, index)}
                    placeholder="This product will appear as a gift on your gift list"
                    required
                  />
                </div>
                <div className="p-2">
                  <label htmlFor={`productLink-${index}`}>Product Link</label>
                  <input
                    className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200"
                    id={`productLink-${index}`}
                    name="productLink"
                    type="string"
                    value={gift.productLink}
                    onChange={(event) => newGiftInputHandler(event, index)}
                    placeholder="Insert the link for your guests to buy the product, if needed."
                  />
                </div>
                <div className="p-2">
                  <label htmlFor={`quantity-${index}`}>Quantity</label>
                  <input
                    className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200"
                    id={`quantity-${index}`}
                    name="quantity"
                    type="number"
                    value={gift.quantity}
                    onChange={(event) => newGiftInputHandler(event, index)}
                    required
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col">
            <button
              onClick={() => {
                setCreateNewGift((prev) => [
                  ...prev,
                  { productName: '', productLink: '', quantity: 0 },
                ])
              }}
              className="font-semibold border-solid border-red-300 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-red-400"
            >
              Add new gift
            </button>
            {createNewGift.length > 0 && (
              <>
                <button
                  onClick={() => setCreateNewGift([])}
                  className="font-semibold border-solid border-red-300 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-red-400"
                >
                  Cancel
                </button>
                <button className="font-semibold border-solid border-gray-200 border-2 rounded-3xl px-5 mt-2 py-2 mr-5 hover:bg-gray-200">
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </>
  )
}
