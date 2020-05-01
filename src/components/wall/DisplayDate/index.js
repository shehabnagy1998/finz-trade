import React from "react";
import moment from "moment";

const DisplayDate = ({ date }) => {
  const postDate = moment(
    new Date(parseInt(date)),
    "ddd MMM DD YYYY kk:mm:ss Z"
  ).fromNow();
  return postDate;
};

export default DisplayDate;
