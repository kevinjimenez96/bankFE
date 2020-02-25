import React from "react";
import { useAuth0 } from "../../react-auth0-spa";

function LandingPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="landing-page">
      <button onClick={() => loginWithRedirect({})}>Log in</button>
      LandingPage
    </div>
  );
}

export default LandingPage;
