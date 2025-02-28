import giftCreateProps from '@/types/giftCreateProps'
import { ChangeEvent, FormEvent } from 'react'

interface newListFormProps {
  listDataType: {
    listTitle: string
    weddingDate: string
    shippingAddress: string
    gifts: giftCreateProps[]
  }
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: FormEvent) => void
  giftsChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void
  setListData: React.Dispatch<
    React.SetStateAction<{
      listTitle: string
      weddingDate: string
      shippingAddress: string
      gifts: giftCreateProps[]
    }>
  >
  statusMessage: string
}

export default function GiftListForm({
  listDataType,
  onChange,
  onSubmit,
  giftsChange,
  setListData,
  statusMessage
}: newListFormProps) {
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
                value={listDataType.listTitle}
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
                value={listDataType.weddingDate}
                onChange={onChange}
                required
              />
            </div>
            <div className="p-2">
              <label htmlFor="weddingDate">Shipping Address</label>
              <input
                className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center
                 text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                type="string"
                id="shippingAddress"
                name="shippingAddress"
                value={listDataType.shippingAddress}
                onChange={onChange}
                placeholder='The address where the gifts will be delivered at.'
                required
              />
            </div>
            <div>
              <h2>Products</h2>
              {listDataType.gifts.map((gift, index) => (
                <div key={index}>
                  <div className="p-2">
                    <label htmlFor={`productName-${index}`}>Product Name</label>
                    <input
                      className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200"
                      type="string"
                      id={`productName-${index}`}
                      name="productName"
                      value={gift.productName}
                      placeholder="This product will appear as a gift on your gift list"
                      onChange={(event) => giftsChange(event, index)}
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
                      onChange={(event) => giftsChange(event, index)}
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
                      onChange={(event) => giftsChange(event, index)}
                      required
                    />
                  </div>
                </div>
              ))}
              <div className="p-5">
                <button
                  className="bg-amber-50 text-xs rounded-full py-0.5 px-4 text-black font-bold border-amber-100 border-solid border-2 w-2/4 mt-2.5 hover:bg-amber-200 focus:outline-none ring-2 ring-amber-200"
                  type="button"
                  id="newInputSet"
                  onClick={() => {
                    setListData((prev) => ({
                      ...prev,
                      gifts: [
                        ...prev.gifts,
                        { productName: '', productLink: '', quantity: 0 },
                      ],
                    }))
                  }}
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
              <span className={`font-bold flex justify-center ${
                statusMessage === 'Wedding created successfully!' ? 'text-green-500' : 'text-red-500'
              }`}>{statusMessage}</span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}