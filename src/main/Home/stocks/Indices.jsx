import React, { useEffect, useState } from "react";
import axios from "axios";
import "./stocks.css";

const IndicesPage = () => {
  const [indicesData, setIndicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/indices',
        params: {
          exchange: 'NYSE',
          format: 'json'
        },
        headers: {
          'X-RapidAPI-Key': 'c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be',
          'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setIndicesData(response?.data?.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching indices data:", error);
        setError("Failed to fetch indices data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ paddingTop: 120 }}>
      <div className="container">
        <h1>Indices Data</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : Array.isArray(indicesData) && indicesData.length > 0 ? (
          <table className="stock-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Currency</th>
                <th>Exchange</th>
                <th>MIC Code</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {indicesData.map((index, idx) => (
                <tr key={idx}>
                  <td>{index.symbol}</td>
                  <td>{index.name}</td>
                  <td>{index.currency}</td>
                  <td>{index.exchange}</td>
                  <td>{index.mic_code}</td>
                  <td>{index.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No indices data available.</p>
        )}
      </div>
    </div>
  );
};

export default IndicesPage;
