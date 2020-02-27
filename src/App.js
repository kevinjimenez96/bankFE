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
import Transactions from "./components/transactions/transactions";
import { Spin } from "antd";
import "./App.scss";
import Services from "./components/services/services";

const { Content, Footer } = Layout;

function App() {
  const { isAuthenticated, loading } = useAuth0();
  if (loading) {
    return (
      <div className="large-spin-container">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div className="App">
      <Router history={history}>
        <Layout style={{ minHeight: "100vh" }} hasSider={true}>
          {isAuthenticated && <Sidebar></Sidebar>}
          <Layout>
            <Content className="main-content">
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
                <PrivateRoute
                  path="/transactions"
                  exact
                  component={Transactions}
                />
                <PrivateRoute path="/services" exact component={Services} />
                <PrivateRoute path="/logout" component={Logout} />
              </Switch>
            </Content>
            <Footer>Bunny Money ©2020 Created by Kevin Jiménez</Footer>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
