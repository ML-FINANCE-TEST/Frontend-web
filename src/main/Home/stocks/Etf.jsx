import React, { useEffect, useState } from "react";
import axios from "axios";
import * as tf from "@tensorflow/tfjs"; // Import TensorFlow.js
import "./stocks.css";

const ETFPage = () => {
  const [ETFData, setETFData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/etf',
        params: {
          exchange: 'Euronext',
          format: 'json'
        },
        headers: {
          'X-RapidAPI-Key': 'c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be',
          'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setETFData(response?.data?.data || []);
        setError(null);

        // Train TensorFlow model
        const model = await trainModel(response?.data?.data);
        
        // Make predictions using TensorFlow model
        makePredictions(response?.data?.data, model);
      } catch (error) {
        console.error("Error fetching ETF data:", error);
        setError("Failed to fetch ETF data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to train TensorFlow model
  const trainModel = async (data) => {
    if (data && data.length > 0) {
      try {
        // Extract features and labels from data
        const features = data.map((etf) => parseFloat(etf.price));
        const labels = data.map((etf) => parseFloat(etf.price) * 2); // Example labels

        // Convert features and labels to TensorFlow tensors
        const xs = tf.tensor(features, [features.length, 1]);
        const ys = tf.tensor(labels, [labels.length, 1]);

        // Define model architecture
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 32, activation: 'relu', inputShape: [1] }));
        model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
        model.add(tf.layers.dense({ units: 1 }));

        // Compile model
        model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

        // Train model
        await model.fit(xs, ys, { epochs: 50 });

        return model;
      } catch (error) {
        console.error("Error training model:", error);
        return null;
      }
    } else {
      console.error("No data provided for training model.");
      return null;
    }
  };

 // Make predictions using TensorFlow model
const makePredictions = async (data, model) => {
    if (data && data.length > 0 && model) {
      try {
        // Extract features from data
        const features = data.map((etf) => parseFloat(etf.price));
  
        // Convert features to TensorFlow tensor
        const xs = tf.tensor(features, [features.length, 1]);
  
        // Make predictions using TensorFlow model
        const predictions = model.predict(xs);
  
        // Log predictions
        console.log("Predictions:", predictions.dataSync().map(val => isNaN(val) ? "Invalid Prediction" : val));
      } catch (error) {
        console.error("Error making predictions:", error);
      }
    } else {
      console.error("No data provided for predictions or model is not defined.");
    }
  };
  

  return (
    <div style={{ paddingTop: 120 }}>
      <div className="container">
        <h1>ETF Data</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : Array.isArray(ETFData) && ETFData.length > 0 ? (
          <table className="stock-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Currency</th>
                <th>Exchange</th>
                <th>MIC Code</th>
                <th>Country</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {ETFData.map((etf, index) => (
                <tr key={index}>
                  <td>{etf.symbol}</td>
                  <td>{etf.name}</td>
                  <td>{etf.currency}</td>
                  <td>{etf.exchange}</td>
                  <td>{etf.mic_code}</td>
                  <td>{etf.country}</td>
                  <td>{etf.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No ETF data available.</p>
        )}
      </div>
    </div>
  );
};

export default ETFPage;
