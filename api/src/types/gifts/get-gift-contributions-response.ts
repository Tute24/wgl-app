export type TreatedGiftContribution = {
  id: number;
  presenterName: string;
  giftName: string;
  giftedQuantity: number;
  giftId: number;
  giftedAt: Date | null;
};

export type GetGiftContributionsResponse = {
  giftContributions: TreatedGiftContribution[];
  weddingHeader: { weddingId: number; weddingTitle: string; weddingDate: string };
};
