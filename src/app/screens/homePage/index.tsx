import React, { useEffect, useState } from "react";
import Statistics from "./Statistics";
import FeaturedProducts from "./FeaturedProducts";
import NewArrivals from "./NewArrivals";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { useAppDispatch } from "../../hooks";
import { setFeaturedProducts, setNewArrivals, setTopMembers } from "./slice";
import { useSelector } from "react-redux";
import { selectTopMembers } from "./selector";
// @ts-ignore: Allow side-effect CSS import without type declarations
import "../../../css/home.css";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const topMembers = useSelector(selectTopMembers);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [arrivalsLoading, setArrivalsLoading] = useState(true);
  const [featuredError, setFeaturedError] = useState("");
  const [arrivalsError, setArrivalsError] = useState("");
  const [membersLoading, setMembersLoading] = useState(true);
  const [membersError, setMembersError] = useState("");

  useEffect(() => {
    let active = true;
    const service = new ProductService();
    const memberService = new MemberService();

    service.getProducts({ page: 1, limit: 4, order: "productViews", sort: "desc" })
      .then((products) => { if (active) dispatch(setFeaturedProducts(products)); })
      .catch(() => { if (active) setFeaturedError("Featured products are unavailable right now."); })
      .finally(() => { if (active) setFeaturedLoading(false); });

    service.getProducts({ page: 1, limit: 4, order: "createdAt", sort: "desc" })
      .then((products) => { if (active) dispatch(setNewArrivals(products)); })
      .catch(() => { if (active) setArrivalsError("New arrivals are unavailable right now."); })
      .finally(() => { if (active) setArrivalsLoading(false); });

    memberService.getTopUsers()
      .then((members) => { if (active) dispatch(setTopMembers(members)); })
      .catch(() => { if (active) setMembersError("Member rankings are unavailable right now."); })
      .finally(() => { if (active) setMembersLoading(false); });

    return () => { active = false; };
  }, [dispatch]);

  return (
    <div className="homepage" >
      <Statistics/>
      <FeaturedProducts loading={featuredLoading} error={featuredError}/>
      <NewArrivals loading={arrivalsLoading} error={arrivalsError}/>
      <Advertisement/>
      <ActiveUsers members={topMembers} loading={membersLoading} error={membersError}/>
      <Events/>
    </div>
  )
}
