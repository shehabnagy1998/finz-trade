import React, { useRef } from "react";
import { Avatar, Spin } from "antd";
import { CDN } from "../../../constants/API";
import DisplayDate from "../../wall/DisplayDate";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, editUserPic } from "../../../appRedux/actions/Auth";
import IntlMessages from "../../../util/IntlMessages";
import { UserOutlined } from "@ant-design/icons";
import NoProfileImg from "assets/images/noProfile.jpg";

const ProfileHeader = ({ profileInfo }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { pageLoaders, pageErrors } = useSelector(({ Api }) => Api);

  const handleFileChange = (e) => {
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = async function () {
        let base64 = reader.result;
        // base64 = base64.replace("data:image/jpeg;", "");
        try {
          await dispatch(editUserPic(base64));
        } catch (error) {
          console.log(error);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const ProfilePic = profileInfo.pic
    ? { src: CDN + profileInfo.pic }
    : { icon: <UserOutlined /> };
  return (
    <div className="gx-profile-banner">
      <div className="gx-profile-container">
        <div className="gx-profile-banner-top">
          <div className="gx-profile-banner-top-left">
            <div
              className="gx-profile-banner-avatar gx-custom-avatar"
              onClick={(_) => ref.current.click()}
            >
              <Spin spinning={pageLoaders.editUserPic || false}>
                <Avatar
                  size={90}
                  alt="..."
                  src={profileInfo.pic ? CDN + profileInfo.pic : NoProfileImg}
                />
              </Spin>
              <input
                type="file"
                ref={ref}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="gx-profile-banner-avatar-info">
              <h2 className="gx-mb-2 gx-mb-sm-3 gx-fs-xxl gx-font-weight-light">
                {profileInfo.name}
              </h2>
              <p className="gx-mb-0 gx-fs-lg">
                <IntlMessages
                  id="registered"
                  values={{
                    val: <DisplayDate date={profileInfo.registeredIn} />,
                  }}
                />
              </p>
            </div>
          </div>
          <div className="gx-profile-banner-top-right">
            <ul className="gx-follower-list">
              <li>
                <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">
                  {profileInfo.following}
                </span>
                <span className="gx-fs-sm">
                  <IntlMessages id="following" />
                </span>
              </li>
              <li>
                <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">
                  {profileInfo.watching}
                </span>
                <span className="gx-fs-sm">
                  <IntlMessages id="watching" />
                </span>
              </li>
              <li>
                <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">
                  {profileInfo.orders}
                </span>
                <span className="gx-fs-sm">
                  <IntlMessages id="orders" />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
