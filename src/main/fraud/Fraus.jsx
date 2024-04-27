import React, { useState } from "react";
import { validate } from "../../redux/coinsSlice";
import { useDispatch } from "react-redux";
import ConfettiExplosion from "react-confetti-explosion";
import { useNavigate } from "react-router-dom";

const AddressValidator = () => {
  const [address, setAddress] = useState("");
  const [coin, setCoin] = useState("bitcoin");
  const [result, setResult] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isExploding, setIsExploding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setErr] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess(``);
    setErr(``);
    setLoading(true); // Set loading to true when validation starts
    console.log("Value entered:", address);
    setResult(address);
    const params = address;
    dispatch(validate({ params: params, coin: coin }))
      .then((response) => {
        if (response?.payload?.valid === true) {
          setIsExploding(true);
          setSuccess(`This is a valid ${coin} address`);
        } else if (response?.payload === 400) {
          setErr(`This wallet address is an invalid ${coin} address`);
        }

        setLoading(false);
        console.log(response, "responseresponse");
        //setOlhcState(response.payload.data.ohlc);
      })
      .catch((error) => {
        console.error("Error fetching OHLC data:", error);
        setErr(`This wallet address is an invalid ${coin} address`);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when validation completes
      });
  };

  const cryptoOptions = [
    { label: "Auroracoin (AUR)", value: "auroracoin" },
    { label: "Bankex (BKX)", value: "bankex" },
    { label: "BeaverCoin (BVC)", value: "beavercoin" },
    { label: "Biocoin (BIO)", value: "biocoin" },
    { label: "Bitcoin (BTC)", value: "bitcoin" },
    { label: "BitcoinCash (BCH)", value: "bitcoincash" },
    { label: "BitcoinGold (BTG)", value: "bitcoingold" },
    { label: "BitcoinPrivate (BTCP)", value: "bitcoinprivate" },
    { label: "BitcoinZ (BTCZ)", value: "bitcoinz" },
    { label: "Callisto (CLO)", value: "callisto" },
    { label: "Dash", value: "dash" },
    { label: "Decred (DCR)", value: "decred" },
    { label: "Digibyte (DGB)", value: "digibyte" },
    { label: "Dogecoin (DOGE)", value: "dogecoin" },
    { label: "Ethereum (ETH)", value: "ethereum" },
    { label: "EthereumClassic (ETC)", value: "ethereumclassic" },
    { label: "EthereumZero (ETZ)", value: "etherzero" },
    { label: "Freicoin (FRC)", value: "freicoin" },
    { label: "Garlicoin (GRLC)", value: "garlicoin" },
    { label: "Hush (HUSH)", value: "hush" },
    { label: "Komodo (KMD)", value: "komodo" },
    { label: "Litecoin (LTC)", value: "litecoin" },
    { label: "Megacoin (MEC)", value: "megacoin" },
    { label: "Monero (XMR)", value: "monero" },
    { label: "Namecoin (NMC)", value: "namecoin" },
    { label: "Nano (NANO)", value: "nano" },
    { label: "NEO (NEO)", value: "NEO" },
    { label: "NeoGas (GAS)", value: "neogas" },
    { label: "Peercoin/PPCoin/PPC", value: "peercoin" },
    { label: "Primecoin (XPM)", value: "primecoin" },
    { label: "Protoshares (PTS)", value: "protoshares" },
    { label: "Qtum (QTUM)", value: "qtum" },
    { label: "Raiblocks (XRB)", value: "raiblocks" },
    { label: "Ripple (XRP)", value: "ripple" },
    { label: "Snowgem (SNG)", value: "snowgem" },
    { label: "Vertcoin (VTC)", value: "vertcoin" },
    { label: "Votecoin (VTC)", value: "votecoin" },
    { label: "Zcash (ZEC)", value: "zcash" },
    { label: "Zclassic (ZCL)", value: "zclassic" },
    { label: "ZenCash (ZEN)", value: "zencash" },
  ];

  return (
    <div>
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
              Find out if your Crypto Address is Valid?
            </h1>
            <p
              style={{
                maxWidth: 600,
                zIndex: 3,
                textAlign: "center",
                color: "#fff",
              }}
            >
              Always exercise caution and verify the legitimacy of the
              recipient's address to prevent any loss of funds or unauthorized
              transactions.
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
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-logos-container-div"></div>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",

          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "90%",
            maxWidth: 500,
            justifyContent: "center",
            padding: `180px 16px`,
            // border: `1px solid #808080`,
            // borderRadius: 12,
          }}
        >
          {isExploding && (
            <ConfettiExplosion duration={10000} zIndex={1000000000000000} />
          )}{" "}
          <h1 style={{ fontSize: 48, textAlign: "center" }}>
            {" "}
            Check if a crypto Address is valid
          </h1>
          <br />
          <label style={{ fontSize: 14, width: "80%" }}>
            Select Coin
            <br />
            <select
              style={{
                height: 48,
                border: `1px solid #80808075`,
                borderRadius: 12,
                padding: 12,
                width: "100%",
                maxWidth: 400,
              }}
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
            >
              {cryptoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <br /> <br />
          <label style={{ fontSize: 14, width: "80%" }}>
            Address:
            <br />
            <input
              style={{
                height: 24,
                border: `1px solid #80808075`,
                borderRadius: 12,
                padding: 12,
                width: "100%",
                maxWidth: 375,
                fontFamily: `var(--fontFamily)`,
              }}
              type="text"
              placeholder="Enter an address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <br /> <br />
          {error ? (
            <p
              style={{
                color: "red",
                backgroundColor: "#ff000025",
                padding: `12px 32px`,
              }}
            >
              {error}
            </p>
          ) : null}
          {success ? (
            <p
              style={{
                color: "green",
                backgroundColor: "#00ff0025",
                padding: `12px 32px`,
              }}
            >
              {success}
            </p>
          ) : null}
          <input
            type="submit"
            value="Validate Address"
            disabled={loading} // Disable the button when loading is true
            style={{
              height: 52,
              width: 400,
              borderRadius: 12,
              backgroundColor: `var(--darkOrange)`,
              color: "#FFF",
              fontSize: 14,
              border: 0,
              fontFamily: `var(--fontFamily)`,
              opacity: loading ? 0.5 : 1, // Optionally reduce opacity while loading
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default AddressValidator;
