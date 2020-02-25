import React from "react";
import { useAuth0 } from "../react-auth0-spa";

function Logout() {
  const { logout } = useAuth0();
  logout();
  return <div></div>;
}

export default Logout;
