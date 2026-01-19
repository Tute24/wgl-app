import { UserStruct } from '../users/user';
import { WeddingStruct } from '../weddings/wedding';

export type GetGuestRequestsHistoryResponse = {
  id: number;
  relatedWedding: number;
  pending: boolean;
  accepted: boolean;
  madeOn: Date | null;
  user: Pick<UserStruct, 'email' | 'firstName' | 'lastName'>;
  wedding: WeddingStruct;
};

export type GetGuestRequestsHistoryServiceResponse = {
  requests: GetGuestRequestsHistoryResponse[];
};
