import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, DatePicker } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";

class RegistrationForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values["birthday"] = values["birthday"].format("DD-MM-YYYY");
        console.log("Received values of form: ", values);
        axios({
          method: "post",
          url: "http://localhost:8080/v1/user/register",
          data: values,

          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
          }
        }).then(() => {
          window.location.href = "/";
        });
      }
    });
  };

  render() {
    if (this.done) {
      return <Redirect to="/" />;
    }
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const config = {
      rules: [
        {
          type: "object",
          required: true,
          message: "Please enter your birthday!"
        }
      ]
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Identification">
          {getFieldDecorator("identification", {
            rules: [
              {
                required: true,
                pattern: new RegExp("^[0-9]{9,9}$"),
                message: "Please enter your 9 digits identification number!"
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please enter your name!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Lastname">
          {getFieldDecorator("lastName", {
            rules: [
              {
                required: true,
                message: "Please enter your lastname!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Birthday">
          {getFieldDecorator("birthday", config)(<DatePicker />)}
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

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
