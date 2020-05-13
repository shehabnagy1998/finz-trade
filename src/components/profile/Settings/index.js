import React, { useEffect, useState } from "react";
import { Badge, Typography, Button, Switch, Spin } from "antd";
import Widget from "../../Widget/index";
import { useSelector, useDispatch } from "react-redux";
import editUserSettings from "../../../appRedux/actions/API/editUserSettings";

const { Text } = Typography;

const Friends = ({}) => {
  const { pageLoaders } = useSelector(({ Api }) => Api);
  const { userInfo } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  const [settings, setSettings] = useState({
    showProfits: false,
    emailNotifications: false,
    pushNotifications: false,
  });

  useEffect(() => {
    if (userInfo.preferences)
      setSettings({
        ...userInfo.preferences,
      });
  }, [userInfo.preferences]);

  const handleChange = async (val, id) => {
    const obj = { ...settings, [id]: val };
    try {
      await dispatch(editUserSettings(obj, setSettings));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Spin spinning={pageLoaders.editUserSettings || false}>
      <Widget styleName="gx-card-profile-sm">
        <div className="gx-d-flex gx-align-items-center gx-my-3">
          <i className="icon icon-setting gx-mr-2 gx-center" />
          <Text className="gx-fs-xl">Settings</Text>
        </div>
        <div className="gx-flex-column">
          <div className="gx-d-flex gx-align-items-center gx-justify-content-between gx-mb-2">
            <Text>Show Profits</Text>
            <Switch
              size="small"
              checked={settings.showProfits}
              onChange={(val) => handleChange(val, "showProfits")}
            />
          </div>
          <div className="gx-d-flex gx-align-items-center gx-justify-content-between gx-mb-2">
            <Text>Recive Emails</Text>
            <Switch
              size="small"
              checked={settings.emailNotifications}
              onChange={(val) => handleChange(val, "emailNotifications")}
            />
          </div>
          <div className="gx-d-flex gx-align-items-center gx-justify-content-between">
            <Text>Recive push notifications</Text>
            <Switch
              size="small"
              checked={settings.pushNotifications}
              onChange={(val) => handleChange(val, "pushNotifications")}
            />
          </div>
        </div>
      </Widget>
    </Spin>
  );
};
export default Friends;
