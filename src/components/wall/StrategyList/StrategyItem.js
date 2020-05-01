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

const ButtonGroup = Button.Group;
const { Text } = Typography;

const StrategyItem = ({ itemData, user, index }) => {
  const [message, setMessage] = useState("");
  const calcPercent =
    (itemData.wonOrders / (itemData.wonOrders + itemData.lostOrders)) * 100;
  const percent = calcPercent >= 1 ? calcPercent.toFixed(1) : 0;
  console.log(percent);
  // const _handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     const commentData = {
  //       user: props.user,
  //       comment: message,
  //       date: new Date().toString(),
  //       likeCount: 0,
  //       isLike: true,
  //       commentList: [],
  //     };

  //     let commentArray = post.commentList;
  //     commentArray.push(commentData);
  //     setPost({ ...post, commentList: commentArray });
  //     setMessage("");
  //   }
  // };

  // const updateCommentValue = (evt) => {
  //   setMessage(evt.target.value);
  // };

  // const handleLikeToggle = () => {
  //   setPost({
  //     ...post,
  //     isLike: !post.isLike,
  //     likeCount: post.isLike === true ? post.likeCount - 1 : post.likeCount + 1,
  //   });
  // };

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
        <Avatar
          className="gx-mr-3 gx-mb-2 gx-size-50"
          // src={require("assets/images/carousel/wolf.jpg")}
          src={`${CDN}${itemData.pic}`}
        />
        <div className="gx-media-body">
          <h5 className="gx-wall-user-title">{itemData.title}</h5>
          <DisplayDate date={itemData.addedIn} />
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
      <p>{itemData.description}</p>
      {/* <div className="gx-wall-medialist">
          {mediaList.length > 0 ? <MediaList mediaList={mediaList} /> : null}
        </div> */}
      <Text>
        <Text type="warning">{itemData.wonOrders}</Text> orders won of
        <Text type="warning"> {itemData.wonOrders + itemData.lostOrders}</Text>
      </Text>
      <Progress percent={percent} status="active" />

      <ButtonGroup className={"gx-w-100 gx-d-flex"}>
        <Button block>
          <i className="icon gx-mr-2 icon-notification" />
          watch
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
