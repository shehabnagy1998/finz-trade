import React, { useEffect, useState } from "react";
import { Col, Row, Card, Table, Typography, Button } from "antd";

import Auxiliary from "../../util/Auxiliary";
import { useSelector, useDispatch } from "react-redux";
import getInVoices from "../../appRedux/actions/API/getInVoices";
import payInVoice from "../../appRedux/actions/API/payInVoice";
import cancelnVoice from "../../appRedux/actions/API/cancelnVoice";
import moment from "moment";
import { DownloadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const InVoices = ({ match }) => {
  const { pageLoaders, user, inVoices } = useSelector(({ Api }) => Api);
  const dispatch = useDispatch();
  let pageTotal = 1;
  const [highestPage, setHighestPage] = useState(1);
  const [state, setState] = useState({
    filteredInfo: {},
    sortedInfo: {},
    pagination: {
      current: 1,
      pageSize: pageTotal,
      total: pageTotal,
    },
  });

  useEffect(() => {
    dispatch(getInVoices());
  }, []);

  console.log(state.pagination);
  useEffect(() => {
    if (inVoices.list.length >= 1) {
      if (inVoices.hasMore) {
        setState({
          ...state,
          pagination: {
            ...state.pagination,
            total: state.pagination.total + pageTotal,
          },
        });
      }
    }
  }, [inVoices]);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);

    if (pagination.current > highestPage) {
      dispatch(getInVoices(inVoices.list[inVoices.list.length - 1].id));
      setHighestPage(pagination.current);
    }

    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
      pagination,
    });
  };

  const columns = [
    {
      title: "Amount",
      key: "amount",
      render: (i) => (
        <span>
          {i.amount / 100} {i.currency.toUpperCase()}
        </span>
      ),
      sorter: (a, b) => a.amount - b.amount,
      sortOrder:
        state.sortedInfo.columnKey === "amount" && state.sortedInfo.order,
    },
    {
      title: "Plan Description",
      width: 300,
      dataIndex: "plan_description",
      key: "plan_description",
    },
    {
      title: "Plan Started At",
      dataIndex: "period_start_at",
      key: "start_at",
      render: (i) => (
        <span>{moment(new Date(parseInt(i) * 1000)).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Plan Ended At",
      dataIndex: "period_end_at",
      key: "end_at",
      render: (i) => (
        <span>{moment(new Date(parseInt(i) * 1000)).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (i) => (
        <span>
          {i.total / 100} {i.currency.toUpperCase()}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.length - b.status.length,
      sortOrder:
        state.sortedInfo.columnKey === "status" && state.sortedInfo.order,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (i) => (
        <div className="gx-d-flex gx-justify-content-center">
          {/* <Button
            icon="download"
            type="link"
            loading={pageLoaders.payInVoice === i.id}
            onClick={(_) => dispatch(payInVoice(i.id))}
          /> */}
          <a href={i.invoice_pdf} download>
            {/* <i className="icon icon-download" /> */}
            <DownloadOutlined />
          </a>
          {i.status === "open" && (
            <>
              <Button
                icon="check"
                className="gx-mx-2"
                type="primary"
                loading={pageLoaders.payInVoice === i.id}
                onClick={(_) => dispatch(payInVoice(i.id))}
              />
              <Button
                icon="close"
                type="danger"
                loading={pageLoaders.cancelInVoice === i.id}
                onClick={(_) => dispatch(cancelnVoice(i.id))}
              />
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Auxiliary>
      <Title className="gx-text-center gx-mb-2">All Invoices</Title>
      <Card className="gx-w-100">
        <Table
          columns={columns}
          dataSource={inVoices.list}
          scroll={{ x: 1300 }}
          onChange={handleChange}
          loading={pageLoaders.getInVoices}
          pagination={state.pagination}
        />
      </Card>
    </Auxiliary>
  );
};

export default InVoices;
