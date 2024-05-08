import React, { useEffect, useState } from "react";
import axios from "axios";
import "./stocks.css";

const AllDataPage = () => {
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://twelve-data1.p.rapidapi.com/mutual_funds/world",
        params: { symbol: "VFIAX" },
        headers: {
          "X-RapidAPI-Key":
            "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
          "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setAllData(response?.data?.mutual_fund);
        setError(null);
      } catch (error) {
        console.error("Error fetching all data:", error);
        setError("Failed to fetch all data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ paddingTop: 120 }}>
      <div className="container">
        <h1>All Data</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div>
            <h2>Risk:</h2>
            <h3>Bond Breakdown:</h3>
            <ul>
              {(allData?.risk?.bond_breakdown).map(
                ([key, value]) => (
                  <li key={key}>
                    {key}:{" "}
                    {typeof value === "object" ? JSON.stringify(value) : value}
                  </li>
                )
              )}
            </ul>

            <h3>Volatility Measures:</h3>
            <ul>
              {allData?.risk?.volatility_measures?.map((measure, index) => (
                <li key={index}>Measure: {measure}</li>
              ))}
            </ul>

            <h3>Valuation Metrics:</h3>
            <ul>
              {(allData?.risk?.valuation_metrics).map(
                ([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                )
              )}
            </ul>

            <h2>Composition:</h2>
            <h3>Asset Allocation:</h3>
            <ul>
              {(allData?.composition?.asset_allocation).map(
                ([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                )
              )}
            </ul>

            <h3>Bond Breakdown:</h3>
            <ul>
              {(allData?.composition?.bond_breakdown).map(
                ([key, value]) => (
                  <li key={key}>
                    {key}:{" "}
                    {typeof value === "object" ? JSON.stringify(value) : value}
                  </li>
                )
              )}
            </ul>

            <h3>Major Market Sectors:</h3>
            <ul>
              {allData?.composition?.major_market_sectors?.map(
                (sector, index) => (
                  <li key={index}>
                    Sector: {sector.sector}, Weight: {sector.weight}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDataPage;
