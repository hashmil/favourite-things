import { render, screen, fireEvent, within } from '@testing-library/react';
import { Grid } from '@/components/grid';
import type { Item } from '@/lib/types';

jest.mock('next/image', () => ({ __esModule: true, default: (props: any) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={props.alt} {...props} />;
}}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => <a href={href} {...props}>{children}</a>
}));

const items: Item[] = [
  { id: '1', slug: 'a', name: 'Alpha', brand: 'Acme', image: '/images/item-1.svg', list: 'favourites', category: 'Tech', tags: ['tag1'], description: '', addedAt: '2024-01-01T00:00:00.000Z' },
  { id: '2', slug: 'b', name: 'Beta', brand: 'Bravo', image: '/images/item-2.svg', list: 'favourites', category: 'Audio', tags: ['tag2'], description: '', addedAt: '2024-01-02T00:00:00.000Z' },
  { id: '3', slug: 'c', name: 'Gamma', brand: 'Acme', image: '/images/item-3.svg', list: 'favourites', category: 'Tech', tags: ['tag1','tag2'], description: '', addedAt: '2024-01-03T00:00:00.000Z' }
];

describe('Grid', () => {
  it('renders all items and filters by search', () => {
    render(<Grid items={items} />);
    expect(screen.getAllByRole('link')).toHaveLength(3);
    const search = screen.getByRole('textbox', { name: /search/i });
    fireEvent.change(search, { target: { value: 'alpha' } });
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  it('filters by category and tag', () => {
    render(<Grid items={items} />);
    const categorySelect = screen.getByLabelText(/category/i);
    fireEvent.change(categorySelect, { target: { value: 'Tech' } });
    // Two tech items
    expect(screen.getAllByRole('link')).toHaveLength(2);

    // Toggle tag1 badge
    const tagButton = screen.getByRole('button', { name: /#tag1/i });
    fireEvent.click(tagButton);
    expect(screen.getAllByRole('link')).toHaveLength(2);

    // Toggle tag2 too -> should narrow to 1 (Gamma)
    const tag2Button = screen.getByRole('button', { name: /#tag2/i });
    fireEvent.click(tag2Button);
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });
});

