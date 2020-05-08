import React, { useState } from "react";
import { injectStripe, CardElement } from "react-stripe-elements";
import { Modal, Button, Input, Select, Row, Col, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import addPaymentSource from "../../../appRedux/actions/API/addPaymentSource";
import getUserInfo from "../../../appRedux/actions/API/getUserInfo";
const { Option } = Select;

const PaymentModal = ({ isVisible, setIsVisible, stripe }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [state, setState] = useState({
    name: "",
    credit: false,
  });
  const dispatch = useDispatch();
  const pageLoaders = useSelector(({ Api }) => Api.pageLoaders);

  const handleCancel = (e) => {
    setIsVisible(false);
  };

  const handleAdd = async (_) => {
    if (!isError()) {
      setConfirmLoading(true);
      let token;
      try {
        token = await stripe.createToken({
          name: state.name,
        });
        console.log(token);
        await dispatch(addPaymentSource(token.token.id));
        await dispatch(getUserInfo());
        setConfirmLoading(false);
        setIsVisible(false);
      } catch (error) {
        setConfirmLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState({ ...state, [id]: value });
  };

  const isError = (_) => {
    for (var key in state) {
      if (!state[key] && state[key] == "") {
        message.warn(`${key} is missing`);
        return true;
      }
    }
    return false;
  };

  return (
    <Modal
      visible={isVisible}
      title="Add Card"
      confirmLoading={confirmLoading || pageLoaders.addPaymentSource}
      onOk={handleAdd}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Card holder name"
        className="gx-mb-3"
        id="name"
        onChange={handleChange}
        required
      />

      <CardElement
        onChange={(e) => setState({ ...state, credit: e.complete })}
        className="ant-input gx-pt-2"
      />
    </Modal>
  );
};

export default injectStripe(PaymentModal);
