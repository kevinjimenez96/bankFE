import React, { useEffect, useState } from "react";
import useAxios from "@use-hooks/axios";
import TransactionItem from "../transaction-item/transaction-item";

const TransactionList = () => {
  const [transactionsFrom, setTransactionsFrom] = useState(null);
  const [transactionsTo, setTransactionsTo] = useState(null);
  const [fullTransactions, setFullTransactions] = useState([]);
  const [both, setboth] = useState(false);
  const transactionsFromAxios = useAxios({
    url: `http://localhost:8080/v1/transaction/from`,
    method: "GET",
    options: {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
      }
    }
  });
  const transactionsToAxios = useAxios({
    url: `http://localhost:8080/v1/transaction/to`,
    method: "GET",
    options: {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
      }
    }
  });

  useEffect(() => {
    transactionsFromAxios.reFetch();
    transactionsToAxios.reFetch();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (transactionsFromAxios.response !== null) {
      if (transactionsFromAxios.response.data === "") {
        setTransactionsFrom([]);
      } else {
        setTransactionsFrom(transactionsFromAxios.response.data);
      }

      if (transactionsTo != null) {
        setboth(true);
      }
    }
    // eslint-disable-next-line
  }, [transactionsFromAxios.response]);

  useEffect(() => {
    if (transactionsToAxios.response !== null) {
      if (transactionsToAxios.response.data === "") {
        setTransactionsTo([]);
      } else {
        setTransactionsTo(transactionsToAxios.response.data);
      }
      if (transactionsFrom != null) {
        setboth(true);
      }
    }
    // eslint-disable-next-line
  }, [transactionsToAxios.response]);

  useEffect(() => {
    if (both) {
      let transactionsFromList = transactionsFrom.map(transaction => {
        transaction.red = true;
        return transaction;
      });

      let transactionsToList = transactionsTo.map(transaction => {
        transaction.red = false;
        return transaction;
      });
      const list = [...transactionsFromList, ...transactionsToList].sort(
        (a, b) => {
          let dateA = new Date(Date.parse(a.dateTime));
          let dateB = new Date(Date.parse(b.dateTime));
          if (dateA > dateB) {
            return -1;
          } else {
            return 1;
          }
        }
      );
      setFullTransactions(list);
    }
    // eslint-disable-next-line
  }, [both]);

  return (
    <section className="transaction-list">
      <h2 className="transaction-list__title">Transfer history</h2>
      <ul className="transaction-list__list">
        {fullTransactions.map(transaction => (
          <li key={transaction.id} className="transaction-list__item">
            <TransactionItem transaction={transaction} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TransactionList;
