import { useContextWrap } from '@/contextAPI/context'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import useSubmitUpdate from '../../(hooks)/useSubmitUpdate'
import { Trash2, Gift, Pencil, Boxes, Link2 } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from '@/components/Common/spinner/spinner'

export interface GiftCardProps {
  id: number
  productName: string
  quantity: number
  productLink: string
}

const updateSchema = z.object({
  productName: z.string(),
  productLink: z.string(),
  quantity: z.number().int().positive(),
})

type updateData = z.infer<typeof updateSchema>

export default function OwnGiftCard({
  id,
  productLink,
  productName,
  quantity,
}: GiftCardProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<updateData>({
    resolver: zodResolver(updateSchema),
  })
  const {
    toUpdate,
    setToUpdate,
    setModalObject,
    setSelectedGiftID,
    selectedGiftID,
  } = useContextWrap()
  const [updateProps, setUpdateProps] = useState({
    productName: '',
    quantity: 0,
    productLink: '',
  })

  useEffect(() => {
    if (toUpdate && id === selectedGiftID) {
      reset({
        productName: updateProps.productName,
        productLink: updateProps.productLink,
        quantity: updateProps.quantity,
      })
    }
  }, [toUpdate, selectedGiftID, id, updateProps, reset])

  const submitUpdate = useSubmitUpdate()

  const onSubmit: SubmitHandler<updateData> = (formData) => {
    console.log(formData)
    submitUpdate(formData, selectedGiftID)
  }

  return (
    <>
      {id !== selectedGiftID && (
        <Card className="w-full max-w-sm bg-stone-50 border-2 hover:bg-stone-100 hover:shadow-lg hover:shadow-stone-300">
          <CardHeader className="flex flex-row justify-end items-end text-center gap-3 px-4 pt-3 pb-1 mx-1.5">
            <button
              type="button"
              onClick={() => {
                setUpdateProps({
                  productName,
                  quantity,
                  productLink,
                })
                setSelectedGiftID(id)
                setToUpdate(true)
              }}
            >
              <Pencil
                size={18}
                className="text-green-500 hover:text-green-700"
              />
            </button>
            <button
              type="button"
              onClick={() =>
                setModalObject({
                  id,
                  name: productName,
                  isOpen: true,
                })
              }
            >
              <Trash2 size={18} className="text-red-500 hover:text-red-700" />
            </button>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 font-semibold min-w-[350px]">
            <div className="flex flex-row gap-4 items-center">
              <Gift size={24} className="text-amber-800" />
              <span className="text-lg text-stone-700">{productName}</span>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Boxes size={24} className="text-amber-800" />
              <span className="text-lg text-stone-700">
                Quantity on list remaining:{' '}
                <span className="text-amber-800">{quantity}</span>
              </span>
            </div>
          </CardContent>
          <CardFooter className="items-center flex flex-row gap-4">
            <Link
              href={
                productLink.startsWith('http')
                  ? productLink
                  : `https://${productLink}`
              }
              target="_blank"
            >
              <div className="flex flex-row gap-4 items-center">
                <Link2 size={24} className="text-amber-800" />
                <span className="text-stone-700 hover:underline hover:text-amber-800">
                  Open this product's page on store
                </span>
              </div>
            </Link>
          </CardFooter>
        </Card>
      )}
      {toUpdate && id === selectedGiftID && (
        <Card className="w-full max-w-sm bg-stone-50 border-2 hover:bg-stone-100 hover:shadow-lg hover:shadow-stone-300 min-w-[350px]">
          <CardHeader className="flex items-center text-center">
            <h2 className="text-amber-800 font-bold">
              Update this gift's Infos:
            </h2>
          </CardHeader>
          <CardContent className="w-full gap-3">
            <form
              className="text-stone-700"
              onSubmit={handleSubmit(onSubmit, (errors) => {
                console.log('Erros no form:', errors)
              })}
            >
              <div className="flex flex-col gap-3 mb-3 items-start">
                <Label>Update the gift's title:</Label>
                <Input
                  type="text"
                  {...register('productName')}
                  className="text-amber-800 font-semibold"
                />
              </div>
              <div className="flex flex-col gap-3 mb-3 items-start">
                <Label>Update the gift's quantity:</Label>
                <Input
                  type="number"
                  {...register('quantity', { valueAsNumber: true })}
                  className="text-amber-800 font-semibold"
                />
              </div>
              <div className="flex flex-col gap-3 mb-3 items-start">
                <Label>Update the gift's purchase link:</Label>
                <Input
                  type="text"
                  {...register('productLink')}
                  className="text-amber-800 font-semibold"
                />
              </div>
              <div className="flex flex-row gap-5">
                <Button
                  type="submit"
                  className="w-full bg-stone-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Spinner /> : 'Update'}
                </Button>
                <Button
                  variant="destructive"
                  type="button"
                  className="w-full text-stone-100"
                  onClick={() => {
                    setToUpdate(false)
                    setSelectedGiftID(0)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      {!toUpdate && id === selectedGiftID && <></>}
    </>
  )
}
