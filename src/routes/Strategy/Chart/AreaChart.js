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
import dataO from "./data";
import Widget from "../../../components/Widget";

const ComposedChartComp = ({ cName, name, data }) => {
  const [arrObj, setArrObj] = useState([]);
  const [offValue, setOffValue] = useState(null);
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
      setOffValue(gradientOffset());
      setArrObj(arrObjCon);
    }
  }, [data]);

  const gradientOffset = () => {
    const dataMax = Math.max(...arrObj.map((i) => i[name]));
    const dataMin = Math.min(...arrObj.map((i) => i[name]));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

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
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset={offValue} stopColor="#7b33ac" stopOpacity={1} />
                <stop offset={offValue} stopColor="#ed6324" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              name={`${cName}`}
              dataKey={name}
              strokeOpacity={0}
              fill="url(#splitColor)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Widget>
  );
};

export default ComposedChartComp;
