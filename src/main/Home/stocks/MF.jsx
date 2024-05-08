import React, { useEffect, useState } from "react";
import axios from "axios";
import "./stocks.css";

const MutualFundsPage = () => {
  const [mutualFundsData, setMutualFundsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/mutual_funds/list',
        params: { apikey: 'demo' },
        headers: {
          'X-RapidAPI-Key': 'c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be',
          'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setMutualFundsData(response?.data?.result?.list || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching mutual funds data:", error);
        setError("Failed to fetch mutual funds data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ paddingTop: 120 }}>
      <div className="container">
        <h1>Mutual Funds Data</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : Array.isArray(mutualFundsData) && mutualFundsData.length > 0 ? (
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
              {mutualFundsData.map((fund, idx) => (
                <tr key={idx}>
                  <td>{fund.symbol}</td>
                  <td>{fund.name}</td>
                  <td>{fund.currency}</td>
                  <td>{fund.exchange}</td>
                  <td>{fund.mic_code}</td>
                  <td>{fund.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No mutual funds data available.</p>
        )}
      </div>
    </div>
  );
};

export default MutualFundsPage;
