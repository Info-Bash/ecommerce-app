import { it, describe, vi, beforeEach, expect } from "vitest";
import { PaymentSummary } from "./PaymentSummary";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import axios from "axios";
import userEvent from "@testing-library/user-event";

vi.mock('axios')


describe('Testing Payment Summary', () => {

  let productSummary;
  let user;
  let loadCart;

  beforeEach(() => {

    productSummary = {
      "totalItems": 2,
      "productCostCents": 7190,
      "shippingCostCents": 0,
      "totalCostBeforeTaxCents": 7190,
      "taxCents": 719,
      "totalCostCents": 7909
    };

    user = userEvent.setup()

    loadCart = vi.fn();
  });


  it('Displays and functions correctly', async () => {
    function Location () {
      const location = useLocation();
      return (
        <div data-testid="url-path">{location.pathname}</div>
      );
    }

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={productSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>
    );

    expect(screen.getByText('Items (2):')).toBeInTheDocument();

    expect(
      within(screen.getByTestId('total-payment-cost')).getByText('$71.90')
    ).toBeInTheDocument();

    expect(screen.getByText('Shipping & handling:')).toBeInTheDocument();

    expect(
      within(screen.getByTestId('payment-handling')).getByText('$0.00')
    ).toBeInTheDocument();

    expect(screen.getByText('Total before tax:')).toBeInTheDocument();

    expect(
      within(screen.getByTestId('payment-tax')).getByText('$71.90')
    ).toBeInTheDocument();

    expect(screen.getByText('Estimated tax (10%):')).toBeInTheDocument();

    expect(
      within(screen.getByTestId('estimated-payment-tax')).getByText('$7.19')
    ).toBeInTheDocument();

    expect(screen.getByText('Order total:')).toBeInTheDocument();

    expect(
      within(screen.getByTestId('order-total')).getByText('$79.09')
    ).toBeInTheDocument();

    /* using .toHaveTextContent() for the order total row */

    expect(screen.getByTestId('order-total')).toHaveTextContent('Order total:$79.09');

    /* -------- Ends ----------- */

    const placeOrderButton = screen.getByTestId('place-order-button');

    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(loadCart).toHaveBeenCalled();

    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');

  });

});