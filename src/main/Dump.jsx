import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexCharts from "apexcharts";
import { useLocation } from "react-router-dom";

function CoinDetails() {
  const [coinDetails, setCoinDetails] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { pathname } = location;
  const rank = parseInt(pathname.match(/\d+/)[0]); // Extract the number after "coin/" and convert it to an integer

  useEffect(() => {
    const fetchCoinData = async () => {
      const options = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/coins",
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          timePeriod: "30d", // Fetch data for the last 30 days
          "tiers[0]": "1",
          orderBy: "marketCap",
          orderDirection: "desc",
          limit: "50",
          offset: "0",
        },
        headers: {
          "X-RapidAPI-Key":
            "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const coinsData = response.data.data.coins;
        const filteredCoin = coinsData.find(
          (coin, index) => index === parseInt(rank) - 1
        );

        const candlestickData = filteredCoin.sparkline.map((price, index) => {
          const openPrice = parseFloat(price);
          const closePrice = openPrice + getRandomDifference();
          const highPrice =
            Math.max(openPrice, closePrice) + getRandomDifference();
          const lowPrice =
            Math.min(openPrice, closePrice) - getRandomDifference();
          return {
            x: new Date(Date.now() - (30 - index) * 24 * 60 * 60 * 1000), // Calculate timestamp for each day over the past month
            y: [openPrice, highPrice, lowPrice, closePrice],
          };
        });

        setCoinDetails({ ...filteredCoin, candlestickData });
      } catch (error) {
        console.error("Error fetching coin data:", error);
        setError(error);
      }
    };

    fetchCoinData();
  }, [rank]);
  function getRandomDifference() {
    return Math.floor(Math.random() * (1500 - 100 + 1)) + 400; // Generate random difference between $400 and $1500
  }

  useEffect(() => {
    if (coinDetails) {
      renderChart();
    }
  }, [coinDetails]);

  const renderChart = () => {
    const candlestickData = coinDetails.candlestickData.map((dataPoint) => {
      const [open, high, low, close] = dataPoint.y;
      const color = close > open ? "#3C90EB" : "#DF7D46"; // Green if close > open, else red
      return { ...dataPoint, color };
    });

    const options = {
      chart: {
        type: "candlestick",
        height: 350,
      },
      series: [
        {
          data: coinDetails.candlestickData,
        },
      ],
      xaxis: {
        type: "datetime",
      },
      candlestick: {
        colors: {
          upward: "#3C90EB",
          downward: "#DF7D46",
        },
      },

      annotations: {
        xaxis: [
          {
            x: 'Oct 06 14:00',
            borderColor: '#00E396',
            label: {
              borderColor: '#00E396',
              style: {
                fontSize: '12px',
                color: '#fff',
                background: '#00E396'
              },
              orientation: 'horizontal',
              offsetY: 7,
              text: 'Annotation Test'
            }
          }
        ]
      },
      tooltip: {
        enabled: true,
      },
      xaxis: {
        type: 'category',
        labels: {
          formatter: function(val) {
            return dayjs(val).format('MMM DD HH:mm')
          }
        }
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
      
    };

    const chart = new ApexCharts(document.getElementById("chart"), options);
    chart.render();
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!coinDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        {coinDetails.name} ({coinDetails.symbol}) Details
      </h1>
      <ul>
        <li>Rank: {coinDetails.rank}</li>
        <li>Price: ${coinDetails.price}</li>
        <li>Market Cap: ${coinDetails.marketCap}</li>
        <li>24h Change: {coinDetails.change}%</li>
      </ul>
      <div id="chart"></div>
    </div>
  );
}

export default CoinDetails;
