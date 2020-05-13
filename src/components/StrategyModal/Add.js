import React, { useState } from "react";
import { injectStripe, CardElement } from "react-stripe-elements";
import { Modal, Button, Input, Select, Row, Col, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
// import addPaymentSource from "../../../appRedux/actions/API/addPaymentSource";
import addStrategy from "../../appRedux/actions/API/addStrategy";
const { Option } = Select;

const AddModal = ({ isVisible, setIsVisible, stripe }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [state, setState] = useState({
    title: "",
    cost: "",
    description: "",
    brokerId: "",
  });
  const dispatch = useDispatch();
  const { pageLoaders, brokers } = useSelector(({ Api }) => Api);

  const handleCancel = (e) => {
    setIsVisible(false);
  };

  const handleAdd = async (_) => {
    if (!isError()) {
      setConfirmLoading(true);
      await dispatch(addStrategy(state, setIsVisible));
      setConfirmLoading(false);
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

  console.log(state);

  return (
    <Modal
      visible={isVisible}
      title="Add Strategy"
      confirmLoading={confirmLoading || pageLoaders.addStrategy}
      onOk={handleAdd}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Title"
        className="gx-mb-3"
        id="title"
        onChange={handleChange}
        required
      />
      <Input
        placeholder="Cost"
        className="gx-mb-3"
        id="cost"
        type="number"
        onChange={handleChange}
        required
      />
      <TextArea
        onChange={handleChange}
        placeholder="Descripiton"
        id="description"
        className="gx-mb-3"
        autoSize={{ minRows: 2, maxRows: 5 }}
      />
      <Select
        style={{ width: "100%" }}
        placeholder="Broker"
        id="brokerId"
        onChange={(val) => setState({ ...state, brokerId: val })}
      >
        {brokers.map((item, index) => (
          <Select.Option value={item.id} key={index}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Modal>
  );
};

export default AddModal;
