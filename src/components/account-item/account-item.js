import React from "react";
import Card from "../card/card";
import CardHeader from "../card-header/card-header";

const AccountItem = ({ account }) => {
  let accountId = ("0000000000000000" + account.id).slice(-16);

  return (
    <Card className="account-item card--medium">
      <CardHeader
        currency={account.currency}
        amount={account.balance}
        title={accountId}
        secondary={account.accountType}
      />
      <div className="account-item__bar"></div>
    </Card>
  );
};

export default AccountItem;
