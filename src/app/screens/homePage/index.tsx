import React, { useEffect, useState } from "react";
import Statistics from "./Statistics";
import FeaturedProducts from "./FeaturedProducts";
import NewArrivals from "./NewArrivals";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import ProductService from "../../services/ProductService";
import { useAppDispatch } from "../../hooks";
import { setFeaturedProducts, setNewArrivals } from "./slice";
// @ts-ignore: Allow side-effect CSS import without type declarations
import "../../../css/home.css";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [arrivalsLoading, setArrivalsLoading] = useState(true);
  const [featuredError, setFeaturedError] = useState("");
  const [arrivalsError, setArrivalsError] = useState("");

  useEffect(() => {
    let active = true;
    const service = new ProductService();

    service.getProducts({ page: 1, limit: 4, order: "productViews", sort: "desc" })
      .then((products) => { if (active) dispatch(setFeaturedProducts(products)); })
      .catch(() => { if (active) setFeaturedError("Featured products are unavailable right now."); })
      .finally(() => { if (active) setFeaturedLoading(false); });

    service.getProducts({ page: 1, limit: 4, order: "createdAt", sort: "desc" })
      .then((products) => { if (active) dispatch(setNewArrivals(products)); })
      .catch(() => { if (active) setArrivalsError("New arrivals are unavailable right now."); })
      .finally(() => { if (active) setArrivalsLoading(false); });

    return () => { active = false; };
  }, [dispatch]);

  return (
    <div className="homepage" >
      <Statistics/>
      <FeaturedProducts loading={featuredLoading} error={featuredError}/>
      <NewArrivals loading={arrivalsLoading} error={arrivalsError}/>
      <Advertisement/>
      <ActiveUsers/>
      <Events/>
    </div>
  )
}
