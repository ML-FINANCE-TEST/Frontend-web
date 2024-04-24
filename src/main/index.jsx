import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from React Router

function CoinList() {
  const [coins, setCoins] = useState([]);
  const [model, setModel] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to predict
  function predict() {
    if (model) {
      // Use the loaded TensorFlow.js model to make predictions
      // Example: const prediction = model.predict(inputData);
    }
  }

  // Function to handle navigation to coin details page
  const handleCoinClick = (rank) => {
    console.log(rank, "rank");
    navigate(`/coin/${rank}`); // Navigate to the coin details page with the coin symbol as a parameter
  };

  useEffect(() => {
    const fetchCoinData = async () => {
      const options = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/coins",
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          timePeriod: "24h",
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

        // Calculate 24-hour price difference for each coin
        const formattedCoins = coinsData.map((coin) => ({
          name: coin.name,
          price: coin.price,
          market_cap: coin.marketCap,
          id: coin.id,
          symbol: coin.symbol, // Add symbol to the coin object
          // Calculate 24-hour difference
          difference_24h: coin.change,
          rank: coin.rank,
        }));

        setCoins(formattedCoins);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchCoinData();
  }, []);

  if (!coins) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Cryptocurrency List</h1>
      <button onClick={predict}>Predict</button>
      <ul>
        {coins?.map((coin, index) => (
          <li
            key={index}
            onClick={() => handleCoinClick(coin.rank)} // Pass symbol to handleCoinClick function
          >
            <strong>{coin.name}</strong>: Price: ${coin.price}, Market Cap: $
            {coin.market_cap}, 24h Change: {coin.difference_24h}% {coin.rank}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoinList;
