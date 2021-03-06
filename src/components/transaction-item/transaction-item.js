import React, { useEffect, useState } from "react";
import Card from "../card/card";
import CardHeader from "../card-header/card-header";
import useAxios from "@use-hooks/axios";

const TransactionItem = ({ transaction }) => {
  const [, setaccountTo] = useState();
  const accountAxios = useAxios({
    url: `http://142.93.241.254:8080/v1/account/${transaction.accountTo.id}`,
    method: "GET",
    options: {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
      }
    }
  });

  useEffect(() => {
    accountAxios.reFetch();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (accountAxios.response != null && accountAxios.response.data !== "") {
      setaccountTo(accountAxios.response.data);
    }
  }, [accountAxios.response]);

  let date = new Date(transaction.dateTime);
  date = `${("00" + date.getDate()).slice(-2)}-${(
    "00" +
    (date.getMonth() + 1)
  ).slice(-2)}-${date.getFullYear()}`;
  return (
    <Card className="card--small">
      <CardHeader
        currency={transaction.currency}
        amount={transaction.amount}
        title={transaction.detail}
        secondary={`${("0000000000000000" + transaction.accountFrom.id).slice(
          -16
        )} ----> ${("0000000000000000" + transaction.accountTo.id).slice(-16)}`}
        redAmount={transaction.red}
      />
      <div className="transaction-item__date">{date}</div>
    </Card>
  );
};

export default TransactionItem;
