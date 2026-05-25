import axios from "axios";
import { api } from "../../lib/api";
import { useNavigate } from "react-router";
import { formatMoney } from "../../utils/money";

export function PaymentSummary({ paymentSummary, loadCart }) {

      const navigate = useNavigate()


  const createOrder = async () => {
    await axios.post(api('/api/orders'));
    await loadCart();

    navigate('/orders');
  }

  return (

    <div className="payment-summary" data-testid="payment-summary">
      <div className="payment-summary-title">
        Payment Summary
      </div>

      {paymentSummary && (
        <>

          <div className="payment-summary-row"  data-testid="total-payment-cost">
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
          </div>

          <div className="payment-summary-row" data-testid="payment-handling">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
          </div>

          <div className="payment-summary-row subtotal-row" data-testid="payment-tax">
            <div>Total before tax:</div>
            <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
          </div>

          <div className="payment-summary-row" data-testid="estimated-payment-tax">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
          </div>

          <div className="payment-summary-row total-row" data-testid="order-total">
            <div>Order total:</div>
            <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
          </div>

          <button className="place-order-button button-primary"
          data-testid="place-order-button"
          onClick={createOrder}>
            Place your order
          </button>

        </>
      )}

    </div>

  );
}