import useSubmitNewGift from '@/app/giftList/[id]/(hooks)/useSubmitNewGifts'
import InputContainer from '@/components/Common/input-container/input-container'
import { newGiftsSchema } from '@/zodSchemas/giftsSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'
import UserButton from '@/components/Common/buttons/user-button/user-button'

type newGiftsData = z.infer<typeof newGiftsSchema>

export default function NewGiftForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<newGiftsData>({
    resolver: zodResolver(newGiftsSchema),
  })

  const { fields, append, remove } = useFieldArray<newGiftsData>({
    control,
    name: 'gifts',
  })
  const submitNewGifts = useSubmitNewGift()
  const onSubmit: SubmitHandler<newGiftsData> = (data) => {
    submitNewGifts(data)
    reset()
    remove()
  }

  const removeIcon = (
    <Image src="/x-circle-icon.png" alt="remove-gift" width={28} height={28} />
  )

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
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
          <div className="flex flex-col gap-1.5">
            <UserButton
              className="min-w-[260px]"
              content="Add new gift"
              id="newGiftButton"
              onClick={(e) => {
                e.preventDefault()
                append({ productLink: '', productName: '', quantity: '' })
              }}
            />
            {fields.length > 0 && (
              <>
                <UserButton
                  className="bg-paleGold hover:bg-warmBeige"
                  type="submit"
                  content="Submit"
                  id="submitNewGiftButton"
                />
              </>
            )}
          </div>
        </div>
      </form>
    </>
  )
}
