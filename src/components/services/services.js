import React, { useState, useEffect } from "react";
import ServiceItem from "../service-item/service-item";
import useAxios from "@use-hooks/axios";
import { Spin } from "antd";

const Services = () => {
  const [services, setServices] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [servicePaid, setservicePaid] = useState(true);

  const servicesAxios = useAxios({
    url: `http://localhost:8080/v1/user/services`,
    method: "GET",
    options: {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
      }
    }
  });

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
    if (servicePaid) {
      servicesAxios.reFetch();
      accountsAxios.reFetch();
      setservicePaid(false);
    }
    // eslint-disable-next-line
  }, [servicePaid]);

  useEffect(() => {
    if (servicesAxios.response !== null) {
      setServices(servicesAxios.response.data);
    }
  }, [servicesAxios.response]);

  useEffect(() => {
    if (accountsAxios.response !== null) {
      console.log(accountsAxios.response.data);
      setAccounts(accountsAxios.response.data);
    }
  }, [accountsAxios.response]);

  if (servicesAxios.loading || accountsAxios.loading) {
    return (
      <div className="large-spin-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <section className="services content">
      <h1 className="services__title content__title">Services</h1>
      <ul className="services__list">
        {services.map(service => (
          <li key={service.id}>
            <ServiceItem
              service={service}
              accounts={accounts}
              setservicePaid={setservicePaid}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Services;
