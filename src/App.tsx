import LandingContainer from "./containers/LandingContainer/LandingContainer";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import { useState } from "react";

const cacheKey = "LoginCache";

export default function App() {
  const [loginShow, setLoginShow] = useState(true);

  const getCache = () => {
    const cachedData = localStorage.getItem(cacheKey);
    const loginCachedData = cachedData !== null ? JSON.parse(cachedData) : null;
  
    if (loginCachedData && new Date().getTime() < loginCachedData.expirationTime) {
      return loginCachedData.data;
    } else {
      localStorage.removeItem(cacheKey);
      return null;
    }
  }

  const isLoggedIn = getCache() ? getCache().isLoggedIn : false;

  const handleClose = () => {
    setLoginShow(false);
  }

  return (
    <>{!isLoggedIn && <LoginComponent show={loginShow} handleClose={handleClose} />}
    <LandingContainer /></>
  );
}