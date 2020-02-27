import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      breakpoint="sm"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      className="sidebar"
    >
      <Menu theme="dark" mode="inline">
        <Menu.Item key="2">
          <Link to="/accounts">
            <Icon type="credit-card" />
            <span className="nav-text">Accounts</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/transactions">
            <Icon type="transaction" />
            <span className="nav-text">Transactions</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="pie-chart" />
          <span className="nav-text">Usage</span>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/services">
            <Icon type="bulb" />
            <span className="nav-text">Services</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/logout">
            <Icon type="logout" />
            <span className="nav-text">Logout</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
// const Sidebar = () => {
//   return (
//     <nav className="sidebar">
//       <div>
//         <Link to="/profile">
//           <User />
//           Profile
//         </Link>
//         <Link to="/accounts">
//           <CreditCard />
//           Accounts
//         </Link>
//         <Link to="/tranfer">
//           <Transaction />
//           Transfers
//         </Link>
//         <Link to="/services">
//           <Trigger />
//           Services
//         </Link>
//         <Link to="/usage">
//           <Analytics />
//           Usage
//         </Link>
//         <Link to="/savings">
//           <Money />
//           Savings
//         </Link>
//       </div>
//       <Link to="/logout">
//         <Logout />
//         Logout
//       </Link>
//     </nav>
//   );
// };

export default Sidebar;
