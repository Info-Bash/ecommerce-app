import { Header } from "../components/Header";
import './PageNotFound.css';

export function PageNotFound ({ cart }) {
  return(
    <>

      <title>404</title>
      <Header cart={cart} />

      <div className="not-found-message">
        Page Not Found
      </div>
    </>
  );
}