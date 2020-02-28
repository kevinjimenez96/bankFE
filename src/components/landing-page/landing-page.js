import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { Button } from "antd";

function LandingPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="landing-page">
      <img src="/full.png" alt="" className="landing-page__img" />
      <Button type="primary" onClick={() => loginWithRedirect({})}>
        Log in
      </Button>
    </div>
  );
}

export default LandingPage;
