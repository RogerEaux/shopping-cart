import { render, screen } from '@testing-library/react';
import SearchBar from '../../components/general/SearchBar';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('SearchBar component', () => {
  it('renders text input', () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>,
    );
    expect(
      screen.getByRole('textbox', { name: /search/i }),
    ).toBeInTheDocument();
  });

  it('renders search button', () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>,
    );
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /search/i })).toBeInTheDocument();
  });
});
