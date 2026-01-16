export type WeddingStruct = {
  weddingTitle: string;
  weddingDate: string;
  shippingAddress: string;
  id: number;
  createdAt: Date | null;
  createdBy: string;
};

export type InvitedWeddingType = Pick<
  WeddingStruct,
  'id' | 'weddingTitle' | 'weddingDate' | 'shippingAddress' | 'createdAt'
>;
export type GetWeddingsResponse = {
  ownWeddings: WeddingStruct[];
  invitedWeddings: InvitedWeddingType[];
};
