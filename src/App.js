import React from "react";
import { Layout } from "antd";
import { useAuth0 } from "./react-auth0-spa";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./components/landing-page/landing-page";
import Accounts from "./components/accounts/accounts";
import Sidebar from "./components/sidebar/sidebar";
import Logout from "./components/Logout";
import SignUp from "./components/sign-up/sign-up";
import "./App.scss";

const { Header, Content, Footer } = Layout;

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <Router history={history}>
        <Layout style={{ minHeight: "100vh" }}>
          {isAuthenticated && <Sidebar></Sidebar>}
          <Layout>
            <Content>
              <Switch>
                <Route path="/sign-up" component={SignUp} />
                {!isAuthenticated && (
                  <Route path="/" exact component={LandingPage} />
                )}
                {isAuthenticated && (
                  <Route path="/" exact>
                    <Redirect to="/accounts" />
                  </Route>
                )}
                <PrivateRoute path="/accounts" exact component={Accounts} />
                <PrivateRoute path="/logout" component={Logout} />
              </Switch>
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
