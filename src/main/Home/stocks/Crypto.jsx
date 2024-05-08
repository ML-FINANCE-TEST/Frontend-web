import React, { useEffect, useState } from "react";
import axios from "axios";
import "./stocks.css";

const CryptoAll = () => {
  const [stocksData, setStocksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://twelve-data1.p.rapidapi.com/cryptocurrencies",
        params: {
          currency_base: "BTC",
          format: "json",
        },
        headers: {
          "X-RapidAPI-Key":
            "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
          "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response, "response");
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
                {/* <th>Name</th> */}
                <th>Currency Base</th>
                <th>Symbol</th>
                <th>Currency Quote</th>
                <th>Available Exchanges</th>
              </tr>
            </thead>
            <tbody>
              {stocksData.map((stock, index) => (
                <tr key={index}>
                  {/* <td>{stock.name}</td> */}
                  <td>{stock.currency_base}</td>
                  <td>{stock.symbol}</td>
                  <td>{stock.currency_quote}</td>
                  <td>{stock.available_exchanges.join(", ")}</td>
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

export default CryptoAll;
