import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sentimentFetch } from "../../redux/coinsSlice";
import { useState } from "react";

const SentimentComponent = () => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12;

    let dayString;
    if (day % 10 === 1 && day !== 11) {
      dayString = day + "st";
    } else if (day % 10 === 2 && day !== 12) {
      dayString = day + "nd";
    } else if (day % 10 === 3 && day !== 13) {
      dayString = day + "rd";
    } else {
      dayString = day + "th";
    }
    const formattedDate = `${dayString} ${
      months[monthIndex]
    } ${year} ${hours}:${(minutes < 10 ? "0" : "") + minutes}${ampm}`;

    return formattedDate;
  };

  const timestamp = 1714303215;
  const formattedDate = formatDate(timestamp);

  const dispatch = useDispatch();
  const [sentiments, setSentiments] = useState([]);

  useEffect(() => {
    dispatch(sentimentFetch())
      .then((response) => {
        console.log("Response:", response.payload);
        setSentiments(response?.payload);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [dispatch]);

  return (
    <div
      style={{
        paddingTop: 100,
        maxWidth: 500,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <p
          style={{
            padding: 16,
            backgroundColor: "#121212",
            color: "#fff",
            margin: 16,
            borderRadius: 12,
          }}
        >
          This is a sentiment analysis model built with TensorFlow.js. The model
          predicts the sentiment, indicating whether it's positive, negative, or
          neutral regarding cryptocurrencies. This sentiment prediction is then
          displayed on the web interface using React js, allowing them to gauge
          the overall sentiment surrounding various cryptocurrency topics in
          real time.
        </p>
        <p style={{ padding: 12, width: "90%", maxWidth: 500 }}>
          {sentiments.map((token, index) => (
            <p
              key={index}
              style={{
                marginBottom: 48,
                padding: 16,
                border: `1px solid #80808075`,
                borderRadius: 24,
              }}
            >
              <p style={{ fontSize: 14 }}>
                <strong>Coin Name:</strong> {token.TokenName}
              </p>
              <p style={{ fontSize: 14 }}>
                <strong>Strength:</strong> {token.Strength}
              </p>
              <p style={{ fontSize: 14 }}>
                <strong>Contract:</strong> {token.TokenContract}
              </p>
              <p style={{ fontSize: 14 }}>
                <strong>Timestamp:</strong> {formatDate(token?.timestamp)}
              </p>
            </p>
          ))}
        </p>
      </div>
    </div>
  );
};

export default SentimentComponent;
