import React, { useEffect, useState } from "react";
import { Avatar, Card, Button, Typography, Progress, Popover } from "antd";
import DisplayDate from "../DisplayDate/index";
import { CDN } from "../../../constants/API";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toggleWatchStrategy from "../../../appRedux/actions/API/toggleWatchStrategy";

const ButtonGroup = Button.Group;
const { Text } = Typography;

const StrategyItem = ({ itemData }) => {
  const dispatch = useDispatch();
  const { pageLoaders } = useSelector(({ Api }) => Api);
  const { userInfo } = useSelector(({ auth }) => auth);
  const calcPercent =
    (itemData.wonOrders / (itemData.wonOrders + itemData.lostOrders)) * 100;
  const percent = calcPercent >= 1 ? calcPercent.toFixed(1) : 0;
  const [rendering, setRendering] = useState(true);
  const handleWatching = async (id) => {
    await dispatch(toggleWatchStrategy(id, "all"));
    setRendering(!rendering);
  };

  const shareContent = (
    <div className="gx-media gx-align-items-center">
      <div className="gx-mx-2 gx-icon-scale gx-size-30">
        <FacebookShareButton
          url={`http://finztrade.com/strategy/${itemData._id}`}
        >
          <FacebookIcon className="gx-img-fluid" />
        </FacebookShareButton>
      </div>
      <div className="gx-mx-2 gx-icon-scale gx-size-30">
        <TwitterShareButton
          url={`http://finztrade.com/strategy/${itemData._id}`}
        >
          <TwitterIcon className="gx-img-fluid" />
        </TwitterShareButton>
      </div>
      <div className="gx-mx-2 gx-icon-scale gx-size-30">
        <TelegramShareButton
          url={`http://finztrade.com/strategy/${itemData._id}`}
        >
          <TelegramIcon className="gx-img-fluid" />
        </TelegramShareButton>
      </div>
      <div className="gx-mx-2 gx-icon-scale gx-size-30">
        <WhatsappShareButton
          url={`http://finztrade.com/strategy/${itemData._id}`}
        >
          <WhatsappIcon className="gx-img-fluid" />
        </WhatsappShareButton>
      </div>
    </div>
  );

  return (
    <Card className="gx-card">
      <div className="gx-media gx-wall-user-info gx-flex-nowrap gx-align-items-center">
        <Link to={`/strategy/${itemData._id}`}>
          <Avatar
            className="gx-mr-3 gx-mb-2 gx-size-50"
            // src={require("assets/images/carousel/wolf.jpg")}
            src={`${CDN}${itemData.pic}`}
          />
        </Link>
        <div className="gx-media-body">
          <Link to={`/strategy/${itemData._id}`}>
            <h5 className="gx-wall-user-title">{itemData.title}</h5>
          </Link>
          <Text className="gx-text-muted gx-fs-sm">
            <DisplayDate date={itemData.addedIn} />
          </Text>
        </div>

        <ul className="gx-follower-list">
          <li>
            <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">
              <i className="icon gx-mr-2 icon-team" />
            </span>
            <span className="gx-fs-sm">{itemData.followers}</span>
          </li>
          <li>
            <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">
              <i className="icon gx-mr-2 icon-view-o" />
            </span>
            <span className="gx-fs-sm">{itemData.watchers}</span>
          </li>
          <li>
            <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">
              <i className="icon gx-mr-2 icon-revenue-new" />
            </span>
            <span className="gx-fs-sm">${itemData.cost}</span>
          </li>
        </ul>
      </div>
      <p className="gx-overflow-break">{itemData.description}</p>
      {/* <div className="gx-wall-medialist">
          {mediaList.length > 0 ? <MediaList mediaList={mediaList} /> : null}
        </div> */}
      <Text>
        <Text type="warning">{itemData.wonOrders}</Text> orders won of
        <Text type="warning"> {itemData.wonOrders + itemData.lostOrders}</Text>
      </Text>
      <Progress percent={parseFloat(percent)} status="active" />

      <ButtonGroup className={"gx-w-100 gx-d-flex"}>
        <Button
          block
          loading={pageLoaders.toggleWatchStrategy === itemData._id}
          onClick={(_) => handleWatching(itemData._id)}
          type={
            itemData.watchersIds.includes(userInfo.username)
              ? "primary"
              : "default"
          }
        >
          <i className="icon gx-mr-2 icon-notification" />
          {itemData.watchersIds.includes(userInfo.username)
            ? "Un-Watch"
            : "Watch"}
        </Button>
        <Button block>
          <i className="icon gx-mr-2 icon-add" />
          follow
        </Button>
        <Popover content={shareContent} trigger="hover">
          <Button block>
            <i className="icon gx-mr-2 icon-sent" />
            share
          </Button>
        </Popover>
      </ButtonGroup>
    </Card>
  );
};

export default StrategyItem;
