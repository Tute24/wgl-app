export type GiftDisplayStruct = {
  productName: string;
  productLink: string;
  quantity: number;
};

export type GiftStruct = {
  id: number;
  createdAt: Date | null;
  quantity: number;
  productName: string;
  productLink: string;
  fromWedding: number;
};
