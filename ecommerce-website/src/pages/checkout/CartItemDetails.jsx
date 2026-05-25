import axios from "axios";
import { api } from "../../lib/api";
import { getImageUrl } from "../../lib/image";
import { useState } from "react";
import { formatMoney } from "../../utils/money";


export function CartItemDetails({ cartItem, deleteCartItem, loadCart }) {

  const [quantity, setQuantity] = useState(cartItem.quantity)
  const [cartQuantityUpdate, setCartQuantityUpdate] = useState(false);

  const quantityChange = (event) => {
    const currentValue = event.target.value;
    setQuantity(currentValue);
  }

  const updateONEntEsc = (event) => {
    
    if (event.key === 'Enter'){
      updateQuantity();
    } else if (event.key === 'Escape'){
      setQuantity(cartItem.quantity);
      setCartQuantityUpdate(false);
    }
  }

  const updateQuantity = async () => {
    /*     setCartQuantityUpdate(cartQuantityUpdate ? false : true);
     */
    if (cartQuantityUpdate) {
      await axios.put(api(`/api/cart-items/${cartItem.productId}`), {
        quantity: Number(quantity)
      });
      await loadCart();
      setCartQuantityUpdate(false)
    } else {
      setCartQuantityUpdate(true)
    }
  }

  return (
    <>
      <img className="product-image"
        src={getImageUrl(cartItem.product.image)} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: {cartQuantityUpdate ?
              <input value={quantity} onKeyDown={updateONEntEsc} onChange={quantityChange} className="update-cart-quantity" type="text" />
              :
              <span className="quantity-label">{cartItem.quantity}</span>}
          </span>
          <span className="update-quantity-link link-primary" onClick={updateQuantity}>
            Update
          </span>
          <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}