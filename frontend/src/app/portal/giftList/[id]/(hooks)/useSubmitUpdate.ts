import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler';
import { useRouter } from 'next/navigation';
import { AxiosApi } from '@/common/axios-api/axios-api';
import { useGiftsStore } from '@/stores/gifts/gifts.provider';
import { useShallow } from 'zustand/shallow';
import { objValuesType } from '../(components)/giftsListDisplay/owner-list';

export default function useSubmitUpdate() {
  const { setWeddingGifts, weddingGifts, setSelectedGiftID } = useGiftsStore(
    useShallow((store) => ({
      setWeddingGifts: store.setWeddingGifts,
      weddingGifts: store.weddingGifts,
      setSelectedGiftID: store.setSelectedGiftID,
    })),
  );
  const route = useRouter();
  async function submitUpdate(objValues: objValuesType, giftID: number) {
    const updateProps = {
      productLink: objValues.productLink,
      productName: objValues.productName,
      quantity: objValues.quantity,
      giftID,
    };
    try {
      const response = await AxiosApi({
        httpMethod: 'post',
        route: '/gifts/update',
        data: updateProps,
      });
      if (response.status === 200) {
        setSelectedGiftID(null);
        setWeddingGifts(
          weddingGifts.map((gift) =>
            updateProps.giftID === gift.Id
              ? {
                  ...gift,
                  productLink: updateProps.productLink,
                  productName: updateProps.productName,
                  quantity: updateProps.quantity,
                }
              : gift,
          ),
        );
      }
    } catch (error) {
      AxiosErrorHandler({ error, route });
    }
  }
  return submitUpdate;
}
