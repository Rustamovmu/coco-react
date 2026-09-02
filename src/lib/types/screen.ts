import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";



/** REACT APP STATE */
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
}
/** HOME PAGE STATE */
export interface HomePageState {
  featuredProducts: Product[];
  newArrivals: Product[];
  topMembers: Member[];
}

/** PRODUCT PAGE STATE */
export interface ProductsPageState {
  chosenProduct: Product | null;
  products: Product[];
}

/** ORDERS PAGE STATE */
export interface OrdersPageState {
  pendingOrders: Order[];
  processingOrders: Order[];
  completedOrders: Order[];
}
