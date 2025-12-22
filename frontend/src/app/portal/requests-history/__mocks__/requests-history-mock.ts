import { requestsResponseProps } from '@/stores/requests/requests.store';

export const requestsResponseMock: requestsResponseProps[] = [
  {
    madeOn: '2025-10-16T12:30:00Z',
    id: 1,
    weddingTitle: 'Ana & John Wedding',
    requestBy: 'user123',
    relatedWedding: 101,
    requestByName: 'Name1',
    pending: true,
    accepted: false,
  },
  {
    madeOn: '2025-10-15T09:45:00Z',
    id: 2,
    weddingTitle: 'Peter & Mary Wedding',
    requestBy: 'user456',
    relatedWedding: 102,
    requestByName: 'Name2',
    pending: false,
    accepted: true,
  },
];
