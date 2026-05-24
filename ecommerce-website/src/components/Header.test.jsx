import { beforeEach, describe, expect, it } from "vitest";
import { Header } from "./Header";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

describe('Testing Header Component', () => {

  let cart;

  beforeEach(() => {
    cart = [
      {
        "id": 16,
        "productId": "10ed8504-57db-433c-b0a3-fc71a35c88a1",
        "quantity": 1,
        "deliveryOptionId": "1",
        "createdAt": "2025-11-27T16:28:12.412Z",
        "updatedAt": "2025-11-27T16:28:12.412Z"
      },
      {
        "id": 17,
        "productId": "bc2847e9-5323-403f-b7cf-57fde044a955",
        "quantity": 1,
        "deliveryOptionId": "1",
        "createdAt": "2025-11-27T16:28:14.019Z",
        "updatedAt": "2025-11-27T16:28:14.019Z"
      }
    ]

  });

  it('Header display correctly', () => {
    render(
      <MemoryRouter>
        <Header cart={cart} />
      </MemoryRouter>
    );

    expect(
      screen.getByTestId('header-logo')
    ).toHaveAttribute('src', '/src/assets/images/logo-white.png');

    expect(
      screen.getByTestId('header-mobile-logo')
    ).toHaveAttribute('src', '/src/assets/images/mobile-logo-white.png');

    expect(
      screen.getByTestId('header-search-bar')
    ).toBeInTheDocument();

    expect(screen.getByTestId('header-search-button')).toBeInTheDocument();

    expect(screen.getByTestId('header-search-button-icon')
    ).toHaveAttribute('src', '/src/assets/images/icons/search-icon.png');

    expect(screen.getByTestId('order-header-link')).toHaveTextContent('Orders');

    const cartLink = screen.getByTestId('header-cart-link');

    expect(cartLink).toHaveTextContent('2');
    expect(cartLink).toHaveTextContent('Cart');
    expect(cartLink).toHaveAttribute('href', '/checkout');
    expect(screen.getByTestId('header-cart-icon')).toHaveAttribute('src', '/src/assets/images/icons/cart-icon.png');

  });

});