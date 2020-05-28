import React from "react";
import { Row, Col } from "antd";
import TableCard from "./TableCard";
import { useSelector } from "react-redux";

const timeConversion = (millisec) => {
  var seconds = (millisec / 1000).toFixed(1);

  var minutes = (millisec / (1000 * 60)).toFixed(1);

  var hours = (millisec / (1000 * 60 * 60)).toFixed(1);

  var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds < 60) {
    return seconds + " Sec";
  } else if (minutes < 60) {
    return minutes + " Min";
  } else if (hours < 24) {
    return hours + " Hrs";
  } else {
    return days + " Days";
  }
};

const columns1 = [
  {
    title: "Min Volume",
    render: (i) => {
      return <span className=""> {parseFloat(i.minVolume)} LOT</span>;
    },
  },
  {
    title: "Max Volume",
    render: (i) => {
      return <span className=""> {parseFloat(i.maxVolume)} LOT</span>;
    },
  },
  {
    title: "Avg Volume",
    render: (i) => {
      return <span className=""> {parseFloat(i.avgVolume)} LOT</span>;
    },
  },
  {
    title: "Total Volume",
    render: (i) => {
      return (
        <span className="">
          {" "}
          {parseFloat(i.minVolume) + parseFloat(i.maxVolume)} LOT
        </span>
      );
    },
  },
];
const columns2 = [
  {
    title: "Most Trades Side",
    dataIndex: "mostTradesSide",
  },
  {
    title: "Long Trades",
    dataIndex: "longTrades",
  },
  {
    title: "Short Trades",
    dataIndex: "shortTrades",
  },
];
const columns3 = [
  {
    title: "Lose Trades",
    dataIndex: "loseTrades",
  },
  {
    title: "Win Trades",
    dataIndex: "winTrades",
  },
  {
    title: "Pending Trades",
    dataIndex: "pendingTrades",
  },
  {
    title: "All Trades",
    render: (i) => {
      return <span className="">{parseFloat(i.totalTrades)}</span>;
    },
  },
];

const columns4 = [
  {
    title: "Max Hold Period",
    render: (i) => {
      return (
        <span className="">
          {timeConversion(parseFloat(i.maxHoldingPeriod))}
        </span>
      );
    },
  },
  {
    title: "Min Hold Period",
    render: (i) => {
      return (
        <span className="">
          {timeConversion(parseFloat(i.minHoldingPeriod))}
        </span>
      );
    },
  },
  {
    title: "Avg Hold Period",
    render: (i) => {
      return (
        <span className="">
          {timeConversion(parseFloat(i.avgHoldingPeriod))}
        </span>
      );
    },
  },
  {
    title: "Total Hold Period",
    render: (i) => {
      return (
        <span className="">
          {timeConversion(parseFloat(i.totalHoldingPeriod))}
        </span>
      );
    },
  },
];
const columns5 = [
  {
    title: "Profit Factor",
    dataIndex: "profitFactor",
  },
  {
    title: "Winning Rate",
    render: (i) => {
      return <span className="">{parseFloat(i.winingRate)}%</span>;
    },
  },
  {
    title: "Rio",
    dataIndex: "rio",
  },
];
const columns6 = [
  {
    title: "Max Drawdown",
    dataIndex: "maxLoss",
  },
  {
    title: "Best Head",
    dataIndex: "maxWin",
  },
  {
    title: "Loses",
    dataIndex: "loses",
  },
  {
    title: "Profits",
    dataIndex: "profits",
  },
];

const TableContainer = ({ profileInfo }) => {
  return (
    <div>
      <Row>
        <Col xs={24} className="gx-col-full">
          <TableCard columns={columns1} data={[profileInfo.stats]} />
        </Col>
        <Col xs={24} className="gx-col-full">
          <TableCard columns={columns2} data={[profileInfo.stats]} />
        </Col>
        <Col xs={24} className="gx-col-full">
          <TableCard columns={columns3} data={[profileInfo.stats]} />
        </Col>
        <Col xs={24} className="gx-col-full">
          <TableCard columns={columns4} data={[profileInfo.stats]} />
        </Col>
        <Col xs={24} className="gx-col-full">
          <TableCard columns={columns5} data={[profileInfo.stats]} />
        </Col>
        <Col xs={24} className="gx-col-full">
          <TableCard
            columns={columns6}
            data={[profileInfo.stats]}
            last={true}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TableContainer;
