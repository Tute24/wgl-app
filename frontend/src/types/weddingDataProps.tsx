import giftsProps from "./giftsProps"

export default interface weddingDataProps {
    id: string
    weddingTitle: string
    weddingDate: string
    shippingAddress?: string
    createdBy: string
    gifts: giftsProps[]
}