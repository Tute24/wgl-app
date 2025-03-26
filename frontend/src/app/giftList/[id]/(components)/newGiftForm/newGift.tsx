import useSubmitNewGift from '@/app/giftList/[id]/(hooks)/useSubmitNewGifts'
import InputContainer from '@/components/Common/input-container/input-container'
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
                  <InputContainer
                  label='Product name'
                  type='text'
                  id={`productName-${index}`}
                  name='productName'
                  value={gift.productName}
                  onChange={(event) => newGiftInputHandler(event, index)}
                  placeholder="This product will appear as a gift on your gift list"
                  />
                </div>
                <div className="p-2">
                  <InputContainer
                  label='Product link'
                  type='text'
                  id={`productName-${index}`}
                  name='productLink'
                  value={gift.productLink}
                  onChange={(event) => newGiftInputHandler(event, index)}
                  placeholder="Insert the link for your guests to buy the product, if needed"
                  />
                </div>
                <div className="p-2">
                  <InputContainer
                  label='Quantity'
                  type='number'
                  id={`quantity-${index}`}
                  name='quantity'
                  value={gift.quantity}
                  onChange={(event) => newGiftInputHandler(event, index)}
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
