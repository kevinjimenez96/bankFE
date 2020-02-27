import React from "react";
import Card from "../card/card";
import CardHeader from "../card-header/card-header";

const AccountItem = ({ account }) => {
  let accountId = ("0000000000000000" + account.id).slice(-16);

  return (
    <Card className="account-item card--medium">
      <div
        className={
          "account-item__bar" +
          (account.accountType === "CREDIT"
            ? " account-item__bar--credit"
            : " account-item__bar--debit")
        }
      ></div>

      <CardHeader
        currency={account.currency}
        amount={account.balance}
        title={accountId}
        secondary={account.accountType}
        redAmount={account.accountType === "CREDIT" ? true : false}
      />
    </Card>
  );
};

export default AccountItem;
