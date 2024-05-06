import React, { useEffect, useState } from "react";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";

function TensorFlowModel() {
  const [coinData, setCoinData] = useState([]); // State to store fetched coin data
  const [predictionResults, setPredictionResults] = useState([]); // State to store prediction results
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the provided endpoint using Axios
        const response = await axios.request({
          method: "GET",
          url: "https://coinranking1.p.rapidapi.com/coins",
          headers: {
            "X-RapidAPI-Key":
              "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          },
          params: {},
        });

        const fetchedCoinData = response.data.data.coins;

        setCoinData(fetchedCoinData);

        const prices = fetchedCoinData.map((coin) => parseFloat(coin.price)); // Get current prices of all coins
        const predictions = [];
        for (let i = 0; i < prices.length; i++) {
          const model = tf.sequential();
          model.add(
            tf.layers.dense({ units: 32, activation: "relu", inputShape: [1] })
          ); // Input layer with ReLU activation
          model.add(tf.layers.dense({ units: 64, activation: "relu" })); // Hidden layer with ReLU activation
          model.add(tf.layers.dense({ units: 1 })); // Output layer (no activation function specified)
          model.compile({ loss: "meanSquaredError", optimizer: "adam" }); // Compile the model with MSE loss and Adam optimizer
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
        setIsLoading(false); // Set loading state to false once predictions are made
      } catch (error) {
        console.error("Error:", error);
        setError(error); // Set error state if an error occurs during fetch
        setIsLoading(false); // Set loading state to false in case of an error
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts
  const bullishPrediction = (value) => {
    return value * 3;
  };

  // Conditional rendering based on loading state and error handling
  if (isLoading) {
    return (
      <div style={{ paddingTop: 120, textAlign: "center", width: "100vw" }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Render error message if an error occurs during fetch
  }

  return (
    <div style={{ paddingTop: 64 }}>
      <div style={{ padding: 16 }}>
        <h2>Predicted Prices in the Next 5 Years:</h2>
        <table>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Current Price</th>
              <th>Predicted Price</th>
            </tr>
          </thead>
          <tbody>
            {coinData.map((coin, index) => (
              <tr key={coin.uuid}>
                <td>
                  <img
                    src={coin.iconUrl}
                    alt={coin.name}
                    style={{ width: 32, height: 32 }}
                  />
                </td>
                <td style={{ padding: 12 }}>{coin.name}</td>
                <td style={{ padding: 12 }}>
                  ${parseFloat(coin.price).toFixed(2)}
                </td>
                <td style={{ padding: 12 }}>
                  ${parseFloat(predictionResults[index]).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TensorFlowModel;
