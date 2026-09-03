import React, { useCallback, useState } from "react";
import "../css/app.css";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import { OrdersPage } from "./screens/ordersPage";
import { UserPage } from "./screens/userPage";
import { HelpPage } from "./screens/helpPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import AuthenticationModal from "./components/auth";
import useCart from "./hooks/useCart";
import MemberService from "./services/MemberService";
import { Member } from "../lib/types/member";

const MEMBER_STORAGE_KEY = "memberData";

const readStoredMember = (): Member | null => {
  try {
    const storedMember = localStorage.getItem(MEMBER_STORAGE_KEY);
    if (!storedMember) return null;

    const parsedMember: unknown = JSON.parse(storedMember);
    if (!parsedMember || typeof parsedMember !== "object") {
      localStorage.removeItem(MEMBER_STORAGE_KEY);
      return null;
    }

    const candidate = parsedMember as { _id?: unknown; memberName?: unknown };
    if (typeof candidate._id !== "string" || typeof candidate.memberName !== "string") {
      localStorage.removeItem(MEMBER_STORAGE_KEY);
      return null;
    }

    return parsedMember as Member;
  } catch {
    localStorage.removeItem(MEMBER_STORAGE_KEY);
    return null;
  }
};

function App() {
  const location = useLocation();
  const cart = useCart();
  const [authMember, setAuthMember] = useState<Member | null>(readStoredMember);
  const [signupOpen, setSignupOpen] = useState(false);
  const openSignup = useCallback(() => {
    setSignupOpen(true);
  }, []);
  const closeSignup = useCallback(() => setSignupOpen(false), []);

  const handleAuthenticated = useCallback((member: Member) => {
    localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(member));
    setAuthMember(member);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await new MemberService().logout();
    } catch {
      // Clear local state even if the session has already expired server-side.
      localStorage.removeItem(MEMBER_STORAGE_KEY);
    }
    setAuthMember(null);
  }, []);

  const navigationProps = {
    authMember,
    cart,
    onSignup: openSignup,
    onLogout: handleLogout,
  };

  return (
    <div className="coco-app-shell">
      {location.pathname === "/" ? <HomeNavbar {...navigationProps} /> : <OtherNavbar {...navigationProps} />}
      <main className="coco-app-shell__main">
        <Switch>
          <Route path="/products"><ProductsPage cart={cart} /></Route>
          <Route path="/orders"><OrdersPage /></Route>
          <Route path="/member-page"><UserPage /></Route>
          <Route path="/help"><HelpPage /></Route>
          <Route exact path="/"><HomePage /></Route>
        </Switch>
      </main>
      <Footer />
      <AuthenticationModal
        open={signupOpen}
        onClose={closeSignup}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
}

export default App;
