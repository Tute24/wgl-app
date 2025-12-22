import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import WeddingHeader from '../wedding-header/wedding-header';
import { giftListMocks } from '../../__mocks__/gift-list-mocks';

describe('WeddingHeader', () => {
  function renderComponent(owner: boolean) {
    return render(
      <WeddingHeader
        owner={owner}
        weddingDate={giftListMocks.listHeader.listHeaderDate}
        weddingTitle={giftListMocks.listHeader.listHeaderTitle}
        id={giftListMocks.listHeader.weddingId}
      />,
    );
  }

  it(`should render the component correctly when the user is the wedding's owner`, () => {
    renderComponent(true);

    expect(screen.getByText('View gifted products')).toBeInTheDocument();
    const ctaLinkText = screen.getByRole('link', {
      name: /view gifted products/i,
    });
    expect(ctaLinkText).toHaveAttribute(
      'href',
      `/portal/giftsTable/${giftListMocks.listHeader.weddingId}`,
    );
    expect(screen.getByText(`${giftListMocks.listHeader.listHeaderTitle}:`)).toBeInTheDocument();
    expect(screen.getByText(`${giftListMocks.listHeader.listHeaderDate}`));
  });

  it(`should render the component correctly when the user is not the wedding's owner`, () => {
    renderComponent(false);

    expect(screen.queryByText('View gifted products')).not.toBeInTheDocument();
    expect(screen.getByText(`${giftListMocks.listHeader.listHeaderTitle}:`)).toBeInTheDocument();
    expect(screen.getByText(`${giftListMocks.listHeader.listHeaderDate}`));
  });
});
