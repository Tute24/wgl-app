import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useAcceptRequest } from '../(hooks)/useAcceptRequest'
import { useDenyRequest } from '../(hooks)/useDenyRequest'

export interface RequestCardProps {
  requestId: number
  madeOn: string
  weddingTitle: string
  requestByName: string
  pending: boolean
  accepted: boolean
}

export default function RequestCard({ ...RequestCardProps }: RequestCardProps) {
  const acceptRequest = useAcceptRequest()
  const denyRequest = useDenyRequest()
  return (
    <Card className=" min-w-[350px] sm:min-w-[450px] pt-6">
      <CardContent>
        <div className="flex flex-col gap-3 justify-start items-start font-inter text-stone-800 font-medium">
          <div>
            Request to access{' '}
            <span className="text-amber-800 font-bold">
              {RequestCardProps.weddingTitle}'s
            </span>{' '}
            list
          </div>
          <div>
            Made by:{' '}
            <span className="text-amber-800 font-bold">
              {RequestCardProps.requestByName}
            </span>
          </div>
          <div>
            Made on:{' '}
            <span className="text-amber-800 font-bold">
              {RequestCardProps.madeOn}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="font-inter text-stone-800 font-medium flex flex-col justify-start items-start gap-6">
        <hr className="w-full bg-stone-700" />
        {RequestCardProps.pending ? (
          <div className="flex flex-row gap-6 items-center justify-start">
            <div>
              <Button
                onClick={() => acceptRequest(RequestCardProps.requestId)}
                className="bg-green-400 hover:bg-green-500 text-stone-600 font-medium"
              >
                Accept Request
              </Button>
            </div>
            <div>
              <Button
                onClick={() => denyRequest(RequestCardProps.requestId)}
                className="bg-red-500 hover:bg-red-600 font-medium"
              >
                Deny Request
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center">
            <p>
              {' '}
              This request was{' '}
              {RequestCardProps.accepted ? (
                <span className="text-green-500 font-bold">Accepted</span>
              ) : (
                <span className="text-red-500 font-bold">Denied</span>
              )}
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
