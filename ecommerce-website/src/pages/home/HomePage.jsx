import axios from 'axios';
import { api } from "../../lib/api";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../../components/Header';
import { ProductGrid } from './ProductsGrid';
import './HomePage.css';

export function HomePage({ cart, loadCart }) {

  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  
  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search ? `/api/products?search=${search}` : '/api/products';
      const response = await axios.get(api(urlPath));
      setProducts(response.data);
    }
    
    getHomeData();

  }, [search])

  return (

    <>

      <link rel="icon" type="image/svg+xml" href="images/home-favicon.png" />

      <Header cart={cart}/>

      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart}/>
      </div>

    </>

  );
}