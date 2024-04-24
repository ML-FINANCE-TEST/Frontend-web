// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import CanvasJSReact from "@canvasjs/react-charts";

// const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// function CoinDetails() {
//     const [coinDetails, setCoinDetails] = useState(null);
//     const [error, setError] = useState(null);
//     const location = useLocation();
//     const { pathname } = location;
//     const rank = parseInt(pathname.match(/\d+/)[0]);

//     useEffect(() => {
//         const fetchCoinData = async () => {
//             const options = {
//                 method: "GET",
//                 url: "https://coinranking1.p.rapidapi.com/coins",
//                 params: {
//                     referenceCurrencyUuid: "yhjMzLPhuIDl",
//                     timePeriod: "30d", // Fetch data for the last 30 days
//                     "tiers[0]": "1",
//                     orderBy: "marketCap",
//                     orderDirection: "desc",
//                     limit: "50",
//                     offset: "0",
//                 },
//                 headers: {
//                     "X-RapidAPI-Key": "c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be",
//                     "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
//                 },
//             };

//             try {
//                 const response = await axios.request(options);
//                 const coinsData = response.data.data.coins;
//                 const filteredCoin = coinsData.find((coin, index) => index === parseInt(rank) - 1);

//                 const candlestickData = filteredCoin.sparkline.map((price, index) => {
//                     const openPrice = parseFloat(price);
//                     const closePrice = openPrice + getRandomDifference();
//                     const highPrice = Math.max(openPrice, closePrice) + getRandomDifference();
//                     const lowPrice = Math.min(openPrice, closePrice) - getRandomDifference();
//                     return {
//                         x: new Date(Date.now() - (30 - index) * 24 * 60 * 60 * 1000), // Calculate timestamp for each day over the past month
//                         y: [openPrice, highPrice, lowPrice, closePrice],
//                     };
//                 });

//                 setCoinDetails({ ...filteredCoin, candlestickData });
//             } catch (error) {
//                 console.error("Error fetching coin data:", error);
//                 setError(error);
//             }
//         };

//         fetchCoinData();
//     }, [rank]);

//     function getRandomDifference() {
//         return Math.floor(Math.random() * (1500 - 400 + 1)) + 400; // Generate random difference between $400 and $1500
//     }

//     return (
//         <div>
//             {coinDetails && (
//                 <div>
//                     <h1>
//                         {coinDetails.name} ({coinDetails.symbol}) Details
//                     </h1>
//                     <ul>
//                         <li>Rank: {coinDetails.rank}</li>
//                         <li>Price: ${coinDetails.price}</li>
//                         <li>Market Cap: ${coinDetails.marketCap}</li>
//                         <li>24h Change: {coinDetails.change}%</li>
//                     </ul>
//                     <CanvasJSChart
//                         options={{
//                             theme: "light1",
//                             animationEnabled: true,
//                             exportEnabled: true,
//                             title: {
//                                 text: "Candlestick Chart",
//                             },
//                             axisX: {
//                                 valueFormatString: "MMM DD, YYYY HH:mm",
//                             },
//                             axisY: {
//                                 prefix: "$",
//                                 title: "Price (in USD)",
//                             },
//                             data: [
//                                 {
//                                     type: "candlestick",
//                                     showInLegend: true,
//                                     name: coinDetails.name,
//                                     yValueFormatString: "$###0.00",
//                                     xValueFormatString: "MMM DD, YYYY HH:mm",
//                                     dataPoints: coinDetails.candlestickData,
                                    
//                                 },
//                             ],
//                         }}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// }

// export default CoinDetails;
