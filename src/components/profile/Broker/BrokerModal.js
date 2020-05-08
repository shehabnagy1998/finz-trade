import React, { useState } from "react";
import { Modal, Button, Input, Select, Row, Col, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import addPaymentSource from "../../../appRedux/actions/API/addPaymentSource";
import getUserInfo from "../../../appRedux/actions/API/getUserInfo";
import addBroker from "../../../appRedux/actions/API/addBroker";
const { Option } = Select;

const BrokerModal = ({ isVisible, setIsVisible, stripe }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [state, setState] = useState({
    id: "",
    name: "",
  });
  const dispatch = useDispatch();
  const pageLoaders = useSelector(({ Api }) => Api.pageLoaders);

  const handleCancel = (e) => {
    setIsVisible(false);
  };

  const handleAdd = async (_) => {
    if (!isError()) {
      setConfirmLoading(true);
      await dispatch(addBroker(state));
      setConfirmLoading(false);
      setIsVisible(false);
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
      title="Add Broker"
      confirmLoading={confirmLoading || pageLoaders.addPaymentSource}
      onOk={handleAdd}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Broker ID"
        className="gx-mb-3"
        id="id"
        onChange={handleChange}
        type="number"
      />
      <Input
        placeholder="Broker name"
        className="gx-mb-3"
        id="name"
        onChange={handleChange}
      />
    </Modal>
  );
};

export default BrokerModal;
