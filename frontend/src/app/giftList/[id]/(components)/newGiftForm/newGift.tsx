import useSubmitNewGift from '@/app/giftList/[id]/(hooks)/useSubmitNewGifts'
import InputContainer from '@/components/Common/input-container/input-container'
import giftCreateProps from '@/types/giftCreateProps'
import { newGiftsSchema } from '@/zodSchemas/giftsSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'

type newGiftsData = z.infer<typeof newGiftsSchema>

export default function NewGiftForm() {
  const [createNewGift, setCreateNewGift] = useState<giftCreateProps[]>([])
  // function newGiftInputHandler(
  //   event: ChangeEvent<HTMLInputElement>,
  //   index: number
  // ) {
  //   setCreateNewGift((prev) =>
  //     prev.map((gift, i) =>
  //       i === index
  //         ? { ...gift, [event.target.name]: event.target.value }
  //         : gift
  //     )
  //   )
  // }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newGiftsData>({
    resolver: zodResolver(newGiftsSchema),
  })

  const { fields, append, remove } = useFieldArray<newGiftsData>({
    control,
    name: 'gifts',
  })

  const onSubmit: SubmitHandler<newGiftsData> = (data) => {
    console.log(errors)
    console.log(data.gifts)
  }

  const removeIcon = (
    <Image src="/x-circle-icon.png" alt="remove-gift" width={28} height={28} />
  )

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <ul>
            {fields.map((gift, index) => (
              <li key={gift.id}>
                <div className="gap-0 flex justify-center">
                  <InputContainer
                    label="Product name"
                    type="text"
                    id={`productName-${index}`}
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
                <div className="p-2">
                  <InputContainer
                    label="Product link"
                    type="text"
                    id={`productName-${index}`}
                    placeholder="Insert the link for your guests to buy the product, if needed"
                    {...register(`gifts.${index}.productLink`)}
                  />
                  {errors.gifts && (
                    <span className="text-red-500 font-bold">
                      {errors.gifts.message}
                    </span>
                  )}
                </div>
                <div className="p-2">
                  <InputContainer
                    label="Quantity"
                    type="text"
                    id={`quantity-${index}`}
                    {...register(`gifts.${index}.quantity`)}
                  />
                  {errors.gifts && (
                    <span className="text-red-500 font-bold">
                      {errors.gifts.message}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col">
            <button
              onClick={(e) => {
                e.preventDefault()
                append({ productLink: '', productName: '', quantity: '' })
              }}
              className="font-semibold border-solid border-red-300 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-red-400"
            >
              Add new gift
            </button>
            {fields.length > 0 && (
              <>
                <button
                  type="submit"
                  className="font-semibold border-solid border-gray-200 border-2 rounded-3xl px-5 mt-2 py-2 mr-5 hover:bg-gray-200"
                >
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
