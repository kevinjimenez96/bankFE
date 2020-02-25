import React from "react";

const CardHeader = ({ currency, amount, title, secondary }) => {
  return (
    <div className="card-header">
      <div className="card-header__top">
        <span className="card-header__title">{title}</span>
        <span className="card-header__amount">
          {(currency === "DOLAR" ? "$" : "₡") + amount}
        </span>
      </div>
      {secondary}
    </div>
  );
};

export default CardHeader;
