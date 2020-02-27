import React from "react";
import { Form, Select, Button, Input } from "antd";
import axios from "axios";

const { Option } = Select;

const AddTransfer = Form.create({ name: "transfer_form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { selectedAccount: null };
    }

    validateAmount = async (rule, value, callback) => {
      if (this.state.selectedAccount.accountType === "CREDIT") {
        if (
          value >
          this.state.selectedAccount.accountLimit -
            this.state.selectedAccount.balance
        ) {
          callback("This account doesn't have enough funds!");
        }
      } else {
        if (value > this.state.selectedAccount.balance) {
          callback("This account doesn't have enough funds!");
        }
      }

      callback();
    };

    validateAccount = async (rule, value, callback) => {
      if (value.length !== 16) {
        callback("Not a valid account");
      } else {
        let response = await axios({
          method: "get",
          url: "http://localhost:8080/v1/account/" + value,
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
          }
        });
        if (response.data === "") {
          callback("Not a valid account");
        }
      }
      callback();
    };

    selectChange = value => {
      this.setState({
        selectedAccount: this.props.accounts.find(
          account => account.id === value
        )
      });
    };

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          let body = {
            amount: values["amount"],
            accountFrom: { id: values["from"] },
            accountTo: { id: parseInt(values["to"]) },
            currency: this.state.selectedAccount.currency
          };
          console.log(body);
          axios({
            method: "post",
            url: "http://localhost:8080/v1/transaction",
            data: body,

            headers: {
              Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
            }
          }).then(() => {
            window.location.href = "/transactions";
          });
        }
      });
    };

    render() {
      const { form, accounts } = this.props;
      const { getFieldDecorator } = form;
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 2,
            offset: 10
          }
        }
      };

      const options = accounts.map(account => (
        <Option key={account.id} value={account.id}>
          <div className="account-option">
            <div>
              {account.accountType +
                " " +
                ("0000000000000000" + account.id).slice(-16)}
            </div>
            <div className="account-option__amount">
              {(account.currency === "DOLAR" ? "$" : "₡") +
                (account.accountType === "CREDIT"
                  ? account.accountLimit - account.balance
                  : account.balance)}
            </div>
          </div>
        </Option>
      ));
      return (
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <Form.Item label="From:" hasFeedback>
            {getFieldDecorator("from", {
              rules: [
                {
                  required: true,
                  message: "Please select an account!"
                }
              ]
            })(
              <Select
                placeholder="Please select an account"
                onChange={this.selectChange}
              >
                {options}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="To:" hasFeedback>
            {getFieldDecorator("to", {
              initialValue: "",
              rules: [
                {
                  required: true,
                  message: "Please enter an account!",
                  pattern: new RegExp("^[0-9]{16,16}$")
                },
                {
                  message: "Please enter a valid account!",
                  validator: this.validateAccount
                }
              ]
            })(<Input type="text" />)}
          </Form.Item>
          <Form.Item label="Amount" hasFeedback>
            {getFieldDecorator("amount", {
              initialValue: "",
              rules: [
                {
                  required: true,
                  message: "Please enter an amount!",
                  pattern: new RegExp("^[0-9]*$")
                },
                {
                  message: "This account doesn't have enough funds!",
                  validator: this.validateAmount
                }
              ]
            })(<Input type="text" />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
);

export default AddTransfer;
