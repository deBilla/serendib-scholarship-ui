import LandingContainer from "./containers/LandingContainer/LandingContainer";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import { useState, useEffect } from "react";

const cacheKey = "isLoggedIn";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) setLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(cacheKey);
    setLoggedIn(false);
  };

  return (
    <>
      <LoginComponent show={!loggedIn} handleLogin={handleLogin} />
      {loggedIn && <LandingContainer handleLogout={handleLogout} />}
    </>
  );
}
