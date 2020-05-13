import React, { useState } from "react";
import Widget from "components/Widget";
import { Typography, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import deleteBroker from "../../../appRedux/actions/API/deleteBroker";
import BrokerModal from "./BrokerModal";

const { Text } = Typography;

const Broker = () => {
  const { brokers, pageLoaders } = useSelector(({ Api }) => Api);
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  return (
    <Widget styleName="gx-card-profile-sm">
      <div className="gx-d-flex gx-align-items-center gx-justify-content-between gx-mb-3">
        <Text className="gx-fs-xl">Broker</Text>
        <div className="gx-d-flex">
          <Button
            shape="circle"
            icon="plus"
            onClick={(_) => setIsVisible(true)}
          />
          <Button shape="circle" icon="download" />
        </div>
      </div>
      {brokers.length >= 1 ? (
        brokers.map((data, index) => (
          <div className="gx-d-flex gx-justify-content-between gx-align-items-center">
            <div
              key={index}
              className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list"
            >
              <div className="gx-mr-3">
                <i
                  className={`gx-fs-xxl icon ${
                    data.company
                      ? "icon-check-cricle gx-text-green"
                      : "icon-error gx-text-orange"
                  }`}
                />
              </div>
              <div className="gx-media-body gx-flex-column">
                {/* <span className="gx-mb-0 gx-text-grey gx-fs-sm">{data.id}</span> */}
                <span className="gx-mb-0 gx-text-grey gx-fs-sm">
                  {data.company}
                </span>
                <p className="gx-mb-0">{data.id}</p>
                <p className="gx-mb-0">{data.name}</p>
              </div>
            </div>
            <Button
              icon="delete"
              onClick={(_) => dispatch(deleteBroker(data._id))}
              shape="circle"
              loading={pageLoaders.deleteBroker === data._id}
            />
          </div>
        ))
      ) : (
        <div className="gx-text-center gx-mt-3">
          <Text className="gx-text-orange gx-fs-lg">
            You dont have any brokers
          </Text>
        </div>
      )}
      <BrokerModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </Widget>
  );
};

export default Broker;
