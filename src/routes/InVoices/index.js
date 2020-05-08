import React, { useEffect, useState } from "react";
import { Col, Row, Card, Table, Typography, Button } from "antd";

import Auxiliary from "../../util/Auxiliary";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "../../components/CircularProgress";
import DisplayDate from "../../components/wall/DisplayDate";
import getInVoices from "../../appRedux/actions/API/getInVoices";
import moment from "moment";

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
          {i.amount} {i.currency}
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
    { title: "Total", dataIndex: "total", key: "total" },
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
      render: (i) =>
        i.status === "open" ? (
          <div className="gx-d-flex">
            <Button icon="check" className="gx-mr-2" type="primary" />
            <Button icon="close" type="danger" />
          </div>
        ) : (
          <span>No Action</span>
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
