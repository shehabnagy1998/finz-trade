import React from "react";
import moment from "moment";

const DisplayDate = ({ date }) => {
  const postDate = moment.unix(date / 1000).fromNow();
  return postDate;
};

export default DisplayDate;
