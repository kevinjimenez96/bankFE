import React from "react";
import Card from "../card/card";
import CardHeader from "../card-header/card-header";

const TransactionItem = ({ transaction }) => {
  return (
    <Card className="card--small">
      <CardHeader
        currency={transaction.currency}
        amount={transaction.amount}
        title={transaction.detail}
        secondary={"sedafffs"}
        redAmount={transaction.red}
      />
    </Card>
  );
};

export default TransactionItem;
