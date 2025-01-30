import { useContextWrap } from '@/contextAPI/context'
import {ChangeEvent, FormEvent } from 'react'

interface newListFormProps {
  listData: {
    listTitle: string
    weddingDate: string
    gifts: 
      {
        productName: string
        productLink: string
        quantity: number
      }[]  
  }
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: FormEvent) => void
  giftsChange: (event:ChangeEvent<HTMLInputElement>, index: number) => void
  newProductInputs: (event: any) => void
}

export default function GiftListForm({
  listData,
  onChange,
  onSubmit,
  giftsChange,
  newProductInputs,
}: newListFormProps) {
  const { statusMessage, setStatusMessage } = useContextWrap()

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen ">
        <div className="font-sans p-10 text-center bg-black text-white font-semibold rounded-2xl">
          <div className="flex justify-center items-center -mt-5 mb-3">
            <h2>Create a new wedding gift list</h2>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col ">
            <div className="p-2">
              <label htmlFor="listTitle">List Title</label>
              <input
                className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center
                 text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                type="text"
                id="listTitle"
                value={listData.listTitle}
                onChange={onChange}
                name="listTitle"
                placeholder="This name will identify your gift list to the guests"
                required
              />
            </div>
            <div className="p-2">
              <label htmlFor="weddingDate">Wedding Date</label>
              <input
                className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center
                 text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                type="date"
                id="weddingDate"
                name="weddingDate"
                value={listData.weddingDate}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <h2>Products</h2>
              <div className="p-2">
                <label htmlFor="productName-0">Product Name</label>
                <input
                  className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl 
                text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                  type="string"
                  id="productName-0"
                  name= "productName"
                  value={listData.gifts[0].productName}
                  placeholder="This product will appear as a gift on your gift list"
                  onChange={(event) => giftsChange(event,0)}
                  required
                />
              </div>
              <div className="p-2">
                <label htmlFor="productLink-0">Product Link</label>
                <input
                  className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                  id="productLink-0"
                  name="productLink"
                  type="string"
                  value={listData.gifts[0].productLink}
                  onChange={(event) => giftsChange(event,0)}
                  placeholder="Insert the link for your guests to buy the product, if needed."
                />
              </div>
              <div className="p-2">
                <label htmlFor="quantity-0">Quantity</label>
                <input
                  className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                  id="quantity-0"
                  name="quantity"
                  type="number"
                  value={listData.gifts[0].quantity}
                  onChange={(event) => giftsChange(event,0)}
                  required
                />
              </div>
              <div className="p-5">
                <button
                  className="bg-amber-50 text-xs rounded-full py-0.5 px-4 text-black font-bold border-amber-100 border-solid border-2 w-2/4 mt-2.5 hover:bg-amber-200 focus:outline-none ring-2 ring-amber-200"
                  type="button"
                  id="registerButton"
                  onClick={newProductInputs}
                >
                  Insert new product
                </button>
              </div>
            </div>
            <div className="p-5">
              <button
                className="bg-amber-50 rounded-full py-0.5 px-4 text-black font-bold border-amber-100 border-solid border-2 w-full mt-2.5 hover:bg-amber-200 focus:outline-none ring-2 ring-amber-200"
                type="submit"
                id="registerButton"
              >
                Create List
              </button>
            </div>
            <span className="text-white">{statusMessage}</span>
          </form>
        </div>
      </div>
    </>
  )
}
