import { render, screen } from '@testing-library/react';
import CartItem from '../../components/general/CartItem';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const item = { title: 'foo', price: 42, quantity: 2 };

describe('CartItem component', () => {
  it('renders item image', () => {
    render(
      <BrowserRouter>
        <CartItem item={item} />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole('img', { name: /item image/i }),
    ).toBeInTheDocument();
  });

  it('renders item title', () => {
    render(
      <BrowserRouter>
        <CartItem item={item} />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole('heading', { name: item.title }).textContent,
    ).toMatch(item.title);
  });

  it('renders item price', () => {
    render(
      <BrowserRouter>
        <CartItem item={item} />
      </BrowserRouter>,
    );

    expect(screen.getByText(`$${item.price.toString()}`)).toBeInTheDocument();
  });

  it('renders item quantity', () => {
    render(
      <BrowserRouter>
        <CartItem item={item} />
      </BrowserRouter>,
    );

    expect(screen.getByText(`${item.quantity}`)).toBeInTheDocument();
  });

  it('renders delete item button that calls a function when clicked', async () => {
    const deleteItem = vi.fn();
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <CartItem item={item} deleteItem={deleteItem} />
      </BrowserRouter>,
    );

    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /delete/i }));

    expect(deleteItem).toHaveBeenCalled();
  });

  it('renders plus and minus item buttons that call a function when clicked', async () => {
    const plusItem = vi.fn();
    const minusItem = vi.fn();
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <CartItem item={item} plusItem={plusItem} minusItem={minusItem} />
      </BrowserRouter>,
    );

    expect(screen.getByRole('button', { name: /plus/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /minus/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /plus/i }));
    await user.click(screen.getByRole('button', { name: /minus/i }));

    expect(plusItem).toHaveBeenCalled();
    expect(minusItem).toHaveBeenCalled();
  });
});
