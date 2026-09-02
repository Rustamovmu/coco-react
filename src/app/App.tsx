import React from "react";
import "../css/app.css";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import { ProductsPage } from "./screens/productsPage";
import { OrdersPage } from "./screens/ordersPage";
import { UserPage } from "./screens/userPage";
import { HelpPage } from "./screens/helpPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar  from "./components/headers/OtherNavbar";
import Footer  from "./components/footer";

function App() {
  const location = useLocation();
  return ( 
    <div className="coco-app-shell">
      {location.pathname === "/" ? <HomeNavbar/> : <OtherNavbar/>}
      <main className="coco-app-shell__main">
        <Switch>
          <Route path="/products">
            <ProductsPage/>
          </Route>
          <Route path="/orders">
            <OrdersPage/>
          </Route>
          <Route path="/member-page">
            <UserPage/>
          </Route>
          <Route path="/help">
            <HelpPage/>
          </Route>
          <Route exact path="/">
            <HomePage/>
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}


export default App;
