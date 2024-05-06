import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";
import "./home.css";
import { useDispatch } from "react-redux";

const AllTokens = () => {
  const [coinsState, setCoinsState] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [predictionResults, setPredictionResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/coins",
        headers: {
          "X-RapidAPI-Key":
            "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
        params: {
          // Add any additional parameters if needed
        },
      });
      const fetchedCoinData = response.data.data.coins;
      setCoinsState(fetchedCoinData);
      console.log(fetchedCoinData, "fetchedCoinData");

      // Prepare data for model training
      const prices = fetchedCoinData.map((coin) => parseFloat(coin.price)); // Get current prices of all coins
      const predictions = [];

      // Loop through each coin's current price and predict its price in the next 5 years
      for (let i = 0; i < prices.length; i++) {
        const model = tf.sequential();
        model.add(
          tf.layers.dense({ units: 32, activation: "relu", inputShape: [1] })
        );
        model.add(tf.layers.dense({ units: 64, activation: "relu" }));
        model.add(tf.layers.dense({ units: 1 }));
        model.compile({ loss: "meanSquaredError", optimizer: "adam" });
        const xs = [prices[i]];
        const ys = [prices[i] * 5]; // Making a bullish prediction by multiplying the current price by a factor
        const xsTensor = tf.tensor(xs);
        const ysTensor = tf.tensor(ys);
        await model.fit(xsTensor, ysTensor, { epochs: 50 });
        const prediction = model.predict(tf.tensor2d([xs[0]], [1, 1]));
        const predictionValue = prediction.dataSync()[0];
        predictions.push(bullishPrediction(predictionValue));
      }

      setPredictionResults(predictions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const bullishPrediction = (value) => {
    // Multiply the prediction value by 3 to make it more bullish
    return value * 3;
  };

  const handleCoinClick = (coin) => {
    navigate(`/coins/${coin?.uuid}`, { state: { coin } });
  };

  const getColor = (change) => {
    return change < 0 ? "red" : "green";
  };

  const CoinDetails = ({ coin }) => (
    <tr style={{ cursor: "pointer" }} onClick={() => handleCoinClick(coin)}>
      <td>
        <img
          src={coin.iconUrl}
          alt={coin.name}
          style={{ width: 32, height: 32, marginRight: 12 }}
        />
      </td>
      <td>
        <div style={{ maxWidth: 140, marginRight: 12 }}>
          <h4>
            {coin.name} ({coin.symbol})
          </h4>
        </div>
      </td>
      <td style={{ marginRight: 12 }}>${parseFloat(coin.price).toFixed(2)}</td>
      <td style={{ marginRight: 12 }}>
        ${parseFloat(coin["24hVolume"]).toFixed(2)}
      </td>
      <td style={{ marginRight: 12 }}>
        ${parseFloat(coin.marketCap).toFixed(2)}
      </td>
      <td style={{ color: getColor(parseFloat(coin.change)), marginRight: 12 }}>
        {parseFloat(coin.change).toFixed(2)}%
      </td>
      <td style={{ marginRight: 12 }}>
        <a href={coin.coinrankingUrl}>Coinranking</a>
      </td>
    </tr>
  );

  const filteredCoins = coinsState
    ?.filter((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    ?.slice(0, 20);

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 240,
        }}
      >
        <h4 style={{ marginBottom: 48, fontSize: 48, marginTop: -48 }}>
          All Tokens
        </h4>
        <input
          type="text"
          className="widthh"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search coins..."
          style={{
            padding: 12,
            borderRadius: 4,
            maxWidth: 1000,
            marginBottom: 32,
            border: `1px solid gray`,
            marginLeft: 24,
            marginRight: 24,
          }}
        />

        <table>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Icon</th>
              <th style={{ textAlign: "left" }}>Name</th>
              <th style={{ textAlign: "left" }}>Price</th>
              <th style={{ textAlign: "left" }}>24h Volume</th>
              <th style={{ textAlign: "left" }}>Market Cap</th>
              <th style={{ textAlign: "left" }}>Price Change (24h)</th>
              <th style={{ textAlign: "left" }}>More Info</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins?.map((coin, index) => (
              <CoinDetails key={index} coin={coin} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTokens;
