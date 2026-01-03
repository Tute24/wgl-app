export type WeddingStruct = {
  weddingTitle: string;
  weddingDate: string;
  shippingAddress: string;
  id: number;
  createdAt: Date | null;
  createdBy: string;
};

export type GetWeddingsResponse = {
  ownWeddings: WeddingStruct[];
  invitedWeddings: WeddingStruct[];
};
