'use client'

import { useContextWrap } from '@/contextAPI/context'
import checkAuth from '@/functions/checkAuthFunction'
import useSubmitList from '@/app/createList/(hooks)/useSubmitList'
import newListSchema from '@/zodSchemas/newListSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

type listData = z.infer<typeof newListSchema>

export default function GiftListForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<listData>({
    resolver: zodResolver(newListSchema)
  })
  const { fields, append } = useFieldArray<listData>({
    control,
    name: 'gifts',
  })
  checkAuth()
  const submitList = useSubmitList()
  const onSubmit: SubmitHandler<listData> = submitList
  const {statusMessage} = useContextWrap()
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen ">
        <div className="font-sans p-10 text-center bg-black text-white font-semibold rounded-2xl">
          <div className="flex justify-center items-center -mt-5 mb-3">
            <h2>Create a new wedding gift list</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
            <div className="p-2">
              <label htmlFor="listTitle">List Title</label>
              <input
                className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center
                 text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                type="text"
                id="listTitle"
                {...register('listTitle')}
                placeholder="This name will identify your gift list to the guests"
                required
              />
              {errors.listTitle && <span className='text-red-500 font-bold'>{errors.listTitle.message}</span>}
            </div>
            <div className="p-2">
              <label htmlFor="weddingDate">Wedding Date</label>
              <input
                className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center
                 text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                type="date"
                id="weddingDate"
                {...register('weddingDate')}
                required
              />
              {errors.weddingDate && <span className='text-red-500 font-bold'>{errors.weddingDate.message}</span>}
            </div>
            <div className="p-2">
              <label htmlFor="weddingDate">Shipping Address</label>
              <input
                className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center
                 text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                type="string"
                id="shippingAddress"
                {...register('shippingAddress')}
                placeholder="The address where the gifts will be delivered at."
                required
              />
              {errors.shippingAddress && <span className='text-red-500 font-bold'>{errors.shippingAddress.message}</span>}
            </div>
            <div>
              <h2>Products</h2>
              {fields.map((item, index) => (
                <div key={item.id}>
                  <div className="p-2">
                    <label htmlFor={`productName-${index}`}>Product Name</label>
                    <input
                      className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200"
                      type="string"
                      id={`productName-${index}`}
                      {...register(`gifts.${index}.productName`)}
                      placeholder="This product will appear as a gift on your gift list"
                      required
                    />
                    {errors.gifts && <span className='text-red-500 font-bold'>{errors.gifts.message}</span>}
                  </div>
                  <div className="p-2">
                    <label htmlFor={`productLink-${index}`}>Product Link</label>
                    <input
                      className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200"
                      type="string"
                      id={`productLink-${index}`}
                      {...register(`gifts.${index}.productLink`)}
                      placeholder="Insert the link for your guests to buy the product, if needed."
                    />
                    {errors.gifts && <span className='text-red-500 font-bold'>{errors.gifts.message}</span>}
                  </div>
                  <div className="p-2">
                    <label htmlFor={`quantity-${index}`}>Quantity</label>
                    <input
                      className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200"
                      type="number"
                      id={`quantity-${index}`}
                      {...register(`gifts.${index}.quantity`)}
                      required
                    />
                    {errors.gifts && <span className='text-red-500 font-bold'>{errors.gifts.message}</span>}
                  </div>
                </div>
              ))}
              <div className="p-5">
                <button
                  className="bg-amber-50 text-xs rounded-full py-0.5 px-4 text-black font-bold border-amber-100 border-solid border-2 w-2/4 mt-2.5 hover:bg-amber-200 focus:outline-none ring-2 ring-amber-200"
                  type="button"
                  id="newInputSet"
                  onClick={() =>
                    append({ productLink: '', productName: '', quantity: '' })
                  }
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
              <span
                className={`font-bold flex justify-center ${
                  statusMessage === 'Wedding created successfully!'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {statusMessage}
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
