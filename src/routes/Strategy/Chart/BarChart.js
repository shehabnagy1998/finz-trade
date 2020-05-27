import React, { useEffect, useState } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import data from "./data";
import Widget from "../../../components/Widget";

const BarChartComp = ({ cName, name, data }) => {
  const [arrObj, setArrObj] = useState([]);
  useEffect(() => {
    if (data.length >= 1) {
      let arrObjCon = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        arrObjCon = [
          ...arrObjCon,
          { [name]: element, name: (i + 1).toString() },
        ];
      }
      setArrObj(arrObjCon);
    }
  }, [data]);
  console.log(arrObj);

  return (
    <Widget styleName="gx-card gx-flex-grow-1">
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            data={arrObj}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 20, right: 20 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar name={`${cName}`} dataKey={name} fill="#7b33ac" barSize={20} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Widget>
  );
};

export default BarChartComp;
