import { useState } from 'react'
import { GiftCardProps } from './own-gift-card'
import Link from 'next/link'
import { IoArrowRedoSharp } from 'react-icons/io5'
import UserButton from '@/components/Common/buttons/user-button/user-button'
import InputContainer from '@/components/Common/input-container/input-container'
import useGiftPresent from '../../(hooks)/giftPresentFunction'

export default function GuestGiftCard({
  id,
  productLink,
  productName,
  quantity,
}: GiftCardProps) {
  const [isGiftingSetup, setIsGiftingSetup] = useState<boolean>(false)
  const [giftedQuantity, setGiftedQuantity] = useState<string>('')
  const arrowIcon = <IoArrowRedoSharp />
  const giftPresent = useGiftPresent(id, giftedQuantity)
  return (
    <>
      <li
        key={id}
        className="flex flex-col justify-center px-2 min-w-[350px] items-center border-solid bg-softBeige border-2 border-dustyRose shadow-sm shadow-dustyRose rounded-lg hover:shadow-lg hover:shadow-dustyRose "
      >
        <div className="flex flex-col p-3 gap-1 text-amber-800 font-bold">
          <h2 className="font-bold">{productName}</h2>
          <div className="flex flex-col items-center gap-1 ">
            <p>
              Quantity: <span className="text-mutedTaupe">{quantity}</span>
            </p>
            <div className="flex items-center">
              <Link
                href={
                  productLink.startsWith('http')
                    ? productLink
                    : `https://${productLink}`
                }
                target="_blank"
                className=" hover:underline flex flex-row items-center gap-2"
              >
                Check the product's page {arrowIcon}
              </Link>
            </div>
            {!isGiftingSetup && (
              <div className="mt-2">
                <UserButton
                  content="Gift product"
                  className="text-sm !w-[130px]"
                  onClick={() => setIsGiftingSetup(true)}
                />
              </div>
            )}
            {isGiftingSetup && (
              <>
                <div>
                  <InputContainer
                    label="Choose quantity"
                    type="number"
                    max={quantity}
                    min="1"
                    id={`quantityGifted-${id}`}
                    onChange={(e) => setGiftedQuantity(e.target.value)}
                    value={giftedQuantity}
                  />
                </div>
                <div className="flex flex-row items-center justify-center gap-4 w-full">
                  <div>
                    <UserButton
                      className="!bg-green-500 hover:!bg-green-400 !w-[130px]"
                      content="Confirm"
                      onClick={() => {
                        giftPresent()
                        setIsGiftingSetup(false)
                      }}
                    />
                  </div>
                  <div>
                    <UserButton
                      className="!bg-red-500 hover:!bg-red-400 !w-[130px]"
                      content="Cancel"
                      onClick={() => setIsGiftingSetup(false)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </li>
    </>
  )
}
