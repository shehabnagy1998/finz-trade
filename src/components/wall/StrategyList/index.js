import React, { useEffect, useState } from "react";

import StrategyCard from "../../StrategyCard";

const StrategyList = (props) => {
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  return (
    <>
      {props.items.length >= 1 &&
        props.items.map((item, index) => {
          return <StrategyCard key={item._id} index={index} strategy={item} />;
        })}
    </>
  );
};

export default StrategyList;
