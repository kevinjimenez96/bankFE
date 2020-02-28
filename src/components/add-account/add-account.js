import React from "react";
import axios from "axios";
import { Modal, Form, Select, Slider, Tooltip, Icon } from "antd";
import cogoToast from "cogo-toast";

const { Option } = Select;

const AccountModalForm = Form.create({ name: "account_form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    isCredit = false;
    onChange = value => {
      if (value === "CREDIT") {
        this.isCredit = true;
      } else {
        this.isCredit = false;
      }
    };

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new account"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Currency" hasFeedback>
              {getFieldDecorator("currency", {
                rules: [
                  {
                    required: true,
                    message: "Please select the account currency!"
                  }
                ]
              })(
                <Select placeholder="Please select a currency">
                  <Option value="DOLAR">DOLAR</Option>
                  <Option value="COLON">COLON</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Account type" hasFeedback>
              {getFieldDecorator("accountType", {
                rules: [
                  {
                    required: true,
                    message: "Please select the account type!"
                  }
                ]
              })(
                <Select
                  placeholder="Please select a type"
                  onChange={this.onChange}
                >
                  <Option value="DEBIT">DEBIT</Option>
                  <Option value="CREDIT">CREDIT</Option>
                </Select>
              )}
            </Form.Item>
            {this.isCredit && (
              <Tooltip title="Your limit account is determined by its interest">
                <Form.Item label="Interest">
                  {getFieldDecorator("interest", {
                    rules: [
                      {
                        required: true,
                        message: "Please select the account interest!"
                      }
                    ],
                    initialValue: 0
                  })(
                    <Slider
                      max={15}
                      marks={{
                        0: "0",
                        5: "5",
                        10: "10",
                        15: "15"
                      }}
                    />
                  )}
                </Form.Item>
              </Tooltip>
            )}
          </Form>
        </Modal>
      );
    }
  }
);

class AddAccount extends React.Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      axios({
        method: "post",
        url: "http://localhost:8080/v1/account",
        data: values,
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
        }
      }).then(res => {
        this.props.setNewAccount(true);
        cogoToast.success("The account was added.");
      });
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div className="add-account card--medium">
        <button onClick={this.showModal} className="add-account__button">
          <Icon
            type="plus-circle"
            style={{ fontSize: "3rem", color: "#D3D3D3" }}
            theme="outlined"
          />
        </button>
        <AccountModalForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default AddAccount;
