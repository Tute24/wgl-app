import { UserStruct } from '../users/user';
import { WeddingStruct } from '../weddings/wedding';

export type GetGuestRequestsHistoryResponse = {
  id: number;
  requestBy: string;
  relatedWedding: number;
  pending: boolean;
  accepted: boolean;
  madeOn: Date | null;
  user: UserStruct;
  wedding: WeddingStruct;
};

export type GetGuestRequestsHistoryServiceResponse = {
  requests: GetGuestRequestsHistoryResponse[];
};
