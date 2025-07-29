import RequestCard from './(components)/request-card'

const mockRequests = [
  {
    madeOn: '2025-07-12',
    id: 1,
    requestBy: 'user123',
    relatedWedding: 101,
    requestByName: 'Maria Silva',
    weddingTitle: 'Casamento na Praia',
    pending: true,
    accepted: false,
  },
  {
    madeOn: '2025-07-11',
    id: 2,
    requestBy: 'user456',
    relatedWedding: 102,
    requestByName: 'João Souza',
    weddingTitle: 'Casamento no Campo',
    pending: false,
    accepted: true,
  },
  {
    madeOn: '2025-07-10',
    id: 3,
    requestBy: 'user789',
    relatedWedding: 101,
    requestByName: 'Ana Costa',
    weddingTitle: 'Casamento na Praia',
    pending: false,
    accepted: false,
  },
]

export default function RequestsHistoryPage() {
  return (
    <div className="px-3">
      <div className="flex flex-col items-center mx-auto px-4 py-10 gap-5">
        {mockRequests
          .sort((a, b) => Number(b.pending) - Number(a.pending))
          .map((request) => (
            <RequestCard
              key={request.id}
              requestId={request.id}
              madeOn={request.madeOn}
              weddingTitle={request.weddingTitle}
              requestByName={request.requestByName}
              pending={request.pending}
              accepted={request.accepted}
            />
          ))}
      </div>
    </div>
  )
}
