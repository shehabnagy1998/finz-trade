import React, { useState } from "react";
import Widget from "components/Widget";

import OwnStrateyItem from "./OwnStrateyItem";
import { useSelector } from "react-redux";
import { Typography, Button, notification } from "antd";
import AddModal from "../../StrategyModal/Add";
import EditModal from "../../StrategyModal/Edit";

const { Text, Title } = Typography;

const openNotificationError = (msg) => {
  notification["error"]({
    message: "Strategies",
    description: msg,
  });
};

const OwnStrategy = ({ isMyProfile }) => {
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [strategyEditItem, setStrategyEditItem] = useState({});

  const strategies = useSelector(({ Api }) => Api.strategies.owned);
  const { brokers } = useSelector(({ Api }) => Api);

  const handleOpenModal = () => {
    if (brokers.length <= 0) {
      openNotificationError(
        "sorry but you need to have at least one broker to add new strategy"
      );
      return;
    }
    setIsAddVisible(true);
  };

  return (
    <Widget styleName="gx-card-profile">
      <div className="gx-mt-4 gx-d-flex gx-justify-content-between">
        <Text className="gx-fs-xl">Own Strategy</Text>
        {isMyProfile && (
          <Button icon="plus" shape="circle" onClick={handleOpenModal} />
        )}
      </div>
      {strategies.length >= 1 ? (
        strategies.map((item, index) => (
          <OwnStrateyItem
            item={item}
            key={index}
            setStrategyEditItem={setStrategyEditItem}
            isMyProfile={isMyProfile}
          />
        ))
      ) : (
        <div className="gx-text-center">
          <Text className="gx-text-orange gx-fs-lg gx-text-capitalize">
            You didn't create any strategy, try add one
          </Text>
        </div>
      )}
      <AddModal isVisible={isAddVisible} setIsVisible={setIsAddVisible} />
      <EditModal item={strategyEditItem} setItem={setStrategyEditItem} />
    </Widget>
  );
};

export default OwnStrategy;
