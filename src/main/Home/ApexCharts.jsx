import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { fetchCoins, fetchOlhc } from "../../redux/coinsSlice";

const Apex = () => {
  const [olhcState, setOlhcState] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOlhc("yhjMzLPhuIDl" ))
      .then((response) => {
        console.log(response, "responseresponse");
        setOlhcState(response.payload.data.ohlc);
      })
      .catch((error) => {
        console.error("Error fetching OHLC data:", error);
      });
  }, [dispatch]);

  const candlestickData = olhcState.map((item) => ({
    x: dayjs.unix(item.startingAt).toDate(),
    y: [
      parseFloat(item.open),
      parseFloat(item.high),
      parseFloat(item.low),
      parseFloat(item.close),
    ],
  }));

  const options = {
    chart: {
      height: 350,
      type: "candlestick",
    },
    title: {
      text: "Bitcoin - BTC/USD",
      align: "left",
      style: {
        color: "#ffffff",
        fontSize: 48, // Set title text color to white
        fontFamily: "var(--fontFamily)",
      },
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (val) {
          return dayjs(val).format("MMM DD HH:mm");
        },
        style: {
          colors: "#ffffff",
          fontFamily: "var(--fontFamily)", // Set text color to white
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: function (val) {
          return val.toFixed(0); // Adjust the number of decimal places as needed
        },
        style: {
          colors: "#ffffff",
          fontFamily: "var(--fontFamily)", // Set text color to white
        },
      },
    },
  };

  return (
    <div
      style={{
        paddingTop: 160,
        paddingBottom: 160,
        backgroundColor: "#045444",
        marginTop: 240,
        color: "#fff",
        paddingLeft: 16,
        paddingRight: 16,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
   
      }}
    >
      <div
        id="chart"
        style={{
          backgroundColor: "#ffffff12",
          padding: "48px 16px",
          borderRadius: 16,
          maxWidth: 1000,
          width: '100%',
          border: `1px white solid`
        }}
      >
        <ReactApexChart
          options={options}
          series={[{ data: candlestickData }]}
          type="candlestick"
          height={503}
        />
      </div>
    </div>
  );
};

export default Apex;
