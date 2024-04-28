import { Routes, Route } from "react-router-dom";
import Home from "./main/Home/Home";
import Navbar from "./main/Home/Navbar";
import AllTokens from "./main/Home/AllTokens";
import CoinDetailsPage from "./main/Home/CoinDetailsPage";
import AddressValidator from "./main/fraud/Fraus";
import SentimentComponent from "./main/fear/Sentiments";

const App = () => {
  return (
    <div>
      {" "}
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/coinlist" Component={AllTokens} />
        <Route path="/coins/:id" Component={CoinDetailsPage} />
        <Route path="/validator" Component={AddressValidator} />
        <Route path="/sentiments" Component={SentimentComponent} />
      </Routes>
    </div>
  );
};

export default App;
