import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const FearAndGreed = () => {
  const [fearValue, setFearValue] = useState(null);
  const [fearClassification, setFearClassification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://crypto-fear-greed-index2.p.rapidapi.com/index",
        params: {
          limit: "10",
          timestamp: "1518048000",
        },
        headers: {
          "X-RapidAPI-Key":
            "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
          "X-RapidAPI-Host": "crypto-fear-greed-index2.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const { value, value_classification } = response.data;
        setFearValue(value);
        setFearClassification(value_classification);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setError("You have exceeded your free API calls for today.");
        } else {
          console.error(error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: `120px 24px` }}>
      <h2>Crypto Fear and Greed Index</h2>
      {error ? (
            <p
            style={{ color: "red", backgroundColor: "#ff000017", padding: 24 }}
          >
            {error}
          </p>
      ) : (
        fearValue && fearClassification && (
          <div>
            <CircularProgressbar
              value={parseInt(fearValue)}
              text={`${fearValue}%`}
              strokeWidth={24}
              styles={buildStyles({
                padding: 120,
                pathColor: fearClassification === "Fear" ? "red" : "green",
                textColor: fearClassification === "Fear" ? "red" : "green",
              })}
            />
            <p
              style={{
                color: "red",
                backgroundColor: "#ff000017",
                padding: 24,
              }}
            >
              {fearClassification} Index is {fearValue}%
            </p>
            <p
              style={{
                color: "#00ff00",
                backgroundColor: "#00ff0017",
                padding: 24,
              }}
            >
              Greed Index is {100 - fearValue}%
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default FearAndGreed;
