import React, { useState } from "react";
import Card from "../card/card";
import CardHeader from "../card-header/card-header";
import { Button, Select } from "antd";
import axios from "axios";

const { Option } = Select;

const ServiceItem = ({ service, accounts }) => {
  const [selected, setSelected] = useState();
  const options = accounts.map(account => (
    <Option key={account.id} value={account.id}>
      <div className="service-item__option">
        <div>
          {account.accountType +
            " " +
            ("0000000000000000" + account.id).slice(-16)}
        </div>
        {account.id === selected ? (
          ""
        ) : (
          <div className="service-item__option-amount">
            {(account.currency === "DOLAR" ? "$" : "₡") +
              (account.accountType === "CREDIT"
                ? account.accountLimit - account.balance
                : account.balance)}
          </div>
        )}
      </div>
    </Option>
  ));

  const handleOnClick = () => {};
  return (
    <Card className="service-item card--medium">
      <div
        className={`service-item__bar service-item__bar--${service.serviceType}`}
      ></div>
      <div className="service-item__card-header-container">
        <CardHeader
          currency={service.currency}
          amount={service.amount}
          title={service.serviceType}
          secondary={"Expiration: " + service.expirationDate}
        />
        <div className="service-item__payment">
          <Select className="service-item__select" onChange={setSelected}>
            {options}
          </Select>
          <Button type="primary" htmlType="submit" onClick={handleOnClick}>
            Pay
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ServiceItem;
