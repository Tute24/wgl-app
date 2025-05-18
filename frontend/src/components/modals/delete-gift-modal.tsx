import { useEffect, useRef } from 'react'
import UserButton from '../Common/buttons/user-button/user-button'
import { IoIosCloseCircleOutline } from 'react-icons/io'

export interface deleteWeddingModalProps {
  gift: string
  onCloseModal: () => void
  onDelete: (id: number) => Promise<void>
  isOpen: boolean
  id: number
}

export default function DeleteGiftModal({
  gift,
  onCloseModal,
  onDelete,
  isOpen,
  id,
}: deleteWeddingModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (isOpen && dialog && !dialog.open) {
      dialog.showModal()
    }
    if (!isOpen && dialog && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      className="rounded-xl p-6 w-full max-w-sm sm:max-w-md sm:mx-auto shadow-lg backdrop:bg-black/30"
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-end">
          <button
            onClick={onCloseModal}
            className="text-mutedTaupe hover:text-amber-800"
          >
            <IoIosCloseCircleOutline size={24} />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="text-amber-800 flex flex-col gap-2">
            <h2>
              Are you sure you want to delete{' '}
              <span className="font-bold">{gift}</span>?
            </h2>
            <h3 className="text-sm font-light">
              This action can't be undone, and this gift will be deleted
              permanently from your list.
            </h3>
          </div>
          <div className="flex flex-row gap-4 items-center justify-between">
            <UserButton
              content="Cancel"
              onClick={onCloseModal}
              className="w-[130px]"
            />
            <UserButton
              content="Delete"
              onClick={() => {
                onDelete(id)
                onCloseModal()
              }}
              className="w-[130px] bg-red-500 hover:bg-red-400"
            />
          </div>
        </div>
      </div>
    </dialog>
  )
}
