import { RegisterGiftContributionRepositoryDto } from '@/dtos/gift-contributions/register-gift-contribution';
import { GiftContributionsRepository } from '../gift-contributions-repository';
import prisma from '@/lib/prisma';

export class PrismaGiftContributionsRepository implements GiftContributionsRepository {
  async registerGiftContribution(data: RegisterGiftContributionRepositoryDto) {
    await prisma.giftContribution.create({
      data: {
        presenter: data.presenter,
        relatedWedding: data.relatedWedding,
        quantity: data.quantity,
        giftId: data.giftId,
      },
    });
  }

  async findGiftContributionsByWeddingId(weddingId: number) {
    const weddingGiftContributions = await prisma.giftContribution.findMany({
      where: {
        relatedWedding: weddingId,
      },
      include: {
        user: true,
        gift: true,
      },
    });

    return weddingGiftContributions;
  }
}
