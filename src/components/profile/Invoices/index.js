import React, { useEffect, useState } from "react";
import { Table, Typography, Button } from "antd";

import { useSelector, useDispatch } from "react-redux";
import getInVoices from "../../../appRedux/actions/API/getInVoices";
import payInVoice from "../../../appRedux/actions/API/payInVoice";
import cancelnVoice from "../../../appRedux/actions/API/cancelnVoice";
import moment from "moment";
import { DownloadOutlined } from "@ant-design/icons";
import Widget from "../../Widget";
import IntlMessages from "../../../util/IntlMessages";

const { Text } = Typography;

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
      title: <IntlMessages id="amount" />,
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
      title: <IntlMessages id="planDescription" />,
      width: 300,
      dataIndex: "plan_description",
      key: "plan_description",
    },
    {
      title: <IntlMessages id="planStart" />,
      dataIndex: "period_start_at",
      key: "start_at",
      render: (i) => (
        <span>{moment(new Date(parseInt(i) * 1000)).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: <IntlMessages id="planEnd" />,
      dataIndex: "period_end_at",
      key: "end_at",
      render: (i) => (
        <span>{moment(new Date(parseInt(i) * 1000)).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: <IntlMessages id="total" />,
      key: "total",
      render: (i) => (
        <span>
          {i.total / 100} {i.currency.toUpperCase()}
        </span>
      ),
    },
    {
      title: <IntlMessages id="status" />,
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.length - b.status.length,
      sortOrder:
        state.sortedInfo.columnKey === "status" && state.sortedInfo.order,
    },
    {
      title: <IntlMessages id="action" />,
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
    <Widget styleName="gx-card-profile">
      <div className="gx-mt-4 gx-d-flex gx-justify-content-between gx-mb-4">
        <Text className="gx-fs-xl">
          <IntlMessages id="invoices" />
        </Text>
      </div>
      <Table
        columns={columns}
        dataSource={inVoices.list}
        scroll={{ x: 1300 }}
        onChange={handleChange}
        loading={pageLoaders.getInVoices}
        pagination={state.pagination}
      />
    </Widget>
  );
};

export default InVoices;
