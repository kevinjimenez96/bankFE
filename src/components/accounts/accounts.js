import React, { useState, useEffect } from "react";
import useAxios from "@use-hooks/axios";
import { useAuth0 } from "../../react-auth0-spa";
import AccountItem from "../account-item/account-item";
import AddAccount from "../add-account/add-account";
import ModalSignUp from "../modal-sign-up/modal-sign-up";
import { Spin } from "antd";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [userExists, setuserExists] = useState(undefined);
  const { getTokenSilently, loading } = useAuth0();
  const [token, settoken] = useState();
  const [newAccount, setNewAccount] = useState(undefined);

  useEffect(() => {
    getTokenSilently().then(newToken => {
      window.sessionStorage.setItem("token", newToken);
      settoken(newToken);
    });
    // eslint-disable-next-line
  }, []);

  const userAxios = useAxios({
    url: `https://142.93.241.254:8080/v1/user/me`,
    method: "GET",
    options: {
      headers: { Authorization: `Bearer ${token}` }
    }
  });

  const accountsAxios = useAxios({
    url: `https://142.93.241.254:8080/v1/account/me`,
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
  }, [token]);

  useEffect(() => {
    if (userAxios.response != null) {
      if (userAxios.response.data !== "") {
        window.sessionStorage.setItem(
          "user",
          JSON.stringify(userAxios.response.data)
        );
        setuserExists(true);
      } else {
        setuserExists(false);
      }
    }
  }, [userAxios.response]);

  useEffect(() => {
    if (token !== undefined) {
      if (newAccount === undefined || newAccount) accountsAxios.reFetch();
      setNewAccount(false);
    }
    // eslint-disable-next-line
  }, [userExists, newAccount]);

  useEffect(() => {
    if (accountsAxios.response !== null) {
      setAccounts(accountsAxios.response.data);
    }
  }, [accountsAxios.response]);

  if (userAxios.loading || accountsAxios.loading || loading) {
    return (
      <div className="large-spin-container">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <section className="accounts content">
      <h1 className="accounts__title content__title">Accounts</h1>
      <ul className="accounts__list">
        {accounts.map(account => {
          return (
            <li className="accounts__item" key={account.id}>
              <AccountItem account={account} />
            </li>
          );
        })}
        <AddAccount setNewAccount={setNewAccount} />
      </ul>
      {userExists !== undefined && !userExists && (
        <ModalSignUp isVisible={true} setUserExist={setuserExists} />
      )}
    </section>
  );
}

export default Accounts;
