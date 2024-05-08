import React, { useEffect, useState } from "react";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";

function TensorFlowModel() {
  const [coinData, setCoinData] = useState([]); 
  const [predictionResults, setPredictionResults] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
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
          params: {},
        });

        const fetchedCoinData = response.data.data.coins;
        setCoinData(fetchedCoinData);

        const prices = fetchedCoinData.map((coin) => parseFloat(coin.price)); 
        const predictions = [];
        for (let i = 0; i < prices.length; i++) {
          const model = tf.sequential();
          model.add(
            tf.layers.dense({ units: 32, activation: "relu", inputShape: [1] })
          ); 
          model.add(tf.layers.dense({ units: 64, activation: "relu" })); 
          model.add(tf.layers.dense({ units: 1 })); 
          model.compile({ loss: "meanSquaredError", optimizer: "adam" }); 
          const xs = [prices[i]];
          const ys = [prices[i] * 5]; 
          const xsTensor = tf.tensor(xs);
          const ysTensor = tf.tensor(ys);

          await model.fit(xsTensor, ysTensor, { epochs: 50 });
          const prediction = model.predict(tf.tensor2d([xs[0]], [1, 1]));
          const predictionValue = prediction.dataSync()[0];
          predictions.push(bullishPrediction(predictionValue));
        }

        setPredictionResults(predictions);
        setIsLoading(false); 
      } catch (error) {
        console.error("Error:", error);
        setError(error); 
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);

  const bullishPrediction = (value) => {
    return value * 3;
  };

  if (isLoading) {
    return (
      <div style={{ paddingTop: 120, textAlign: "center", width: "100vw" }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>; 
  }

  return (
    <div style={{ paddingTop: 64 }}>
      <div style={{ padding: 16 }}>
        <h2>Predicted Prices in the Next 5 Years:</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Icon</th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Name</th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Current Price</th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Predicted Price</th>
            </tr>
          </thead>
          <tbody>
            {coinData.map((coin, index) => (
              <tr key={coin.uuid} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "transparent" }}>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  <img
                    src={coin.iconUrl}
                    alt={coin.name}
                    style={{ width: 32, height: 32 }}
                  />
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{coin.name}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  ${parseFloat(coin.price).toFixed(2)}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
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
