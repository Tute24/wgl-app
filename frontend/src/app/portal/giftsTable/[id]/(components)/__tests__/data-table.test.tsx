import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DataTable } from '../data-table'
import { giftListMocks } from '@/app/portal/giftList/[id]/__mocks__/gift-list-mocks'

const mockColumns = [
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

describe('DataTable', () => {
  it('should render the table with the correct data', () => {
    render(
      <DataTable columns={mockColumns} data={giftListMocks.mappingAddGifter} />,
    )
    expect(screen.getByText('Gifted Product')).toBeInTheDocument()
    expect(screen.getByText('Gifted By')).toBeInTheDocument()
    expect(screen.getByText('Quantity')).toBeInTheDocument()
    expect(screen.getByText('Gifted At')).toBeInTheDocument()
    expect(
      screen.getByText(`${giftListMocks.mappingAddGifter[0].gift}`),
    ).toBeInTheDocument()
    expect(
      screen.getByText(`${giftListMocks.mappingAddGifter[0].presenter}`),
    ).toBeInTheDocument()
    expect(
      screen.getByText(`${giftListMocks.mappingAddGifter[0].quantityGifted}`),
    ).toBeInTheDocument()
    expect(
      screen.getByText(`${giftListMocks.mappingAddGifter[0].giftedAt}`),
    ).toBeInTheDocument()
    expect(
      screen.getByText(`${giftListMocks.mappingAddGifter[1].gift}`),
    ).toBeInTheDocument()
    expect(
      screen.getByText(`${giftListMocks.mappingAddGifter[1].presenter}`),
    ).toBeInTheDocument()
    expect(
      screen.getByText(`${giftListMocks.mappingAddGifter[1].quantityGifted}`),
    ).toBeInTheDocument()
    expect(
      screen.getByText(`${giftListMocks.mappingAddGifter[1].giftedAt}`),
    ).toBeInTheDocument()
  })
})
