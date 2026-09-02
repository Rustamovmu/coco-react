import React from "react";
import Statistics from "./Statistics";
import FeaturedProducts from "./FeaturedProducts";
import NewArrivals from "./NewArrivals";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
// @ts-ignore: Allow side-effect CSS import without type declarations
import "../../../css/home.css";

export default function HomePage() {
  return (
    <div className="homepage" >
      <Statistics/>
      <FeaturedProducts/>
      <NewArrivals/>
      <Advertisement/>
      <ActiveUsers/>
      <Events/>
    </div>
  )
}
