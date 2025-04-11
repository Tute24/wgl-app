import { ColumnDef } from '@tanstack/react-table'
import { giftedProductsType } from '../(hooks)/useGetGiftedProducts'

export const columns: ColumnDef<giftedProductsType>[] = [
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
]
