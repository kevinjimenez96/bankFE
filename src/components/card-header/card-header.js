import React from "react";

const CardHeader = ({ currency, amount, title, secondary, redAmount }) => {
  return (
    <div className="card-header">
      <div className="card-header__top">
        <h2 className="card-header__title">{title}</h2>
        <span
          className={
            "card-header__amount" +
            (redAmount
              ? " card-header__amount--red"
              : " card-header__amount--green")
          }
        >
          {(currency === "DOLAR" ? "$" : "₡") + amount}
        </span>
      </div>
      <span className="card-header__secondary">{secondary}</span>
    </div>
  );
};

export default CardHeader;
