import React, { useEffect, useState } from "react";
import StrategyItem from "./StrategyItem";
import WriteBox from "../../../components/wall/WriteBox/index";

const StrategyList = (props) => {
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  return (
    <>
      {props.items.map((item, index) => {
        return (
          <StrategyItem
            key={item._id}
            index={index}
            itemData={item}
            user={user}
          />
        );
      })}
    </>
  );
};

export default StrategyList;
