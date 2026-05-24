import { NavLink, useNavigate, useSearchParams, useLocation } from 'react-router';
import CartIcon from '../assets/images/icons/cart-icon.png';
import LogoWhite from '../assets/images/logo-white.png';
import MobileLogoWhite from '../assets/images/mobile-logo-white.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import './header.css';
import { useState, useEffect, useRef } from 'react';

type HeaderProp = {
  cart: {
    productId: string;
    quantity: number;
    deliveryOptions: string;
  }[];
};

export function Header({ cart }: HeaderProp) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search');
  const [search, setSearch] = useState(searchText || '');
  const isMounted = useRef(false); // track if component has mounted

  const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const searchProducts = () => {
    navigate(`/?search=${search}`);
  };

  useEffect(() => {
    // Skip the effect on the initial mount
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    // Only trigger search navigation when the user is on the home page
    if (location.pathname !== '/') return;

    // Don't navigate if search is empty — let the user browse freely
    if (!search.trim()) {
      navigate('/');
      return;
    }

    const debounceTimer = setTimeout(() => {
      navigate(`/?search=${search}`);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [search]);

  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" data-testid="header-logo" src={LogoWhite} />
          <img className="mobile-logo" data-testid="header-mobile-logo" src={MobileLogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          value={search}
          onChange={updateSearchInput}
          className="search-bar"
          data-testid="header-search-bar"
          type="text"
          placeholder="Search"
        />
        <button className="search-button" onClick={searchProducts} data-testid="header-search-button">
          <img className="search-icon" data-testid="header-search-button-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders" data-testid="order-header-link">
          <span className="orders-text">Orders</span>
        </NavLink>
        <NavLink className="cart-link header-link" to="/checkout" data-testid="header-cart-link">
          <img className="cart-icon" data-testid="header-cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}