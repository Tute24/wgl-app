import giftsProps from './giftsProps'

export default interface weddingDataProps {
  id: number
  weddingTitle: string
  weddingDate: string
  shippingAddress?: string
  createdBy: string
  gifts: giftsProps[]
}
