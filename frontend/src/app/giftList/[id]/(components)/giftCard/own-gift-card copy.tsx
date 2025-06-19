import { useContextWrap } from '@/contextAPI/context'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import useSubmitUpdate from '../../(hooks)/useSubmitUpdate'
import { MdEdit } from 'react-icons/md'
import { IoTrashOutline, IoArrowRedoSharp } from 'react-icons/io5'

import InputContainer from '@/components/Common/input-container/input-container'
import UserButton from '@/components/Common/buttons/user-button/user-button'

export interface GiftCardProps {
  id: number
  productName: string
  quantity: number
  productLink: string
}

export default function OwnGiftCard({
  id,
  productLink,
  productName,
  quantity,
}: GiftCardProps) {
  const editIcon = <MdEdit />
  const trashIcon = <IoTrashOutline />
  const arrowIcon = <IoArrowRedoSharp />
  const { toUpdate, setToUpdate, setModalObject } = useContextWrap()
  const [selectedGiftID, setSelectedGiftID] = useState<number>(0)
  const [updateProps, setUpdateProps] = useState({
    productName: '',
    quantity: 0,
    productLink: '',
  })
  function handleUpdateInputChange(e: ChangeEvent<HTMLInputElement>) {
    setUpdateProps({
      ...updateProps,
      [e.target.name]: e.target.value,
    })
  }
  const submitUpdate = useSubmitUpdate(updateProps, selectedGiftID)
  return (
    <>
      <li
        key={id}
        className="flex flex-col px-2 w-full items-center border-solid bg-softBeige border-2 border-dustyRose shadow-sm shadow-dustyRose rounded-lg hover:shadow-lg hover:shadow-dustyRose "
      >
        {id !== selectedGiftID && (
          <>
            <div className="flex pt-2 -mb-1 justify-between w-full ">
              <button
                onClick={() => {
                  setUpdateProps({
                    productName,
                    quantity,
                    productLink,
                  })
                  setSelectedGiftID(id)
                  setToUpdate(true)
                }}
                className="text-green-500"
              >
                {editIcon}
              </button>
              <button
                onClick={() =>
                  setModalObject({
                    id,
                    name: productName,
                    isOpen: true,
                  })
                }
                className="text-red-500"
              >
                {trashIcon}
              </button>
            </div>
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
              </div>
            </div>
          </>
        )}
        {toUpdate && id === selectedGiftID && (
          <>
            <div className="flex flex-col w-full items-start gap-3 p-2">
              <InputContainer
                label={`Update the gift's title`}
                type="text"
                id="productName"
                name="productName"
                value={updateProps.productName}
                onChange={handleUpdateInputChange}
              />
              <InputContainer
                label={`Update the quantity`}
                type="number"
                id="quantity"
                name="quantity"
                value={updateProps.quantity}
                onChange={handleUpdateInputChange}
              />
              <InputContainer
                label={`Update the gift's purchase link`}
                type="text"
                id="productLink"
                name="productLink"
                value={updateProps.productLink}
                onChange={handleUpdateInputChange}
              />
            </div>
            <div className="flex flex-row items-center justify-center w-full gap-4 mb-2">
              <UserButton
                className="!w-[130px] !bg-green-500 hover:!bg-green-400"
                content="Confirm"
                id="confirmButton"
                onClick={() => {
                  submitUpdate()
                  setToUpdate(false)
                  setSelectedGiftID(0)
                }}
              />
              <UserButton
                className="!w-[130px] !bg-red-500 hover:!bg-red-400"
                content="Cancel"
                id="cancelButton"
                onClick={() => {
                  setToUpdate(false)
                  setSelectedGiftID(0)
                }}
              />
            </div>
          </>
        )}
        {!toUpdate && id === selectedGiftID && (
          <>
            <div className="flex flex-col w-full items-start gap-3 p-2">
              <InputContainer
                label={`Update the gift's title`}
                type="text"
                id="productName"
                name="productName"
                value={updateProps.productName}
                onChange={handleUpdateInputChange}
              />
              <InputContainer
                label={`Update the quantity`}
                type="number"
                id="quantity"
                name="quantity"
                value={updateProps.quantity}
                onChange={handleUpdateInputChange}
              />
              <InputContainer
                label={`Update the gift's purchase link`}
                type="text"
                id="productLink"
                name="productLink"
                value={updateProps.productLink}
                onChange={handleUpdateInputChange}
              />
            </div>
            <div className="flex flex-row items-center justify-center w-full gap-4 mb-2">
              <UserButton
                className="!w-[130px] !bg-green-500 hover:!bg-green-400"
                content="Confirm"
                id="confirmButton"
                onClick={() => {
                  submitUpdate()
                  setToUpdate(false)
                  setSelectedGiftID(0)
                }}
              />
              <UserButton
                className="!w-[130px] !bg-red-500 hover:!bg-red-400"
                content="Cancel"
                id="cancelButton"
                onClick={() => {
                  setToUpdate(false)
                  setSelectedGiftID(0)
                }}
              />
            </div>
          </>
        )}
      </li>
    </>
  )
}
