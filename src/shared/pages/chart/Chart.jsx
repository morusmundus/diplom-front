import React, {useEffect, useState} from 'react';
import ChartService from "../../../API/ChartService";
import {useGrabData} from "../../hooks/useGrabData";
import Loader from "../../ui/loader/Loader";
import {LineChart, CartesianGrid, Cell, Label, Legend, Pie, PieChart, Tooltip, XAxis, YAxis, Line} from 'recharts';


const container = {
  width: "720px",
  margin: "0 auto",
}

const Analytics = () => {

  return (
    <div style={container}>
      <PieChartBlock/>
      <LineChartBlock/>
    </div>
  );
};

export default Analytics;

const PieChartBlock = () => {
  const [pieChartData, setPieChartData] = useState([]);

  const [loadChartData, isDataLoading] = useGrabData(async () => {
    const response = await ChartService.getPieDataRatioByCategories()
    setPieChartData(response.data)
  })

  const COLORS = ['#82ca9d', '#34ca9d', '#11ca9d', '#ff8a00', '#0088fe', '#ff8042'];

  useEffect(() => {
    loadChartData()
  }, [])

  return (
    <>
      <h1 style={{fontWeight: "bold", fontSize: "24px"}}>Доля книг по жанрам</h1>
      {!isDataLoading
        ?
          <PieChart width={800} height={500}>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={90}
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
              ))}
              <Label
                value="% среди жанров"
                position="center"
                fill="black"
                style={{fontSize: '16px', fontWeight: 'bold'}}
              />
            </Pie>
            <Legend verticalAlign="middle" layout="vertical" align="right"/>
            <Tooltip/>
          </PieChart>
        : <Loader/>
      }
    </>
  )
}


const LineChartBlock = () => {
  const [chartData, setChartData] = useState([]);

  const [loadChart, isChartLoading] = useGrabData(async () => {
    const response = await ChartService.getPurchaseCountLastDays(7)
    console.log(response.data)
    setChartData(response.data)
  })

  useEffect(() => {
    loadChart()
  }, [])

  return (
    <>
      <h1 style={{fontWeight: "bold", fontSize: "24px", marginBottom: "20px"}}>
        <span>Количество оформленных через корзину книг</span><br/>
        <span>за последние 7 дней </span>
      </h1>
      {!isChartLoading
        ?
        <LineChart width={730} height={250} data={chartData}
                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
        : <Loader/>
      }
    </>
  )
}