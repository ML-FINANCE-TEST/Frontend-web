import React, { useEffect, useState } from "react";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";

function CoinDataPage() {
  const [coins, setCoins] = useState([]);
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const options = {
          method: "GET",
          url: "https://coinranking-api1.p.rapidapi.com/coin",
          params: {
            page: "0",
            limit: "50",
          },
          headers: {
            "X-RapidAPI-Key":
              "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
            "X-RapidAPI-Host": "coinranking-api1.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        console.log(response, "response");
        setCoins(response.data.coins);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

    async function loadModel() {
      try {
        const loadedModel = await tf.loadLayersModel('model_path/model.json');
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    }

    loadModel();
  }, []);

  return (
    <div>
      <h1>TensorFlow.js in React</h1>
      <h2>Coins:</h2>
      <ul>
        {coins?.map((coin, index) => (
          <li key={index}>{coin.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CoinDataPage;
