import { WeddingsProps } from '@/stores/weddings/weddings.store'

export const mockWedding: WeddingsProps = {
  id: 1,
  weddingTitle: 'Wedding1',
  weddingDate: '01-01-2025',
  shippingAddress: 'Street1',
  createdBy: 'User1',
}

export const mockNewList = {
  listTitle: 'Wedding1',
  weddingDate: '2025-01-01',
  shippingAddress: 'Street1',
  gifts: [
    {
      productName: 'Gift1',
      productLink: 'https://gift1.com',
      quantity: '1',
    },
  ],
}
