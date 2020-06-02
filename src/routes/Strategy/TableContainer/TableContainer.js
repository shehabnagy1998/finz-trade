import React from "react";
import { Row, Col } from "antd";
import TableCard from "./TableCard";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";

const TableContainer = () => {
  const { formatMessage } = useIntl();

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
      title: formatMessage({ id: "minVolume" }),
      render: (i) => {
        return <span className=""> {parseFloat(i.minVolume)} LOT</span>;
      },
    },
    {
      title: formatMessage({ id: "maxVolume" }),
      render: (i) => {
        return <span className=""> {parseFloat(i.maxVolume)} LOT</span>;
      },
    },
    {
      title: formatMessage({ id: "avgVolume" }),
      render: (i) => {
        return <span className=""> {parseFloat(i.avgVolume)} LOT</span>;
      },
    },
    {
      title: formatMessage({ id: "totalVolume" }),
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
      title: formatMessage({ id: "mostTradesSide" }),
      dataIndex: "mostTradesSide",
    },
    {
      title: formatMessage({ id: "longTrades" }),
      dataIndex: "longTrades",
    },
    {
      title: formatMessage({ id: "shortTrades" }),
      dataIndex: "shortTrades",
    },
  ];
  const columns3 = [
    {
      title: formatMessage({ id: "loseTrades" }),
      dataIndex: "loseTrades",
    },
    {
      title: formatMessage({ id: "winTrades" }),
      dataIndex: "winTrades",
    },
    {
      title: formatMessage({ id: "pendingTrades" }),
      dataIndex: "pendingTrades",
    },
    {
      title: formatMessage({ id: "totalTrades" }),
      render: (i) => {
        return <span className="">{parseFloat(i.totalTrades)}</span>;
      },
    },
  ];

  const columns4 = [
    {
      title: formatMessage({ id: "maxHoldPeriod" }),
      render: (i) => {
        return (
          <span className="">
            {timeConversion(parseFloat(i.maxHoldingPeriod))}
          </span>
        );
      },
    },
    {
      title: formatMessage({ id: "minHoldPeriod" }),
      render: (i) => {
        return (
          <span className="">
            {timeConversion(parseFloat(i.minHoldingPeriod))}
          </span>
        );
      },
    },
    {
      title: formatMessage({ id: "avgHoldPeriod" }),
      render: (i) => {
        return (
          <span className="">
            {timeConversion(parseFloat(i.avgHoldingPeriod))}
          </span>
        );
      },
    },
    {
      title: formatMessage({ id: "totalHoldPeriod" }),
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
      title: formatMessage({ id: "profitFactor" }),
      render: (i) => {
        return (
          <span className="">
            {i.profitFactor
              ? parseFloat(i.profitFactor)
              : parseFloat(i.profits) + 1}
          </span>
        );
      },
    },
    {
      title: formatMessage({ id: "winningRate" }),
      render: (i) => {
        return <span className="">{parseFloat(i.winingRate)}%</span>;
      },
    },
    {
      title: formatMessage({ id: "rio" }),
      dataIndex: "rio",
    },
  ];
  const columns6 = [
    {
      title: formatMessage({ id: "maxDrawdown" }),
      dataIndex: "maxLoss",
    },
    {
      title: formatMessage({ id: "bestHead" }),
      dataIndex: "maxWin",
    },
    {
      title: formatMessage({ id: "loses" }),
      dataIndex: "losses",
    },
    {
      title: formatMessage({ id: "profits" }),
      dataIndex: "profits",
    },
  ];

  const strategy = useSelector(({ Api }) => Api.strategy);

  return (
    <div>
      <Row>
        <Col xs={24} className="gx-col-full">
          <TableCard columns={columns1} data={[strategy.stats]} />
        </Col>
        <Col xs={24} className="gx-col-full">
          <TableCard columns={columns2} data={[strategy.stats]} />
        </Col>
        <Col xs={24} className="gx-col-full">
          <TableCard columns={columns3} data={[strategy.stats]} />
        </Col>
        <Col xs={24} className="gx-col-full">
          <TableCard columns={columns4} data={[strategy.stats]} />
        </Col>
        <Col xs={24} className="gx-col-full">
          <TableCard columns={columns5} data={[strategy.stats]} />
        </Col>
        <Col xs={24} className="gx-col-full">
          <TableCard columns={columns6} data={[strategy.stats]} last={true} />
        </Col>
      </Row>
    </div>
  );
};

export default TableContainer;
