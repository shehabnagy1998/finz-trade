import React from "react";
import Widget from "components/Widget";

import OwnStrateyItem from "./OwnStrateyItem";
import { useSelector } from "react-redux";

const OwnStrategy = () => {
  const strategies = useSelector(({ Api }) => Api.strategies.owned);

  return (
    <Widget styleName="gx-card-profile" title="Own Strategy">
      {strategies.map((item, index) => (
        <OwnStrateyItem item={item} key={index} />
      ))}
    </Widget>
  );
};

export default OwnStrategy;
