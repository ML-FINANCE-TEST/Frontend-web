import React, { useEffect, useState } from "react";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";
import "./ExchangeRate.css"; // Import CSS file for styling

function ExchangeRate() {
  const [exchangeData, setExchangeData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [error, setError] = useState(null);
  const [meanRate, setMeanRate] = useState(null);
  const [rateDifference, setRateDifference] = useState(null);

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await axios.request({
          method: "GET",
          url: "https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest",
          params: {
            from: "USD",
            to: "EUR,GBP",
          },
          headers: {
            "X-RapidAPI-Key":
              "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
            "X-RapidAPI-Host":
              "currency-conversion-and-exchange-rates.p.rapidapi.com",
          },
        });
        setExchangeData(response.data);
        calculateMeanRate(response.data);
      } catch (error) {
        console.error(error);
        setError("You have exceeded your free API calls for today.");
      }
    };

    const fetchHistoricalData = async () => {
      try {
        const response = await axios.request({
          method: "GET",
          url: "https://currency-conversion-and-exchange-rates.p.rapidapi.com/2019-10-16",
          params: {
            from: "USD",
            to: "EUR,GBP",
          },
          headers: {
            "X-RapidAPI-Key":
              "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
            "X-RapidAPI-Host":
              "currency-conversion-and-exchange-rates.p.rapidapi.com",
          },
        });
        setHistoricalData(response.data);
        compareData(exchangeData, response.data);
      } catch (error) {
        console.error(error);
        setError("You have exceeded your free API calls for today.");
      }
    };

    const calculateMeanRate = (data) => {
      console.log(data.rates, "data.rates");
      const rates = Object.values(data.rates);
      const tensorRates = tf.tensor1d(rates);
      const mean = tensorRates.mean().arraySync();
      setMeanRate(mean);
    };

    const compareData = (latestData, historicalData) => {
      const latestRates = latestData.rates;
      const historicalRates = historicalData.rates;
      const difference = {};

      for (const currency in latestRates) {
        if (
          latestRates.hasOwnProperty(currency) &&
          historicalRates.hasOwnProperty(currency)
        ) {
          difference[currency] =
            latestRates[currency] - historicalRates[currency];
        }
      }
      setRateDifference(difference);
    };

    fetchLatestData();
    fetchHistoricalData();
  }, []);

  return (
    <div style={{ paddingTop: 120 }}>
      <h2>Exchange Rates (GBP - Great British Pound)</h2>
      {error && (
        <p style={{ color: "red", backgroundColor: "#ff000017", padding: 24 }}>
          {error}
        </p>
      )}
      {exchangeData && (
        <table className="exchange-table">
          <thead>
            <tr>
              <th>Base Currency</th>
              <th>Date</th>
              <th>Currency</th>
              <th>Exchange Rate (Latest)</th>
              <th>Exchange Rate (Historical)</th>
              <th>Difference</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(exchangeData.rates).map(([currency, rate]) => (
              <tr key={currency}>
                <td>{exchangeData.base}</td>
                <td>{exchangeData.date}</td>
                <td>{currency}</td>
                <td>{rate}</td>
                <td>{historicalData && historicalData.rates[currency]}</td>
                <td>{rateDifference && rateDifference[currency]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {meanRate && (
        <div style={{ paddingTop: 20 }}>
          <h2>Mean Exchange Rate (Latest)</h2>
          <p>{meanRate}</p>
          <span>
            The line "Mean Exchange Rate (Latest) 24933.7890625" is displaying
            the difference calculated from the latest data fetched from the API.
            In this context, it's likely the mean of exchange rates from USD to
            the specified currencies (EUR and GBP) obtained from the latest API
            response. This mean exchange rate provides you with an average value
            representing how much of the specified currency (EUR and GBP) you
            would get for 1 USD based on the latest data fetched from the API.
            For example, if the mean exchange rate for USD to EUR is 1.2 and the
            mean exchange rate for USD to GBP is 1.4, it means on average, 1 USD
            is equivalent to 1.2 EUR and 1.4 GBP based on the latest data. You
            can interpret this value to understand how the specified currencies
            are performing against USD on average. Keep in mind that individual
            exchange rates for specific transactions may vary slightly due to
            factors like market fluctuations, fees, and other financial
            considerations.
          </span>
        </div>
      )}
    </div>
  );
}

export default ExchangeRate;

//export default ExchangeRate;
