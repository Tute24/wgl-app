export interface UpdateGiftStruct {
  productName?: string;
  productLink?: string;
  quantity?: number;
}

export interface UpdateGiftDataRepositoryDto {
  giftId: number;
  updateData: UpdateGiftStruct;
}

export interface UpdateGiftDataServiceDto {
  userId: string;
  giftId: number;
  updateData: UpdateGiftStruct;
}
