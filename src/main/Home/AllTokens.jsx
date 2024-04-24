import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { useDispatch } from "react-redux";
import { fetchCoins, fetchOlhc } from "../../redux/coinsSlice";

const AllTokens = () => {
  const [coinsState, setCoinsState] = useState([]); // Import useState from React
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    dispatch(fetchCoins())
      .then((response) => {
        setCoinsState(response.payload);
        console.log(response.payload, "response.payload");
      })
      .catch((error) => {
        console.error("Error fetching coins:", error);
      });
  }, [dispatch]);

  // Function to navigate to CoinDetailsPage
  const handleCoinClick = (coin) => {
    navigate(`/coins/${coin?.uuid}`, { state: { coin } }); // Pass coin as state
  };

  const getColor = (change) => {
    return change < 0 ? "red" : "green";
  };
  //const [rowColor, setRowColor] = useState("white");
  // const handleRowColorChange = () => {
  //   setRowColor((prevColor) =>
  //     prevColor === "white" ? "lightgreen" : "white"
  //   );
  // };
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

  const filteredCoins = coinsState?.data?.coins
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

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 20px",
        }}
      >
        <div style={{ textAlign: "center", color: "#fff" }}>
          <h1
            style={{
              maxWidth: 600,
              textAlign: "center",
              fontSize: 48,
              color: "#000",
            }}
          >
            Get Started
          </h1>
          <p
            style={{
              maxWidth: 600,
              textAlign: "center",
              color: "#808080",
              marginTop: -32,
            }}
          >
            Stay ahead of the curve and elevate your cryptocurrency journey with
            our Centralized Cryptocurrency API Hub. Join our community of crypto
            enthusiasts, developers, and traders, and embark on a journey
            towards financial empowerment and digital innovation. Welcome to the
            future of finance – welcome to the Cryptocurrency API Central!
          </p>

          <div style={{ width: "100%", alignContent: "center" }}>
            <div
              style={{
                marginTop: 32,
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                className="div-btn-auth"
                style={{ backgroundColor: "#045444" }}
              ></div>
              <button
                onClick={() => navigate("/upload")}
                className="btn-auth"
                style={{
                  marginTop: -14,
                  backgroundColor: "#ADFA25",
                  color: "#045444",
                }}
                type="submit"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllTokens;
