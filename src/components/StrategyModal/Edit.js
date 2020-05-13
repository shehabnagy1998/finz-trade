import React, { useState, useEffect, useRef } from "react";
import { injectStripe, CardElement } from "react-stripe-elements";
import {
  Modal,
  Button,
  Input,
  Select,
  Row,
  Col,
  message,
  Avatar,
  Spin,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
// import addPaymentSource from "../../../appRedux/actions/API/addPaymentSource";
import editStrategy from "../../appRedux/actions/API/editStrategy";
import { CDN } from "../../constants/API";
import editStrategyPic from "../../appRedux/actions/API/editStrategyPic";
const { Option } = Select;

const EditModal = ({ item, setItem }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const dispatch = useDispatch();
  const { pageLoaders, brokers } = useSelector(({ Api }) => Api);

  const handleCancel = (e) => {
    setItem({});
  };

  const handleAdd = async (_) => {
    if (!isError()) {
      setConfirmLoading(true);
      await dispatch(editStrategy(item, setItem));
      setConfirmLoading(false);
    }
  };
  const ref = useRef(null);

  const handleChangeImage = async (e) => {
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = async function () {
        let base64 = reader.result;
        // base64 = base64.replace("data:image/jpeg;", "");
        try {
          await dispatch(editStrategyPic(item._id, base64));
        } catch (error) {
          console.log(error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setItem({ ...item, [id]: value });
  };

  const isError = (_) => {
    for (var key in item) {
      if (!item[key] && item[key] == "") {
        message.warn(`${key} is missing`);
        return true;
      }
    }
    return false;
  };

  console.log(item);

  return (
    <Modal
      visible={item._id}
      title="Add Strategy"
      confirmLoading={confirmLoading || pageLoaders.editStrategy}
      onOk={handleAdd}
      onCancel={handleCancel}
    >
      <div
        className="gx-profile-banner-avatar gx-d-flex gx-justify-content-center gx-align-items-center gx-mb-3"
        onClick={(_) => ref.current.click()}
      >
        <div className="gx-size-100 gx-custom-avatar">
          <Spin spinning={pageLoaders.editStrategyPic || false}>
            <Avatar
              className="gx-size-100"
              alt="..."
              src={CDN + item.pic}
              shape="circle"
            />
          </Spin>
        </div>
        <input
          type="file"
          ref={ref}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleChangeImage}
        />
      </div>

      <Input
        placeholder="Title"
        className="gx-mb-3"
        id="title"
        value={item.title}
        onChange={handleChange}
        required
      />
      <Input
        placeholder="Cost"
        className="gx-mb-3"
        id="cost"
        type="number"
        value={item.cost}
        onChange={handleChange}
        required
      />
      <TextArea
        onChange={handleChange}
        placeholder="Descripiton"
        id="description"
        value={item.description}
        className="gx-mb-3"
        autoSize={{ minRows: 2, maxRows: 5 }}
      />
    </Modal>
  );
};

export default EditModal;
