import React from "react";
import { Table } from "antd";
import Widget from "components/Widget/index";

const data = [
  {
    key: "1",
    currency: "0.24 BTC",
    rate: "1 BTC = $740",
    date: "08.10.17",
    fee: "-$2.33",
  },
];

const TableCard = ({ columns, data, last }) => {
  return (
    <Widget
      styleName={`gx-p-2 ${last ? "gx-mb-4" : "gx-mb-2"}`}
      // title={<h2 className="h4 gx-text-capitalize gx-mb-0">Order History</h2>}
      // extra={
      //   <p className="gx-text-primary gx-mb-0 gx-pointer">Detailed History</p>
      // }
    >
      <div className="gx-table-responsive">
        <Table
          className="gx-table-no-bordered"
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered={false}
          size="small"
        />
      </div>
    </Widget>
  );
};

export default TableCard;
