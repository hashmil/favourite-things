import { render, screen } from '@testing-library/react';
import { ItemCard } from '@/components/item-card';
import type { Item } from '@/lib/types';

jest.mock('next/image', () => ({ __esModule: true, default: (props: any) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={props.alt} {...props} />;
}}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => <a href={href} {...props}>{children}</a>
}));

const mockItem: Item = {
  id: 'it-x',
  slug: 'test-item',
  name: 'Test Item',
  brand: 'Brand',
  image: '/images/item-1.svg',
  list: 'favourites',
  category: 'Test',
  tags: [],
  description: 'desc',
  buyUrl: '#',
  addedAt: '2024-01-01T00:00:00.000Z'
};

describe('ItemCard', () => {
  it('renders name, brand and links to slug', () => {
    render(<ItemCard item={mockItem} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Brand')).toBeInTheDocument();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/item/test-item');
  });
});

