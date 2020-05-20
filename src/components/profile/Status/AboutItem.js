import React from "react";
import Auxiliary from "util/Auxiliary";
import { Avatar, Typography, Button, Progress } from "antd";
import { CDN } from "../../../constants/API";
import { useDispatch, useSelector } from "react-redux";
import toggleWatchStrategy from "../../../appRedux/actions/API/toggleWatchStrategy";
import { Link } from "react-router-dom";

const AboutItem = ({ data, type, isMyProfile }) => {
  const { Text } = Typography;
  const dispatch = useDispatch();
  const { pageLoaders } = useSelector(({ Api }) => Api);

  const btnText = type === "following" ? "Un-Follow" : "Un-Watch";
  const btnMethod = (id) =>
    type === "following"
      ? "Un-Follow"
      : dispatch(toggleWatchStrategy(id, "all"));

  return (
    <Auxiliary>
      <div className="gx-my-4">
        <div className="gx-d-flex gx-flex-column gx-flex-lg-row gx-justify-content-between">
          <div className="gx-d-flex">
            <Link to={`/strategy/${data._id}`}>
              <Avatar
                className="gx-mr-3 gx-size-50 gx-flex-shrink-0"
                src={CDN + data.pic}
              />
            </Link>
            <div className="gx-flex-column">
              <Link to={`/strategy/${data._id}`} className="gx-mb-2">
                <Text className="gx-fs-xl gx-mb-2">{data.title}</Text>
              </Link>
              <Text className="gx-overflow-break gx-fs-md">
                {data.description}
              </Text>
            </div>
          </div>
          {isMyProfile && (
            <Button
              size="default"
              className="gx-mt-3 gx-mt-lg-0 gx-ml-lg-3"
              shape="round"
              onClick={(_) => btnMethod(data._id)}
              loading={pageLoaders.toggleWatchStrategy === data._id}
            >
              {btnText}
            </Button>
          )}
        </div>
      </div>
    </Auxiliary>
  );
};

export default AboutItem;
