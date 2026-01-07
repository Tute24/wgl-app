import { WeddingRole } from '@/enums/weddings/wedding-role';
import { GetUserRoleOnWeddingType } from '@/types/weddings/wedding-access-policy';

export class WeddingAccessPolicies {
  static getUserRoleOnWedding(data: GetUserRoleOnWeddingType): WeddingRole {
    if (data.wedding.createdBy === data.userId) {
      return WeddingRole.OWNER;
    } else if (data.guestWeddingIds.includes(data.wedding.id)) {
      return WeddingRole.GUEST;
    } else {
      return WeddingRole.NONE;
    }
  }

  static isAccessToGiftsAllowed(role: WeddingRole): boolean {
    if (role === WeddingRole.NONE) return false;

    return true;
  }

  static isGiftContributionAllowed(role: WeddingRole): boolean {
    if (role === WeddingRole.NONE) return false;

    return true;
  }
}
