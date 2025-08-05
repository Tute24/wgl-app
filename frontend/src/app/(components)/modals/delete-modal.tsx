import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Spinner } from '../Common/spinner/spinner'

export interface deleteModalProps {
  itemName: string
  onCloseModal: () => void
  onDelete: (id: number) => Promise<void>
  isOpen: boolean
  id: number
  ctaText: string
  isLoading: boolean
}

export default function DeleteModal({
  itemName,
  onCloseModal,
  onDelete,
  isOpen,
  id,
  ctaText,
  isLoading,
}: deleteModalProps) {
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (isOpen) {
      setOpen(isOpen)
    }
  }, [isOpen])

  return (
    <div className="font-inter">
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value)
          if (!value) onCloseModal()
        }}
      >
        <DialogContent className="font-inter mx-2 sm:mx-0 sm:w-full max-w-[300px] sm:max-w-auto sm:min-w-[500px] rounded-xl">
          <DialogHeader>
            <DialogTitle className="items-center text-center text-2xl text-stone-700 font-bold">
              Confirm the deletion
            </DialogTitle>
            <DialogDescription className="gap-3 text-start" asChild>
              <div className="pt-1 text-md font-medium">
                <p className="pb-3">
                  Are you sure you want to delete{' '}
                  <span className="font-bold text-amber-800 underline">
                    {itemName}
                  </span>{' '}
                  ?
                </p>
                <p>
                  This action can't be undone, and all the data related to the
                  wedding will be excluded as well.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-4">
            <Button
              onClick={() => {
                setOpen(false)
                onCloseModal()
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onDelete(id)
                setOpen(false)
                onCloseModal()
              }}
              className="bg-red-600 hover:bg-red-500"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : ctaText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
