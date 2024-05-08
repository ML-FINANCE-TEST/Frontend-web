import React, { useEffect, useState } from "react";
import axios from "axios";
import "./stocks.css";

const Twelve = () => {
  const [stocksData, setStocksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://twelve-data1.p.rapidapi.com/stocks",
        params: {
          exchange: "NASDAQ",
          format: "json",
        },
        headers: {
          "X-RapidAPI-Key": "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
          "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response, 'response')
        setStocksData(response?.data?.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching stocks data:", error);
        setError("Failed to fetch stocks data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ paddingTop: 120 }}>
      <div className="container">
        <h1>Stocks Data</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : Array.isArray(stocksData) ? (
          <table className="stock-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Currency</th>
                <th>Exchange</th>
                <th>MIC Code</th>
                <th>Country</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {stocksData.map((stock) => (
                <tr key={stock?.symbol}>
                  <td>{stock?.symbol}</td>
                  <td>{stock?.name}</td>
                  <td>{stock?.currency}</td>
                  <td>{stock?.exchange}</td>
                  <td>{stock?.mic_code}</td>
                  <td>{stock?.country}</td>
                  <td>{stock?.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No stocks data available.</p>
        )}
      </div>
    </div>
  );
};

export default Twelve;
