import { ColumnDef } from '@tanstack/react-table';
import { GiftedProductsProps } from '@/stores/gifts/gifts.store';

export const columns: ColumnDef<GiftedProductsProps>[] = [
  {
    accessorKey: 'gift',
    header: 'Gifted Product',
  },
  {
    accessorKey: 'presenter',
    header: 'Gifted By',
  },
  {
    accessorKey: 'quantityGifted',
    header: 'Quantity',
  },
  {
    accessorKey: 'giftedAt',
    header: 'Gifted At',
  },
];
