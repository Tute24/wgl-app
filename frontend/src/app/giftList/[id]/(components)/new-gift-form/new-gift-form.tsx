import useSubmitNewGift from '@/app/giftList/[id]/(hooks)/useSubmitNewGifts'
import { newGiftsSchema } from '@/zodSchemas/giftsSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Spinner } from '@/components/Common/spinner/spinner'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { CircleX } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useContextWrap } from '@/contextAPI/context'

type newGiftsData = z.infer<typeof newGiftsSchema>

export default function NewGiftForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<newGiftsData>({
    resolver: zodResolver(newGiftsSchema),
  })

  const { statusMessage } = useContextWrap()

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

  return (
    <div className="flex flex-col items-center justify-center m-auto px-4 w-full pb-5 font-inter">
      <Button
        className={`w-full ${fields.length === 0 ? 'block' : 'hidden'} text-md font-medium font-inter`}
        onClick={(e) => {
          e.preventDefault()
          append({ productLink: '', productName: '', quantity: '' })
        }}
      >
        Add gifts
      </Button>
      {fields.length > 0 && (
        <Card className="border-amber-800 hover:shadow-md hover:shadow-amber-800 w-full">
          <CardHeader>
            <CardTitle className="text-center font-bold text-amber-800 text-xl">
              Increment your list of gifts
            </CardTitle>
            <CardDescription className="text-start">
              You can add as many gifts as you want to your list
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col items-start justify-start gap-5">
                {fields.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start justify-start gap-5 w-full"
                  >
                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex justify-between items-center">
                        <Label className="text-md text-stone-700">
                          Product name
                        </Label>
                        <button type="button" onClick={() => remove(index)}>
                          <CircleX size={18} />
                        </button>
                      </div>
                      <Input
                        className="!text-md !text-amber-800 !placeholder-amber-800"
                        type="text"
                        {...register(`gifts.${index}.productName`)}
                        placeholder="Enter the product's name"
                      />
                      {errors.gifts?.[index]?.productName && (
                        <span className="font-inter text-red-600 text-sm text-start">
                          {errors.gifts[index].productName?.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-3 w-full items-start">
                      <Label className="text-md text-stone-700">
                        Product link
                      </Label>
                      <Input
                        className="!text-md !text-amber-800 !placeholder-amber-800"
                        type="text"
                        {...register(`gifts.${index}.productLink`)}
                        placeholder="Link to buy the gift"
                      />
                      {errors.gifts?.[index]?.productLink && (
                        <span className="font-inter text-red-600 text-sm text-start">
                          {errors.gifts[index].productLink?.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-3 w-full items-start">
                      <Label className="text-md text-stone-700">Quantity</Label>
                      <Input
                        className="!text-md !text-amber-800 !placeholder-amber-800"
                        type="number"
                        min={1}
                        {...register(`gifts.${index}.quantity`)}
                      />
                      {errors.gifts?.[index]?.quantity && (
                        <span className="font-inter text-red-600 text-sm text-start">
                          {errors.gifts[index].quantity?.message}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  className="w-full text-md font-medium"
                  onClick={(e) => {
                    e.preventDefault()
                    append({ productLink: '', productName: '', quantity: '' })
                  }}
                >
                  Add gift
                </Button>
                <Button
                  type="submit"
                  className="w-full text-md font-bold bg-paleGold hover:bg-mutedTaupe text-amber-800 hover:text-champagneGold"
                >
                  {isSubmitting ? <Spinner /> : 'Submit'}
                </Button>
              </div>
            </form>
          </CardContent>
          {statusMessage ? (
            <CardFooter
              className={`font-inter font-medium text-red-600 text-md flex justify-center`}
            >
              {statusMessage}
            </CardFooter>
          ) : (
            ''
          )}
        </Card>
      )}
    </div>
  )
}
