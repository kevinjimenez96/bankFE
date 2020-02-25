import React from "react";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";
import SignUp from "../sign-up/sign-up";

class ModalSignUp extends React.Component {
  state = {
    loading: false,
    visible: this.props.isVisible
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Modal
          visible={visible}
          title="We need some extra information about you!"
          onOk={this.handleOk}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              Submit
            </Button>
          ]}
          maskClosable={false}
          closable={false}
        >
          <SignUp></SignUp>
        </Modal>
      </div>
    );
  }
}

export default ModalSignUp;
