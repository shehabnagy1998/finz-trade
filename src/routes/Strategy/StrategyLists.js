import React from "react";
import { Card, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { CDN } from "../../constants/API";

const { Title, Text } = Typography;

const StrategyLists = ({ title, items, icon }) => {
  return (
    <Card
      title={
        <Text>
          {icon} {title + " List"}
        </Text>
      }
    >
      {items && items.length >= 1 ? (
        items.map((item, index) => (
          <Link to={`/profile/${item.username}`}>
            <div key={index} className="gx-mb-3">
              <Avatar src={CDN + item.pic} />
              <Text className="gx-fs-lg gx-text-muted gx-ml-3">
                {item.name}
              </Text>
            </div>
          </Link>
        ))
      ) : (
        <div className="gx-text-center">
          <Text className="gx-text-orange">No {title}</Text>
        </div>
      )}
    </Card>
  );
};

export default StrategyLists;
