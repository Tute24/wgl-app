'use client'

import Link from 'next/link'
import { useContextWrap } from '@/contextAPI/context'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/app/(components)/ui/card'
import { Trash2, Gem, CalendarHeart, Link2, ArrowRight } from 'lucide-react'

export interface WeddingCardProps {
  id: number
  title: string
  date: string
  isOwn: boolean
}

export default function WeddingCard({
  id,
  title,
  date,
  isOwn,
}: WeddingCardProps) {
  const { setModalObject } = useContextWrap()
  return (
    <Card className="w-full sm:min-w-[400px] border-amber-800 hover:shadow-md hover:shadow-amber-800 font-inter">
      <CardHeader className="flex items-end text-center px-4 pt-3 pb-1 mx-1.5">
        {isOwn ? (
          <button
            type="button"
            onClick={() =>
              setModalObject({
                id,
                name: title,
                isOpen: true,
              })
            }
          >
            <Trash2 size={18} className="text-red-500 hover:text-red-700" />
          </button>
        ) : (
          <Link href={`/portal/giftList/${id}`}>
            <ArrowRight size={18} className="text-amber-800" />
          </Link>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-6 font-semibold min-w-[350px]">
        <div className="flex flex-row gap-4 items-center">
          <Gem size={24} className="text-amber-800" />
          <h2 className="text-xl lg:text-2xl text-stone-700">{title}</h2>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <CalendarHeart size={24} className="text-amber-800" />
          <span className="text-lg text-stone-700">
            Wedding Date: <span className="text-amber-800">{date}</span>
          </span>
        </div>
      </CardContent>
      <CardFooter className="items-center flex flex-row gap-4 ">
        <Link href={`/portal/giftList/${id}`}>
          <div className="flex flex-row gap-4 items-center">
            <Link2 size={24} className="text-amber-800" />
            <span className="text-stone-700 hover:underline hover:text-amber-800">
              Go to this wedding's page
            </span>
          </div>
        </Link>
      </CardFooter>
    </Card>
  )
}
