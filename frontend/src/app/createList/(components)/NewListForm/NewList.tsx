'use client'

import { useContextWrap } from '@/contextAPI/context'
import checkAuth from '@/functions/checkAuthFunction'
import useSubmitList from '@/app/createList/(hooks)/useSubmitList'
import newListSchema from '@/zodSchemas/newListSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import InputContainer from '@/components/Common/input-container/input-container'
import UserButton from '@/components/Common/buttons/user-button/user-button'
import SubmitButton from '@/components/Common/buttons/submit-button/submit-button'
import Image from 'next/image'

type listData = z.infer<typeof newListSchema>

export default function GiftListForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<listData>({
    resolver: zodResolver(newListSchema),
  })
  const { fields, append, remove } = useFieldArray<listData>({
    control,
    name: 'gifts',
  })
  checkAuth()
  const submitForm = useSubmitList()
  const onSubmit: SubmitHandler<listData> = submitForm
  const { statusMessage } = useContextWrap()
  const removeIcon = (
    <Image src="/x-circle-icon.png" alt="remove-gift" width={28} height={28} />
  )
  return (
    <>
      <div className="flex flex-col items-center ">
        <div className="font-sans border-solid border-2 border-dustyRose rounded-lg hover:shadow-lg hover:shadow-dustyRose flex justify-center flex-col p-7">
          <div className="flex justify-center items-center font-bold text-amber-800">
            <h2>Create a new wedding gift list</h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col "
          >
            <div className="gap-2">
              <InputContainer
                label="Wedding name"
                id="listTitle"
                type="text"
                placeholder="Insert a name/title for this wedding"
                {...register('listTitle')}
              />
              {errors.listTitle && (
                <span className="text-red-500 font-bold">
                  {errors.listTitle.message}
                </span>
              )}
            </div>
            <div className="gap-2">
              <InputContainer
                label="Wedding date"
                id="weddingDate"
                type="date"
                {...register('weddingDate')}
              />
              {errors.weddingDate && (
                <span className="text-red-500 font-bold">
                  {errors.weddingDate.message}
                </span>
              )}
            </div>
            <div className="gap-2">
              <InputContainer
                label="Shipping address"
                id="shippingAddress"
                type="text"
                placeholder="Insert the address where the gifts will be delivered"
                {...register('shippingAddress')}
              />
              {errors.shippingAddress && (
                <span className="text-red-500 font-bold">
                  {errors.shippingAddress.message}
                </span>
              )}
            </div>
            <div>
              <h2 className="flex justify-center text-amber-800 font-bold">
                Gifts
              </h2>
              {fields.map((item, index) => (
                <div key={item.id}>
                  <div className="gap-0 flex justify-center  ">
                    <InputContainer
                      label="Product name"
                      id={`productName-${index}`}
                      type="text"
                      placeholder="This product will appear as a gift on your gift list"
                      {...register(`gifts.${index}.productName`)}
                    />
                    {errors.gifts && (
                      <span className="text-red-500 font-bold">
                        {errors.gifts.message}
                      </span>
                    )}
                    <div>
                      <button
                        id={`remove-gift-${index}`}
                        onClick={() => remove(index)}
                        className="-ml-8 mt-1.5 flex justify-start items-start"
                      >
                        {removeIcon}
                      </button>
                    </div>
                  </div>
                  <div className="gap-2">
                    <InputContainer
                      label="Product link"
                      id={`productLink-${index}`}
                      type="text"
                      placeholder="Insert the link for your guests to buy the product, if needed."
                      {...register(`gifts.${index}.productLink`)}
                    />
                    {errors.gifts && (
                      <span className="text-red-500 font-bold">
                        {errors.gifts.message}
                      </span>
                    )}
                  </div>
                  <div className="gap-2">
                    <InputContainer
                      label="Quantity"
                      id={`quantity-${index}`}
                      type="number"
                      {...register(`gifts.${index}.quantity`)}
                    />
                    {errors.gifts && (
                      <span className="text-red-500 font-bold">
                        {errors.gifts.message}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div className="mt-3">
                <UserButton
                  id="newInputSet"
                  content="Add a new gift"
                  onClick={(e) => {
                    e.preventDefault()
                    append({ productLink: '', productName: '', quantity: '' })
                  }}
                />
              </div>
            </div>
            <div className="mt-3">
              <SubmitButton id="createWeddingButton" title="Create wedding" />
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
