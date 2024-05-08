import { Routes, Route } from "react-router-dom";
import Home from "./main/Home/Home";
import Navbar from "./main/Home/Navbar";
import AllTokens from "./main/Home/AllTokens";
// import CoinDetailsPage from "./main/Home/CoinDetailsPage";
// import AddressValidator from "./main/fraud/Fraus";
// import SentimentComponent from "./main/fear/Sentiments";
// import CoinDataPage from "./main/Home/NewTesting";
import TensorFlowModel from "./main/Home/NewPricePrediction";
import Twelve from "./main/Home/stocks/Twelve";
import FearAndGreed from "./main/fear/Fear";
import ExchangeRates from "./main/excha/ExchangeRate";
import CurrencyConverter from "./main/Converter/CurrencyConverter";
import CryptoAll from "./main/Home/stocks/Crypto";
import ETFPage from "./main/Home/stocks/Etf";
import MutualFundsPage from "./main/Home/stocks/MF";
import IndicesPage from "./main/Home/stocks/Indices";
// import AllDataPage from "./main/Home/stocks/AllData";
import MetalPrices from "./main/Home/stocks/MetalPrices";

const App = () => {
  return (
    <div>
      {" "}
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/all" Component={TensorFlowModel} />
        <Route path="/coinlist" Component={AllTokens} />
        <Route path="/stocks" Component={Twelve} />
        <Route path="/fear" Component={FearAndGreed} />
        <Route path="/exchange" Component={ExchangeRates} />
        <Route path="/converter" Component={CurrencyConverter} />
        <Route path="/crypto" Component={CryptoAll} />
        <Route path="/etf" Component={ETFPage} />
        <Route path="/mf" Component={MutualFundsPage} />
        <Route path="/indices" Component={IndicesPage} />
        <Route path="/metals" Component={MetalPrices} />
        {/* <Route path="/" Component={CoinDataPage} /> */}
        {/* <Route path="/coinlist" Component={AllTokens} />
        <Route path="/coins/:id" Component={CoinDetailsPage} />
        <Route path="/validator" Component={AddressValidator} />
        <Route path="/sentiments" Component={SentimentComponent} />
  */}{" "}
      </Routes>
    </div>
  );
};

export default App;
