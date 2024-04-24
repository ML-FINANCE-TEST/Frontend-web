import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import CoinList from "./main/index";
import CoinDetails from "./main/CoinDetails";
import Home from "./main/Home/Home";
import Navbar from "./main/Home/Navbar";
import AllTokens from "./main/Home/AllTokens";
import CoinDetailsPage from "./main/Home/CoinDetailsPage";

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coinlist" element={<AllTokens />} />
        <Route path="/coin" element={<CoinList />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="/coins/:id" element={<CoinDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
