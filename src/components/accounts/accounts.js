import React, { useState, useEffect } from "react";
import useAxios from "@use-hooks/axios";
import { useAuth0 } from "../../react-auth0-spa";
import AccountItem from "../account-item/account-item";
import { Redirect } from "react-router-dom";
import AddAccount from "../add-account/add-account";
import ModalSignUp from "../modal-sign-up/modal-sign-up";
import { Spin } from "antd";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [userExists, setuserExists] = useState(true);
  const { getTokenSilently, loading } = useAuth0();
  const [token, settoken] = useState();
  const [modalIsVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    getTokenSilently().then(token => {
      window.sessionStorage.setItem("token", token);
      settoken(token);
    });
    // eslint-disable-next-line
  }, []);

  const userAxios = useAxios({
    url: `http://localhost:8080/v1/user/me`,
    method: "GET",
    options: {
      headers: { Authorization: `Bearer ${token}` }
    }
  });

  const accountsAxios = useAxios({
    url: `http://localhost:8080/v1/account/me`,
    method: "GET",
    options: {
      headers: { Authorization: `Bearer ${token}` }
    }
  });

  useEffect(() => {
    if (token !== undefined) {
      userAxios.reFetch();
    }
    // eslint-disable-next-line
  }, [token, userExists]);

  useEffect(() => {
    console.log(userAxios.response);
    if (userAxios.response != null) {
      if (userAxios.response.data !== "") {
        window.sessionStorage.setItem(
          "user",
          JSON.stringify(userAxios.response.data)
        );
        console.log("existas");
        setuserExists(true);
      } else {
        setuserExists(false);
      }
    }
  }, [userAxios.response]);

  useEffect(() => {
    if (token !== undefined) {
      accountsAxios.reFetch();
    }
    // eslint-disable-next-line
  }, [userExists]);

  useEffect(() => {
    if (accountsAxios.response !== null) {
      setAccounts(accountsAxios.response.data);
    }
  }, [accountsAxios.response]);

  if (userAxios.loading || accountsAxios.loading || loading) {
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="accounts">
      <h1 className="accounts__title">Accounts</h1>
      <ul className="accounts__list">
        {accounts.map(account => {
          return (
            <li key={account.id}>
              <AccountItem account={account} />
            </li>
          );
        })}
        <AddAccount />
      </ul>
      {!userExists && (
        <ModalSignUp isVisible={true} setUserExist={setuserExists} />
      )}
    </div>
  );
}

export default Accounts;
