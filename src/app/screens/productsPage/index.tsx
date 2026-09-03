import { Route, Switch, useRouteMatch } from "react-router-dom";
import { CartInterface } from "../../../lib/types/cart";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import "../../../css/products.css";

export function ProductsPage({ cart }: { cart: CartInterface }) {
  const { path } = useRouteMatch();
  return <Switch><Route path={`${path}/:productId`}><ChosenProduct cart={cart} /></Route><Route path={path}><Products cart={cart} /></Route></Switch>;
}

export default ProductsPage;
