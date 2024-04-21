import { render, screen } from '@testing-library/react';
import ItemGrid from '../../components/shop/ItemGrid';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.mock('../../components/shop/ItemCard', () => ({
  default: ({ item }) => (
    <a key={item.id} href="/">
      {item.title}
      {item.price}
    </a>
  ),
}));

const items = [
  { id: 1, title: 'foo', price: 1 },
  { id: 2, title: 'bar', price: 3 },
  { id: 3, title: 'baz', price: 2 },
];

describe('ItemGrid component', () => {
  it('renders number of items displayed', () => {
    render(<ItemGrid items={items} />);

    expect(screen.getByText(`${items.length} items`)).toBeInTheDocument();
  });

  it('renders grid of items', () => {
    render(<ItemGrid items={items} />);

    expect(screen.getAllByRole('link')[0].textContent).toMatch('foo');
    expect(screen.getAllByRole('link')[1].textContent).toMatch('bar');
    expect(screen.getAllByRole('link')[2].textContent).toMatch('baz');
  });

  it('renders items sorted by low to high price', async () => {
    const user = userEvent.setup();

    render(<ItemGrid items={items} />);

    await user.selectOptions(screen.getByRole('combobox'), 'Price Low to High');

    expect(screen.getAllByRole('link')[0].textContent).toMatch('1');
    expect(screen.getAllByRole('link')[1].textContent).toMatch('2');
    expect(screen.getAllByRole('link')[2].textContent).toMatch('3');
  });
});