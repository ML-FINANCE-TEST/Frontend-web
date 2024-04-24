import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { useDispatch } from "react-redux";
import { fetchCoins, fetchOlhc } from "../../redux/coinsSlice";
import Apex from "./ApexCharts";
import ApexEth from "./ApexChartsEth";

const Home = () => {
  const products = [
    {
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Custom wooden chair in a sitting room",
      price: "$19.99",
    },
    {
      image:
        "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg",
      title: "Custom wooden chair in a sitting room",
      price: "$24.99",
    },
    {
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Custom wooden chair in a sitting room",

      price: "$29.99",
    },
    {
      image:
        "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg",
      title: "Custom wooden chair in a sitting room",

      price: "$34.99",
    },
  ];
  const [olhcState, setOlhcState] = useState([]);
  const [coinsState, setCoinsState] = useState([]);
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

  const totalMarketCapString =
    coinsState?.data?.stats?.totalMarketCap?.toLocaleString();

  const total24hVolumeSTRING =
    coinsState?.data?.stats?.total24hVolume?.toLocaleString();

  const getColor = (change) => {
    return change < 0 ? "red" : "green";
  };

  const CoinDetails = ({ coin }) => (
    <tr>
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
        24h Volume: ${parseFloat(coin["24hVolume"]).toFixed(2)}
      </td>
      <td style={{ marginRight: 12 }}>
        Market Cap: ${parseFloat(coin.marketCap).toFixed(2)}
      </td>
      <td style={{ color: getColor(parseFloat(coin.change)), marginRight: 12 }}>
        {parseFloat(coin.change).toFixed(2)}%
      </td>
      <td style={{ marginRight: 12 }}>
        <a href={coin.coinrankingUrl}>Coinranking</a>
      </td>
    </tr>
  );

  const filteredCoins = coinsState?.data?.coins?.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <section
        style={{
          position: "relative",
          backgroundImage: `url('https://f005.backblazeb2.com/file/Webimages-used/dylan-calluy-JpflvzEl5cg-unsplash.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 20px",
        }}
      >
        <div style={{ textAlign: "center", color: "#fff" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -2,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          ></div>{" "}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -2,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          ></div>
          <div
            style={{
              zIndex: 3,
              backgroundColor: "#00000065",
              padding: 16,
              borderRadius: 24,
              paddingBottom: 48,
            }}
          >
            <h1
              style={{
                maxWidth: 600,
                textAlign: "center",
                fontSize: 48,
                color: "#fff",
              }}
            >
              Centralized Cryptocurrency API Hub: Your Ultimate Destination for
              Real-Time Cryptocurrency Data{" "}
            </h1>
            <p
              style={{
                maxWidth: 600,
                zIndex: 3,
                textAlign: "center",
                color: "#fff",
              }}
            >
              Stay ahead of the curve and elevate your cryptocurrency journey
              with our Centralized Cryptocurrency API Hub. Join our community of
              crypto enthusiasts, developers, and traders, and embark on a
              journey towards financial empowerment and digital innovation.
              Welcome to the future of finance – welcome to the Cryptocurrency
              API Central!
            </p>

            <div style={{ width: "100%", zIndex: 3, alignContent: "center" }}>
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
                  style={{ backgroundColor: "#ADFA25" }}
                ></div>
                <button
                  onClick={() => navigate("/coinlist")}
                  className="btn-auth"
                  style={{ marginTop: -14 }}
                  type="submit"
                >
                 View Coins
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-logos-container-div"></div>
        </div>
      </section>

      <section style={{ marginTop: 160 }}>
        <h3 style={{ textAlign: "center", fontSize: 36, color: "#000" }}>
          Highlights
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "300px",
              margin: "10px",
              textAlign: "center",
              backgroundColor: "#94FC0445",
              padding: 16,
              border: `1.5px solid #121212`,
              borderRadius: 12,
            }}
          >
            <h3 style={{ color: "#000", marginTop: "5px", fontSize: 48 }}>
              {coinsState?.data?.stats?.totalExchanges?.toLocaleString()}
            </h3>
            <p style={{ color: "#808080", fontSize: 16, marginTop: -36 }}>
              Total Crypto Exchanges
            </p>
          </div>

          <div
            style={{
              width: "300px",
              margin: "10px",
              textAlign: "center",
              backgroundColor: "#94FC0445",
              padding: 16,
              border: `1.5px solid #121212`,
              borderRadius: 12,
            }}
          >
            <h3 style={{ color: "#000", marginTop: "5px", fontSize: 48 }}>
              {coinsState?.data?.stats?.totalCoins?.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}
            </h3>
            <p style={{ color: "#808080", fontSize: 16, marginTop: -36 }}>
              Total Coins
            </p>
          </div>

          <div
            style={{
              width: "300px",
              margin: "10px",
              textAlign: "center",
              backgroundColor: "#94FC0445",
              padding: 16,
              border: `1.5px solid #121212`,
              borderRadius: 12,
            }}
          >
            <h3 style={{ color: "#000", marginTop: "5px", fontSize: 48 }}>
              {coinsState?.data?.stats?.totalMarkets?.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}
            </h3>
            <p style={{ color: "#808080", fontSize: 16, marginTop: -36 }}>
              Total Markets
            </p>
          </div>

          {/* <div
            style={{
              width: "300px",
              margin: "10px",
              textAlign: "center",
              backgroundColor: "#94FC0445",
              padding: 16,
              border: 1.51px solid #121212`
              borderRadius: 12
            }}
          >
            <h3 style={{ color: "#000", marginTop: "5px", fontSize: 48 }}>
              $
              {parseFloat(totalMarketCapString).toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}
            </h3>
            <p style={{ color: "#808080", fontSize: 16, marginTop: -36 }}>
              Total Markets Cap
            </p>
          </div> */}

          {/* <div style={{ width: "300px", margin: "10px", textAlign: "center" , backgroundColor: "#94FC0445"}
          padding: 16,
        border: 1.51px solid #121212`
    borderRadius: 12}>
            <h3 style={{ color: "#000", marginTop: "5px", fontSize: 48 }}>
              {parseFloat(total24hVolumeSTRING).toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}
            </h3>
            <p style={{ color: "#808080", fontSize: 16, marginTop: -36 }}>
              Total 24h Volume
            </p>
          </div> */}
        </div>
      </section>

      {/* <section style={{ marginTop: 160 }}>
        <h3 style={{ textAlign: "center", fontSize: 36, color: "#000" }}>
          Featured Gallery
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "20px",
          }}
        >
       

          {products?.map((product, index) => (
            <div
              key={index}
              style={{
                width: "300px",
                margin: "10px",
                textAlign: "center",
                backgroundColor: "#94FC0445",
                padding: 16,
                border: `1.5px solid #121212`,
                borderRadius: 12,
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{ maxWidth: "100%", borderRadius: 8, height: 200 }}
              />

              <p style={{ color: "#808080", fontSize: 14 }}>{product.title}</p>

              <h3 style={{ color: "#000", marginTop: "5px" }}>
                {product.price}
              </h3>
            </div>
          ))}
        </div>
      </section> */}

      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 240,
        }}
      >
        <h4 style={{ marginBottom: 48, fontSize: 48, marginTop: -48 }}>
          All Tokens
        </h4>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search coins..."
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 4,
            maxWidth: 1000,
            marginBottom: 32,
            border: `1px solid gray`,
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
      </div> */}
      <Apex />
      <ApexEth />
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
                onClick={() => navigate("/coinlist")}
                className="btn-auth"
                style={{
                  marginTop: -14,
                  backgroundColor: "#ADFA25",
                  color: "#045444",
                }}
                type="submit"
              >
          View Coins
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
