import LandingContainer from "./containers/LandingContainer/LandingContainer";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import { useState } from "react";

export default function App() {
  const [loginShow, setLoginShow] = useState(true);

  const handleClose = () => {
    setLoginShow(false);
  }

  return (
    <><LoginComponent show={loginShow} handleClose={handleClose} />
    <LandingContainer /></>
  );
}