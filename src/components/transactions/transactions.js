import React, { useEffect, useState } from "react";
import Card from "../card/card";
import useAxios from "@use-hooks/axios";
import AddTransfer from "../add-transfer/add-transfer";

const Transactions = () => {
  const [accounts, setAccounts] = useState([]);

  const accountsAxios = useAxios({
    url: `http://localhost:8080/v1/account/me`,
    method: "GET",
    options: {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
      }
    }
  });
  useEffect(() => {
    accountsAxios.reFetch();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (accountsAxios.response !== null) {
      setAccounts(accountsAxios.response.data);
    }
  }, [accountsAxios.response]);
  return (
    <section className="transactions content">
      <h1 className="content__title">Transactions</h1>
      <Card className="card--big card">
        <h2>Transfer</h2>
        <AddTransfer accounts={accounts} />
      </Card>
    </section>
  );
};

export default Transactions;