'use client';
import { AxiosApi } from '@/common/axios-api/axios-api';
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler';
import { useGiftsStore } from '@/stores/gifts/gifts.provider';
import { useParams, useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

export default function useGiftPresent() {
  const { setWeddingGifts, weddingGifts, setSelectedGiftID } = useGiftsStore(
    useShallow((store) => ({
      setWeddingGifts: store.setWeddingGifts,
      weddingGifts: store.weddingGifts,
      setSelectedGiftID: store.setSelectedGiftID,
    })),
  );
  const { id } = useParams();
  const route = useRouter();
  async function giftPresent(giftID: number, quantity: number) {
    const sendGiftObj = {
      giftID,
      quantity,
    };
    if (sendGiftObj) {
      try {
        const response = await AxiosApi({
          httpMethod: 'post',
          route: '/gifts/present',
          data: sendGiftObj,
          params: {
            id: Number(id),
          },
        });

        if (response.status === 200) {
          setSelectedGiftID(null);
          setWeddingGifts(
            weddingGifts.map((item) =>
              item.Id === sendGiftObj.giftID
                ? {
                    ...item,
                    quantity: item.quantity - Number(sendGiftObj.quantity),
                  }
                : item,
            ),
          );
        }
      } catch (error) {
        AxiosErrorHandler({ error, route });
      }
    }
  }

  return giftPresent;
}
