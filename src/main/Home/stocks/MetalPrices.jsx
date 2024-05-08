import React, { useState, useEffect } from "react";
import axios from "axios";

const MetalPrices = () => {
  const [metalData, setMetalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://live-metal-prices.p.rapidapi.com/v1/latest",
        headers: {
          "X-RapidAPI-Key":
            "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
          "X-RapidAPI-Host": "live-metal-prices.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setMetalData(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching metal prices:", error);
        setLoading(false);
        setError("Failed to fetch metal prices. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="metal-prices-container">
      <h1>Metal Prices</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {metalData && (
        <div>
          <p>Base Currency: {metalData.baseCurrency}</p>
          <p>Unit: {metalData.unit}</p>
          <h2>Rates:</h2>
          <ul>
            {Object.entries(metalData.rates).map(([metal, price]) => (
              <li key={metal}>
                {metal}: {price}
              </li>
            ))}
          </ul>
        </div>
      )}
      <style jsx>{`
        .metal-prices-container {
          padding-top: 120px;
        }
        .error {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default MetalPrices;
