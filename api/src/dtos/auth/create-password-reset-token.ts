export interface CreatePasswordResetTokenDto {
  userId: string;
  token: string;
  expirationDate: bigint;
}
