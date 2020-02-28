import React, { useState } from "react";
import Card from "../card/card";
import CardHeader from "../card-header/card-header";
import { Button, Select } from "antd";
import axios from "axios";
import cogoToast from "cogo-toast";

const { Option } = Select;

const ServiceItem = ({ service, accounts, setservicePaid }) => {
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

  const handleOnClick = () => {
    let body = {
      service: {
        id: service.id
      },
      account: {
        id: selected
      }
    };
    axios({
      method: "delete",
      url: "http://142.93.241.254:8080/v1/user/services",
      data: body,
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
      }
    }).then(() => {
      setservicePaid(true);
      cogoToast.success("The service was paid.");
    });
  };
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
