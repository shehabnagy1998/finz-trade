import React from "react";
import Auxiliary from "util/Auxiliary";
import { Avatar, Typography, Button, Progress } from "antd";
import { CDN } from "../../../constants/API";

const AboutItem = ({ data, type }) => {
  const { Text } = Typography;

  const btnText = type === "following" ? "Un-Follow" : "Un-Watch";

  return (
    <Auxiliary>
      <div className="gx-my-4">
        <div className="gx-d-flex gx-flex-column gx-flex-lg-row gx-justify-content-between">
          <div className="gx-d-flex">
            <Avatar
              className="gx-mr-3 gx-size-50 gx-flex-shrink-0"
              src={CDN + data.pic}
            />
            <div className="gx-flex-column">
              <Text className="gx-fs-xl gx-mb-2">{data.title}</Text>
              <Text className="gx-overflow-break">{data.description}</Text>
            </div>
          </div>
          <Button
            size="default"
            className="gx-mt-3 gx-mt-lg-0 gx-ml-lg-3"
            shape="round"
          >
            {btnText}
          </Button>
        </div>
      </div>
    </Auxiliary>
  );
};

export default AboutItem;
