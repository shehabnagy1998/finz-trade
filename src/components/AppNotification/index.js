import React, { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomScrollbars from "util/CustomScrollbars";
import Auxiliary from "util/Auxiliary";
import { useSelector, useDispatch } from "react-redux";
import getNotification from "../../appRedux/actions/API/getNotification";
import { Spin } from "antd";

const AppNotification = () => {
  const notification = useSelector(({ Api }) => Api.notification);
  const dispatch = useDispatch();
  const [postition, setPostition] = useState({ from: 1, to: 50 });

  // useEffect(() => {
  //   dispatch(getNotification(postition));
  // }, []);

  // const handleFetchMore = (_) => {
  //   if (notification.fetchMore) {
  //     let newPos = {
  //       from: postition.from + 5,
  //       to: postition.to + 5,
  //     };
  //     dispatch(getNotification(newPos));
  //     setPostition(newPos);
  //   }
  // };

  return (
    <Auxiliary>
      <div className="gx-popover-header">
        <h3 className="gx-mb-0">Notifications</h3>
        {/* <i className="gx-icon-btn icon icon-charvlet-down" /> */}
      </div>
      <CustomScrollbars
        id="notification-scrollbar"
        className="gx-popover-scroll"
      >
        <InfiniteScroll
          scrollableTarget={"notification-scrollbar"}
          dataLength={notification.arr.length} //This is important field to render the next data
          // next={handleFetchMore}
          // hasMore={notification.fetchMore}
          loader={
            <div className="gx-text-center">
              <Spin />
            </div>
          }
        >
          <ul className="gx-sub-popover">
            {notification.arr.length >= 1 &&
              notification.arr.map((notification, index) => (
                <NotificationItem key={index} notification={notification} />
              ))}
          </ul>
        </InfiniteScroll>
      </CustomScrollbars>
    </Auxiliary>
  );
};

export default AppNotification;
