import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TypewriterEffect from "./TypewriterEffect";

const CoinDetailsPage = () => {
  const { state } = useLocation();
  const coin = state.coin; // Access entire coin object from location state
  const [animate, setAnimate] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);

  useEffect(() => {
    // Set animate to true after component mounts to trigger typewriter effect
    setAnimate(true);
  }, []);

  const handlePredictButtonClick = () => {
    setShowTypewriter(true);
    const typewriterElement = document.getElementById("typewriter-effect");
    if (typewriterElement) {
      typewriterElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  console.log(coin, "coin");

  return (
    <div style={{ padding: "120px 0px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img width="48" src={coin.iconUrl} alt={`${coin.name} icon`} />

        <p>
          {coin?.name} - {coin?.symbol}
        </p>

        <h1>
          $
          {parseFloat(coin?.price).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h1>

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
            style={{ backgroundColor: "#045444", width: 210 }}
          ></div>
          <button
            onClick={handlePredictButtonClick}
            className="btn-auth"
            style={{
              marginTop: -14,
              backgroundColor: "#ADFA25",
              color: "#045444",
              width: 210,
              fontSize: 12,
            }}
            type="submit"
          >
            Predict the price of {coin?.symbol} in 5yrs
          </button>
        </div>
        {coin?.symbol === "BTC" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            Bitcoin (BTC) is a cryptocurrency (a virtual currency) designed to
            act as money and a form of payment outside the control of any one
            person, group, or entity. This removes the need for trusted
            third-party involvement (e.g., a mint or bank) in financial
            transactions. It is rewarded to blockchain miners who verify
            transactions and can be purchased on several exchanges. Bitcoin was
            introduced to the public in 2009 by an anonymous developer or group
            of developers using the name Satoshi Nakamoto. It has since become
            the most well-known cryptocurrency in the world. Its popularity has
            inspired the development of many other cryptocurrencies. Read on to
            learn more about the cryptocurrency that started it all—the history
            behind it, how it works, how to get it, and what it can be used for.
          </p>
        ) : null}
        {coin?.symbol === "ETH" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            Ethereum is a decentralized global software platform powered by
            blockchain technology. It is most commonly known by investors for
            its native cryptocurrency, ether (ETH), and by developers for its
            use in blockchain and decentralized finance application development.
            Anyone can use Ethereum—it's designed to be scalable, programmable,
            secure, and decentralized—to create any secured digital technology.
            Its token is designed to pay for work done supporting the
            blockchain, but participants can also use it to pay for tangible
            goods and services if accepted.
          </p>
        ) : null}

        {coin?.symbol === "USDT" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            USDT is the symbol for Tether, a cryptocurrency that is pegged to
            the U.S. dollar. This means USDT is a stablecoin, fluctuating in
            value with the U.S. dollar and backed by Tether's dollar reserves.
            USDT is issued by Tether, a company owned by iFinex, the Hong
            Kong-registered company that also owns the crypto exchange BitFinex.
            As of March 2024, USDT was the third-largest cryptocurrency after
            Bitcoin (BTC) and Ethereum (ETH) and the largest stablecoin, with a
            market capitalization of nearly $99 billion. 1 In 2023 and early
            2024, Tether's USDT accounted for most of the exchanges out of other
            cryptocurrencies by volume
          </p>
        ) : null}

        {coin?.symbol === "BNB" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            Binance Coin is the cryptocurrency issued by Binance exchange and
            trades with the BNB symbol. As of August 2023, Binance Exchange is
            the largest cryptocurrency exchange in the world, with a volume of
            $6.7 billion
          </p>
        ) : null}

        {coin?.symbol === "SOL" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            Solana is a blockchain platform designed to host decentralized,
            scalable applications. Founded in 2017, it is an open-source project
            currently run by the Solana Foundation based in Geneva, while the
            blockchain was built by San Francisco-based Solana Labs. 1 Solana is
            much faster in terms of the number of transactions it can process
            and has significantly lower transaction fees than rival blockchains
            like Ethereum. The cryptocurrency that runs on the Solana
            blockchain—also named Solana (SOL)—soared almost 12,000% in 2021
            and, at one point, had a market capitalization of over $75 billion,
            making it one of the largest cryptocurrencies by this measure at the
            time. 2 Despite its popularity, SOL did not escape the
            cryptocurrency wipeout of 2022. By Dec. 29, 2022, SOL had dropped to
            about $3.63 billion in market capitalization. One year later, it had
            recovered nearly half of its lost market cap.
          </p>
        ) : null}
        {coin?.symbol === "USDC" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            USD Coin (USDC) is a digital currency that is fully backed by U.S.
            dollar assets. USDC is a tokenized U.S. dollar, with the value of
            one USDC coin pegged as close to the value of one U.S. dollar as it
            can get. The value of USDC is designed to remain stable, making USDC
            a stablecoin. Stablecoins are commonly backed by reserve assets like
            dollars or euros to achieve price stability. 1 The price stability
            of USDC contrasts sharply with the notorious price fluctuations of
            other cryptocurrencies like Bitcoin and Ethereum. Keep reading to
            understand more about USDC, including how it works and the various
            use cases for the digital currency.
          </p>
        ) : null}

        {coin?.symbol === "stETH" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            Lido is a third-party staking service that lets Ethereum users stake
            their ETH and get stETH rewards* in return. The Lido app is not
            operated by Ledger but by the Lido team through Ledger Live. Since
            the Ethereum Merge, it's possible for anyone holding at least 32 ETH
            to run a validator node and help add blocks to the Ethereum
            blockchain in exchange for staking rewards. With Lido, you don't
            need 32 ETH to start staking. Lido will pool your ETH with funds
            provided by other users until the pool reaches 32 ETH. Lido will
            then set up a validator node by depositing the ETH into Ethereum's
            staking contract and proportionally share staking rewards with you
            in the form of stETH tokens. To make up for the loss of liquidity
            (your ETH being locked in the staking contract and unavailable to
            trade), Lido will send you a number of stETH tokens equivalent to
            the amount of ETH staked plus daily stETH rewards. You can learn
            more about how this works here.
          </p>
        ) : null}

        {coin?.symbol === "XRP" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            XRP is a cryptocurrency and token Ripple Labs uses to facilitate
            transactions on its network. XRP primarily enhances global financial
            transfers and the exchange of several currencies.
          </p>
        ) : null}

        {coin?.symbol === "DOGE" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            Dogecoin (DOGE) is a peer-to-peer, open-source cryptocurrency. It is
            considered an altcoin and was launched in December 2013 with the
            image of a Shiba Inu dog as its logo. Dogecoin's blockchain has
            merit with its underlying technology derived from Litecoin.
          </p>
        ) : null}

        {coin?.symbol === "TON" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            Toncoin is a blockchain network originally created in 2018 by
            Telegram, the popular messaging app. At the time, Telegram raised
            $1.7 billion in private funding to build its new blockchain, which
            was meant to be a competitor to Ethereum. The ‘ton’ in Toncoin is
            short for The Open Network.
          </p>
        ) : null}

        {coin?.symbol === "ADA" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            Cardano (ADA) is a decentralized Proof-of-Stake (PoS) blockchain
            designed to be more efficient than blockchains that rely on
            Proof-of-Work (PoW). Similar to Ethereum, Cardano's PoS consensus
            mechanism uses and rewards cryptocurrency for work done to review
            and expand the historical blockchain record. Cardano is intended to
            evolve into a system for decentralized applications (dApps) with
            multiple use cases governed by stakers. The blockchain's
            cryptocurrency token is named ADA after Augusta Ada King, Countess
            of Lovelace, an English aristocrat commonly regarded as the first
            computer programmer. 1 ADA can also be purchased on most major
            cryptocurrency wallets and cryptocurrency exchanges.{" "}
          </p>
        ) : null}

        {coin?.symbol === "SHIB" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            Shiba Inu is an Ethereum-based altcoin (a cryptocurrency other than
            Bitcoin) that features the Shiba Inu—a Japanese breed of hunting
            dog—as its mascot. Shiba Inu is widely considered to be an
            alternative to Dogecoin; in fact, proponents of Shiba Inu tout it as
            "the Dogecoin killer." Shiba Inu and Dogecoin are meme coins, which
            are cryptocurrencies associated with some theme—like the Shiba Inu
            in the case of Shiba Inu and Dogecoin—but are often launched as a
            parody or inside joke rather than as a digital product that actually
            has utility. While Dogecoin was launched in December 2013, Shiba Inu
            was created in August 2020 by an anonymous individual or group
            called Ryoshi. 1
          </p>
        ) : null}

        {coin?.symbol === "AVAX" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            Avalanche (AVAX) is a cryptocurrency and blockchain platform that
            rivals Ethereum. AVAX is the native token of the Avalanche
            blockchain, which—like Ethereum—uses smart contracts to support
            various blockchain projects. Launched in 2020, Avalanche aims to be
            fast, versatile, secure, affordable, and accessible. 1 In addition,
            Avalanche is an open-source project, meaning anyone can view and
            contribute to the platform's code. The Avalanche blockchain
            reportedly can provide very quick transaction finality. AVAX is used
            to pay transaction processing fees, secure the Avalanche network,
            and act as a basic unit of account among blockchains in the
            Avalanche network.
          </p>
        ) : null}

        {coin?.symbol === "wstETH" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            wstETH (wrapped staked Ether) is an auto-compounding version of
            Lido’s stETH (staked Ether token) which was created to facilitate
            integrations with other DeFi protocols. Unlike stETH, wstETH does
            not rebase: as staking rewards accrue to the liquid staking token,
            its balance stays constant, but the amount of underlying stETH
            increases. In other words, the amount of ETH that wstETH can be
            redeemed for should increase
          </p>
        ) : null}

        {coin?.symbol === "WBTC" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            Bitcoin is the most recognizable cryptocurrency or digital asset in
            the world, but since the Bitcoin protocol doesn’t natively support
            general smart contracts, there isn’t an easy way to use it in
            decentralized finance (DeFi). WBTC, or Wrapped Bitcoin, is the
            solution to this problem. In this article we go into more detail
            about what exactly WBTC is, and why there is a need for it.
          </p>
        ) : null}

        {coin?.symbol === "WETH" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            WETH is an ERC-20 token on Ethereum that represents 1 Ether (ETH).
            ETH is used to pay for transactions on the Ethereum blockchain. For
            example, swapping between cryptoassets on an Ethereum-based DEX will
            cost some small amount of ETH.
          </p>
        ) : null}

        {coin?.symbol === "TRX" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            Tron is a blockchain-based decentralized digital platform with its
            own cryptocurrency, called Tronix or TRX. Founded in 2017 by a
            Singapore non-profit organization, the Tron Foundation, Tron aims to
            host a global entertainment system for the cost-effective sharing of
            digital content. 1 Initially marketed primarily in Asia, Tron had
            now gone global. The platform had about 180 million accounts as of
            August 2023. 2 Founded by Justin Sun, now its CEO, Tron has offices
            in Singapore and San Francisco. Born in 1990, Sun also is the CEO of
            BitTorrent, the file-sharing program. 3
          </p>
        ) : null}

        {coin?.symbol === "DOT" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            Polkadot is a blockchain that’s designed to support other
            blockchains. Think of this crypto platform as a network made up of
            other blockchain systems. If you think of each blockchain as a
            unique dot, then the Polkadot blockchain is like a pattern made up
            of these dots. Let’s take a closer look to see how it all works.
          </p>
        ) : null}

        {coin?.symbol === "BCH" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            Bitcoin Cash (BCH) is a cryptocurrency that was created and launched
            to bring decentralization back to cryptocurrency. It is the result
            of a 2017 Bitcoin "hard fork," which occurs when an existing
            blockchain splits into two. Bitcoin Cash allows a greater number of
            transactions in a single block than Bitcoin, which should lower fees
            and transaction times. 1 Learn more about Bitcoin Cash, how it
            differs from Bitcoin, where it's available, and if the project has
            been successful.
          </p>
        ) : null}

        {coin?.symbol === "LINK" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            Chainlink (LINK) is a cryptocurrency and technology platform that
            enables non-blockchain enterprises to securely connect with
            blockchain platforms. Chainlink is middleware that connects
            blockchain-based smart contracts with external data, such as
            baseball scores or stock prices. 1 Chainlink's LINK currency pays
            Chainlink network operators and collateralizes the network's smart
            contract agreements. 2 Chainlink is a decentralized oracle network
            or blockchain abstraction layer. Chainlink uses blockchain
            technology to securely enable computations on- and off-chain,
            supporting what it calls hybrid smart contracts and its cross-chain
            interoperability protocol. 3 4 The Chainlink blockchain is hosted on
            the Ethereum platform, which uses the proof-of-stake operating
            protocol. 5 Ethereum. "Proof-of-Stake." In addition, Chainlink is an
            open-source blockchain project, meaning anyone can view the
            project's code and contribute. 6
          </p>
        ) : null}

        {coin?.symbol === "MATIC" ? (
          <p style={{ padding: 16, fontSize: 12 }}>
            MATIC is the native cryptocurrency of the Polygon network. It's used
            to pay for transactions on the blockchain and for staking, which is
            crucial in securing the network, rewarding participants with MATIC
            tokens for their valuable contributions. Beyond this, the token can
            also be used for governance.
          </p>
        ) : null}

        {showTypewriter && coin?.symbol === "BTC" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`......Predicting the exact price of Bitcoin in 2029 is highly speculative and subject to numerous factors including technological advancements, regulatory changes, market sentiment, and macroeconomic conditions. However, here's a general framework for such a prediction using 20 lines:

                Bitcoin's price is influenced by supply and demand dynamics.
                Technological innovations may enhance Bitcoin's utility and adoption.
                Institutional adoption could increase as Bitcoin gains legitimacy.
                Regulatory clarity or uncertainty can sway investor sentiment.
                Economic instability may drive interest in alternative assets like Bitcoin.
                Halving events reduce the rate of new Bitcoin issuance, potentially impacting price.
                Increased mainstream awareness may lead to greater retail investment.
                Competing cryptocurrencies and projects could affect Bitcoin's dominance.
                Scalability solutions like the Lightning Network might improve transaction speed and cost.
                Geopolitical events may trigger flight to safe-haven assets like Bitcoin.
                Environmental concerns could impact Bitcoin's acceptance.
                Adoption as a store of value or medium of exchange may grow.
                Network upgrades like Taproot may enhance Bitcoin's functionality.
                Bitcoin's finite supply of 21 million coins may create scarcity over time.
                Market cycles, characterized by bull and bear phases, influence price movements.
                Decentralized finance (DeFi) platforms could integrate Bitcoin, expanding its use cases.
                Security vulnerabilities or hacks could undermine trust in Bitcoin.
                Socioeconomic factors such as income inequality may affect adoption rates.
                Technological breakthroughs or disruptions might alter the crypto landscape.
                Despite uncertainty, Bitcoin's decentralized nature may sustain long-term value.
                Given these considerations, predicting a specific price for Bitcoin in 2029 remains highly speculative and subject to change.......`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}
        {showTypewriter && coin?.symbol === "ETH" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`......The prediction of Ethereum's price in 2029 is uncertain, akin to Bitcoin, due to the volatile nature of the cryptocurrency market. Various analysts offer differing forecasts, with estimates ranging from an average of $11,595, with a range between $9,276 and $13,914, to higher averages closer to $25,000. These projections are subject to change, as they are influenced by factors such as the successful completion of Ethereum's upgrade to Ethereum 2.0, the demand for decentralized applications (dApps) on the Ethereum network, and competition from other smart contract-enabled blockchains. It's important to recognize that these forecasts are speculative, and investors should conduct thorough research and acknowledge the inherent risks associated with cryptocurrency investments........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}
        {showTypewriter && coin?.symbol === "USDT" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`.....USDT, also known as Tether, is a stablecoin designed to be pegged to the US dollar. Unlike Bitcoin and Ethereum, USDT's goal is to maintain a relatively stable price of $1.
                Here's what most analysts predict for USDT in 2029:
                Stable Price: Due to its pegging to the US dollar, most predictions expect USDT to stay around $1 throughout 2029, with a slight range of fluctuation. Some sources predict a range of $0.99 to $1.03 [CoinMarketCap, BitScreener].
                It's important to remember that even though USDT is a stablecoin, there have been instances in the past where its price deviated slightly from $1. However, due to its design and how it's managed, significant price swings are uncommon.........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}

        {showTypewriter && coin?.symbol === "BNB" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`.....
                
                Predicting the price of BNB in 2029 is similar to other cryptocurrencies and inherently uncertain. However, I can share some predictions from various sources to give you an idea of possible ranges:

                Conservative: Coin Edition predicts a price of $2,300 by the end of 2029, suggesting a more stable market sentiment by then [coinedition.com].
                Mid-Range: Mudrex forecasts a range between $570.34 and $1,275.90 with a potential high of $1,038.95 by 2029 [mudrex.com].
                High Growth: Changelly offers a more bullish prediction with a minimum of $5,056 and a maximum of $6,187 by December 2029, with an average price of $5,207 [changelly.com].
                These are just a few examples, and there's a wide range in predictions. Here are some factors that could influence BNB's price in 2029:
                
                Binance Exchange Performance: The overall success and growth of the Binance exchange could significantly impact BNB's value.
                Utility of BNB: Continued development and adoption of BNB's use cases (e.g., trading fees, travel booking) could increase demand.
                Regulation: Similar to other cryptocurrencies, regulations could influence BNB's adoption and price.
                Overall Crypto Market Trends: The general sentiment and growth of the cryptocurrency market as a whole will also play a role.
                Remember: These are predictions, not guarantees. It's vital to conduct your own research, understand the risks of cryptocurrency investment, and never invest more than you can afford to lose.
                
                
                
                .........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}

        {showTypewriter && coin?.symbol === "stEth" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`.....
                
                Predicting the price of stETH (Lido Staked ETH) in 2029 is challenging due to the dependence on both the Ethereum (ETH) price and the overall staking market. However, based on some analyst predictions for both, here's a possible scenario for stETH in 2029:

                Following ETH Price: If Ethereum's price reaches the mid-range predictions of $11,595 by 2029 [AMBCrypto], stETH's price could potentially follow a similar trajectory. This would place stETH somewhere around the same value, considering the staking rewards it offers on top of the ETH price.
                Higher Potential: Some analysts are more bullish on Ethereum, predicting an average of $25,000 by 2029 [Changelly]. In that scenario, stETH's price could potentially surpass the base ETH price due to the staking rewards.
                Here's a caveat:  These predictions are based on estimates for ETH. The actual price of stETH could deviate depending on factors like:
                
                Staking Popularity: Increased popularity of staking Ethereum could drive demand for stETH, potentially pushing its price higher than the base ETH price.
                Lido Staking Platform Performance: The overall success and trust in the Lido staking platform could influence the price of stETH.
                Ethereum Upgrade Impact: The full implementation of Ethereum 2.0 and its impact on staking rewards could significantly influence stETH's price.
                Remember:  These are predictions, not guarantees. It's crucial to conduct your own research on Ethereum's price forecasts, staking rewards estimations, and the Lido platform before making any investment decisions in stETH.
                
                .........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}

        {showTypewriter && coin?.symbol === "USDC" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`.....
                
                My prediction for USDC is different from other cryptocurrencies because USDC is a stablecoin. Unlike Bitcoin or Ethereum, USDC is designed to maintain a relatively stable price of $1.

                Here's why USDC's price is expected to stay around $1:
                
                Fiat Peg: USDC is pegged to the US dollar, meaning its value is tied to the value of one US dollar.
                Reserve Backing: Reserves held in US dollars and other highly liquid assets back USDC. This mechanism helps maintain the 1:1 peg.
                Therefore, most analysts predict that USDC will likely stay around $1 throughout 2029, with a slight range of fluctuation. Some sources even predict a range of $0.99 to $1.03 [CoinMarketCap, BitScreener].
                
                It's important to remember: Even though USDC is designed to be stable, there have been instances in the past where its price deviated slightly from $1. However, due to its design and how it's managed, significant price swings are uncommon. 
               
               
                .........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}

        {showTypewriter && coin?.symbol === "XRP" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`.....
                
                Predicting the price of XRP in 2029 is difficult due to the ever-changing cryptocurrency market. However, here's a glimpse into what some analysts expect:

                Range: Some analysts predict XRP to be somewhere between $3.71 and $6.40 by 2029, with an average price ranging from $4.65 to $4.80 [Changelly, crypto.ro].
                Higher Potential: Others are more optimistic, with predictions reaching as high as $8.00 by 2030, based on widespread crypto adoption [Changelly].
                Important Note: These are just forecasts, and the actual price of XRP in 2029 could be much higher or lower. Here are some factors that could influence its price:
                
                Outcome of SEC Lawsuit: The ongoing lawsuit between Ripple and the SEC heavily influences XRP's price. A positive resolution for Ripple could significantly boost its price.
                Ripple Technology Adoption: Increased adoption of Ripple's technology (xRapid, xCurrent, etc.) by financial institutions for cross-border payments could drive demand for XRP.
                Overall Crypto Market Trends: The general sentiment and growth of the cryptocurrency market as a whole will also play a role in XRP's price.
                While there's some hope for XRP's price growth by 2029, it's crucial to do your own research  and understand the inherent risks of cryptocurrency investment. Remember, never invest more than you can afford to lose.
                .........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}

        {showTypewriter && coin?.symbol === "DOGE" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`.....
                Predicting Dogecoin's price in 2029 is tricky due to its dependence on various factors. Here's a breakdown of some analyst predictions to give you an idea of the range:

                Conservative: CoinGape predicts a minimum of $1.19 and a maximum of $1.42 by 2029 [[invalid URL removed]].
                Mid-Range: Others are more optimistic, expecting Dogecoin to hover around $1.23 on average [Changelly].
                Bullish: Crypto.ro forecasts a bullish turn with an average price reaching $3.02 by 2029, with a possibility of reaching as high as $4.45 [crypto.ro].
                Remember, these are just predictions, not guarantees. Here are some factors that could influence Dogecoin's price in 2029:
                
                Market Sentiment: Dogecoin's price heavily relies on social media hype and celebrity endorsements. Continued positive sentiment could drive the price up.
                Development and Utility: If Dogecoin undergoes significant development in terms of usability and functionality, it could attract more users and increase its value.
                Regulation: Government regulations on cryptocurrencies could impact Dogecoin's adoption and price.
                Overall Crypto Market Trends: The general health and growth of the cryptocurrency market will also play a role.
                Overall, there's a possibility for Dogecoin's price to rise by 2029. However, it's crucial to conduct your own research,  understand the inherent risks of cryptocurrency investment, and never invest more than you can afford to lose.
                
                
               
                .........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}

        {showTypewriter && coin?.symbol === "ADA" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`.....

                Predicting the price of Cardano (ADA) in 2029 is difficult due to the ever-changing cryptocurrency market. Here's a glimpse into what some analysts expect:

                Mid-Range: Some analysts predict ADA to be somewhere between $12 and $35 by 2029, with an average price around $20 [Changelly, coinedition.com].
                Higher Potential: Others are more bullish, with predictions reaching as high as $73.70 by 2030, based on continued growth and adoption [CoinMarketCap].
                Important Note: These are just forecasts, and the actual price of ADA in 2029 could be much higher or lower. Here are some factors that could influence its price:
                
                Cardano Development: Continued development and successful implementation of the Cardano roadmap, including scaling solutions and smart contract functionality, could boost confidence and attract users.
                Adoption by Businesses and Institutions: Increased adoption of Cardano by businesses and institutions for decentralized applications (dApps) and other purposes could significantly drive demand for ADA.
                Overall Crypto Market Trends: The general sentiment and growth of the cryptocurrency market as a whole will also play a role in ADA's price.
                While there's some optimism for Cardano's price growth by 2029, it's crucial to do your own research  and understand the inherent risks of cryptocurrency investment. Remember, never invest more than you can afford to lose.  
               
                .........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}

        {showTypewriter && coin?.symbol === "SHIB" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`.....
             
                
                Predicting the price of Shiba Inu (SHIB) in 2029 is especially difficult due to its high volatility and dependence on several unpredictable factors. However, here's a glimpse into what some analysts expect:

Range: Some analysts predict a range between $0.0001 and $0.0004 by 2029, with an average price around $0.0002 [Changelly, CoinCodex].
Higher Potential: Others are more optimistic, with predictions reaching as high as $0.001 or even exceeding that, based on significant SHIB adoption and potential burns (reducing the total supply) [TokenMetrics].
Important Note: It's crucial to remember these are just forecasts, and the actual price of SHIB in 2029 could be much higher or lower, potentially even dropping significantly. Here are some factors that could influence its price:

Shiba Inu Ecosystem Development: The development and adoption of the Shiba Inu ecosystem, including its decentralized exchange (ShibaSwap) and other utilities, could influence SHIB's value.
Burn Mechanisms: Continued implementation of burn mechanisms to reduce the total supply of SHIB could increase its scarcity and potentially drive the price up.
Market Hype and Social Media Influence: SHIB's price has been heavily influenced by social media trends and celebrity endorsements in the past. Continued positive sentiment could lead to price increases, but negative sentiment could cause price drops.
Overall Crypto Market Trends: The general health and growth of the cryptocurrency market as a whole will also play a role in SHIB's price.
While there's a possibility for SHIB's price to rise by 2029, it's crucial to conduct your own research  and understand the inherent risks of cryptocurrency investment, especially with highly volatile assets like SHIB. Remember, never invest more than you can afford to lose.



                .........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}

        {showTypewriter && coin?.symbol === "AVAX" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`.....
                Predicting the price of Avalanche (AVAX) in 2029 is challenging due to the inherent volatility of the cryptocurrency market. However, based on current trends and analyst opinions, here's a range of possible future prices for AVAX:

                Range of Predictions:
                
                Conservative: Some analysts predict a conservative range for AVAX, with a minimum price of $63.79 and a maximum of $201.22 by 2029 [BitScreener].
                Mid-Range: Others estimate an average price around $67.14 in 2029, with a potential high of reaching $182.40 by 2025 based on historical trends [CoinCodex, Changelly].
                Bullish: Some analysts are more optimistic, forecasting a price as high as $265.72 by 2029, driven by advancements in blockchain technology and increased adoption [crypto.ro].
                Factors Affecting AVAX Price:
                
                Technological Advancements: Continued development and adoption of Avalanche's unique features, such as its fast transaction speeds and scalability, could attract more users and developers, potentially increasing demand for AVAX.
                Growth of DeFi and NFTs: Increased use of Avalanche for decentralized finance (DeFi) applications and non-fungible tokens (NFTs) could significantly drive demand for AVAX.
                Regulation: Government regulations on cryptocurrencies could impact Avalanche's adoption and price.
                Overall Crypto Market Trends: Broader market sentiment and the overall growth of the cryptocurrency market will also play a role.
                Remember: These are just predictions, not guarantees. Here are some additional points to consider:
                
                Cryptocurrency Market Volatility: The cryptocurrency market is highly volatile, and AVAX's price could fluctuate significantly before 2029.
                Do Your Own Research: It's crucial to conduct your own research on Avalanche's technology, roadmap, and competition before making any investment decisions.
                Invest Responsibly: Never invest more than you can afford to lose in any cryptocurrency, including AVAX.
                Here are some additional resources for AVAX price predictions:
                
                CoinMarketCap: https://coinmarketcap.com/currencies/avalanche/
                CoinGecko: https://www.coingecko.com/en/coins/avalanche
                PricePrediction.net: https://coincodex.com/crypto/avalanche/price-prediction/   
                .........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}

        {showTypewriter && coin?.symbol === "wstETH" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`.....
                Predicting the price of Wrapped stETH (WSTETH) in 2029 is complex because it depends on two factors:

                Ethereum (ETH) Price: The value of WSTETH is intrinsically linked to the price of Ethereum (ETH) as it represents staked ETH. If the price of ETH goes up, so will the price of WSTETH, and vice versa.
                Staking Rewards: WSTETH offers staking rewards on top of the ETH price. These rewards can vary depending on the overall staking pool on Ethereum and the specific platform where you hold your WSTETH.
                Here's a possible scenario for WSTETH in 2029 based on ETH price predictions:
                
                Following ETH Price: If Ethereum's price reaches the mid-range predictions of $11,595 by 2029 [AMBCrypto], WSTETH's price could potentially follow a similar trajectory. This would place WSTETH somewhere around the same value, with the addition of staking rewards accumulated over time.
                Higher Potential: Some analysts are more bullish on Ethereum, predicting an average of $25,000 by 2029 [Changelly]. In that scenario, WSTETH's price could potentially surpass the base ETH price due to the staking rewards.
                Here's a caveat:
                
                These predictions are based on estimates for ETH. The actual price of WSTETH could deviate depending on staking reward fluctuations.
                Additional factors influencing WSTETH price:
                
                Popularity of Staking: Increased popularity of staking Ethereum could drive demand for WSTETH, potentially pushing its price higher than the base ETH price.
                Lido Staking Platform Performance: The overall success and trust in the Lido staking platform, where WSTETH originates, could influence the price of WSTETH.
                Ethereum Upgrade Impact: The full implementation of Ethereum 2.0 and its impact on staking rewards could significantly influence WSTETH's price.
                Remember: Predictions are not guarantees. It's vital to conduct your own research on:
                
                Ethereum's price forecasts
                Staking rewards estimations for Lido or other staking platforms
                The potential risks and benefits of WSTETH
                Never invest more than you can afford to lose in any cryptocurrency. 
                .........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}

        {showTypewriter && coin?.symbol === "WBTC" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`.....
                Predicting the price of Wrapped Bitcoin (WBTC) in 2029 is challenging because it depends on the price movement of Bitcoin (BTC), the underlying asset it represents. Here's a breakdown of what some analysts expect for WBTC, considering its tie to BTC:

                Range: Some analysts predict a range between $122,000 and $185,000 for Bitcoin by the end of 2029 [ZebPay]. This would likely translate to a similar range for WBTC, as its price generally mirrors BTC's.
                Higher Averages: Others estimate an average price of $175,000 for Bitcoin by 2029, with highs reaching $220,000 [crypto.ro]. This scenario suggests a similar average for WBTC, potentially reaching even higher points.
                Even Higher: There are even predictions with a minimum of $517,000 and a maximum of $619,000 for Bitcoin by 2029 [Changelly]. If this were to occur, WBTC's price would likely follow suit.
                Important Note: Remember, these are just forecasts for Bitcoin, and the actual price of WBTC in 2029 could be much higher or lower. Here are some factors that could influence the price of both Bitcoin and WBTC:
                
                Regulation: Government regulations around cryptocurrency could impact adoption and price for both BTC and WBTC.
                Adoption: Increased mainstream adoption of Bitcoin could drive the price of both BTC and WBTC up.
                Competition: The emergence of new cryptocurrencies could compete with Bitcoin and potentially affect the price of WBTC.
                Economic Factors: Global economic conditions can also play a role in the price of Bitcoin and WBTC.
                Additional factors specific to WBTC:
                
                Demand for DeFi Applications: Increased use of DeFi applications built on the Ethereum network could drive demand for WBTC, potentially pushing its price higher than Bitcoin's if the DeFi utility outweighs the slight premium for using WBTC.
                Remember: These are just predictions, not guarantees. It's crucial to do your own research on Bitcoin's price forecasts, the potential of DeFi applications using WBTC, and the inherent risks of cryptocurrency investment.  
                .........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}

        {showTypewriter && coin?.symbol === "WETH" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`.....
                Predicting the price of Wrapped Ethereum (WETH) in 2029 is challenging due to the ever-changing cryptocurrency market. However, we can analyze some factors and analyst predictions to get a possible range:

                Factors Influencing WETH Price:
                
                Ethereum (ETH) Price: WETH's price is inherently linked to Ethereum (ETH) as it represents 1 ETH on a 1:1 basis. So, the price movement of ETH will significantly impact WETH.
                DeFi and NFT Adoption: Increased use of Ethereum for Decentralized Finance (DeFi) applications and Non-Fungible Tokens (NFTs) could drive demand for WETH, potentially increasing its price.
                Overall Crypto Market Trends: The general health and growth of the cryptocurrency market as a whole will also play a role in WETH's price.
                Analyst Predictions for WETH in 2029:
                
                Conservative: Some analysts predict a conservative range for WETH, with a minimum price of $5,711.65 and a maximum of $11,277 by 2029 [CoinCodex].
                Mid-Range: Others estimate an average price around $12,450 by 2029, with a possibility of reaching $25,774 [Changelly, Bitget].
                Bullish: A few analysts are more optimistic, forecasting a price as high as $41,575 for WETH by 2031, which could potentially influence the 2029 price as well [CoinMarketCap].
                Important Note: It's crucial to remember these are just forecasts, and the actual price of WETH in 2029 could be much higher or lower. Here are some additional points to consider:
                
                Cryptocurrency Market Volatility: The cryptocurrency market is highly volatile, and WETH's price could fluctuate significantly before 2029.
                Do Your Own Research: It's vital to conduct your own research on Ethereum's development, DeFi and NFT trends, and the potential risks and benefits of WETH before making any investment decisions.
                Invest Responsibly: Never invest more than you can afford to lose in any cryptocurrency, including WETH.
                .........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}

        {showTypewriter && coin?.symbol === "TRX" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`.....
                Predicting the price of Tron (TRX) in 2029 is difficult due to the inherent volatility of the cryptocurrency market. However, based on current trends and analyst opinions, here's a range of possible future prices for TRX:

                Analyst Predictions:
                
                Conservative: Some analysts predict a conservative range for TRX, with a minimum price between $0.02 and $0.04 by 2029 [Changelly].
                Mid-Range: Others estimate an average price around $0.10 to $0.18 in 2029, with a potential high of reaching $0.22 [CoinCodex, AMBCrypto].
                Bullish: A few analysts are more optimistic, forecasting a price as high as $0.52 or even exceeding that by 2029, driven by significant TRX adoption and ecosystem development [TradingBeast].
                Factors Affecting TRX Price:
                
                Tron Network Development: Continued development and successful implementation of the Tron roadmap, including scaling solutions and smart contract functionality, could boost confidence and attract users, potentially increasing demand for TRX.
                Decentralized Application (dApp) Adoption: Increased use of Tron for dApps could significantly drive demand for TRX, as TRX is used for transactions and fees on the network.
                Regulation: Government regulations on cryptocurrencies could impact Tron's adoption and price.
                Overall Crypto Market Trends: Broader market sentiment and the overall growth of the cryptocurrency market will also play a role.
                Remember: These are just predictions, not guarantees. Here are some additional points to consider:
                
                Cryptocurrency Market Volatility: The cryptocurrency market is highly volatile, and TRX's price could fluctuate significantly before 2029.
                Do Your Own Research: It's crucial to conduct your own research on Tron's technology, roadmap, competition, and potential risks before making any investment decisions.
                Invest Responsibly: Never invest more than you can afford to lose in any cryptocurrency, including TRX.
                 
                .........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}
        {showTypewriter && coin?.symbol === "MATIC" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`.....
                Predicting the price of Polygon (MATIC) in 2029 is challenging, but here's a glimpse into what some analysts expect, along with factors that could influence its price:

                Analyst Predictions (2029):
                
                Range: Many analysts predict MATIC to be somewhere between $1.39 and $7.13 by 2029, with an average price ranging from $2.87 to $4.20 [BitScreener, Mudrex, crypto.ro].
                Higher Potential: A few analysts are more bullish, forecasting a price as high as $10 or even exceeding that by 2029 [Changelly].
                Important Note: It's crucial to remember these are just forecasts, and the actual price of MATIC in 2029 could be much higher or lower. Here are some factors that could influence its price:
                
                Polygon Network Adoption: Increased adoption of the Polygon network for decentralized applications (dApps), scaling solutions for Ethereum, and other functionalities could significantly drive demand for MATIC, potentially increasing its price.
                Success of Polygon zkEVM: The successful launch and adoption of Polygon's zero-knowledge Ethereum Virtual Machine (zkEVM) could further enhance scalability and attract more users, potentially boosting MATIC's value.
                Regulation: Government regulations on cryptocurrencies could impact Polygon's adoption and price.
                Overall Crypto Market Trends: The general health and growth of the cryptocurrency market as a whole will also play a role in MATIC's price.
                Remember: These are just predictions, not guarantees. Here are some additional points to consider before making any investment decisions:
                
                Do Your Own Research: It's vital to conduct your own research on Polygon's technology, roadmap, competition, and the inherent risks of cryptocurrency investment.
                Cryptocurrency Market Volatility: The cryptocurrency market is highly volatile, and MATIC's price could fluctuate significantly before 2029.
                Invest Responsibly: Never invest more than you can afford to lose in any cryptocurrency, including MATIC.  
                .........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}
        {showTypewriter && coin?.symbol === "BCH" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`.....
                Predicting the price of Bitcoin Cash (BCH) in 2029 is difficult due to the inherent volatility of the cryptocurrency market. However, based on current trends and analyst opinions, here's a range of possible future prices for BCH:

                Analyst Predictions (BCH in 2029):
                
                Conservative: Some analysts predict a conservative range for BCH, with a minimum price between $200 and $400 by 2029 [WalletInvestor, PricePrediction.net].
                Mid-Range: Others estimate an average price around $700 to $1,000 in 2029, with a possibility of reaching $1,200 [TradingBeast, CoinCodex].
                Bullish: A few analysts are more optimistic, forecasting a price as high as $2,000 or even exceeding that by 2029, driven by wider adoption and increased functionality [Changelly].
                Factors Affecting BCH Price:
                
                Adoption as a Means of Payment: Increased adoption of BCH for everyday transactions and online payments could significantly drive demand for BCH.
                Scalability Improvements: Continued development to improve scalability and transaction speeds on the Bitcoin Cash network could make it more attractive for users and businesses.
                Regulation: Government regulations on cryptocurrencies could impact BCH's adoption and price.
                Overall Crypto Market Trends: Broader market sentiment and the overall growth of the cryptocurrency market will also play a role.
                Remember: These are just predictions, not guarantees. Here are some additional points to consider before making any investment decisions:
                
                Cryptocurrency Market Volatility: The cryptocurrency market is highly volatile, and BCH's price could fluctuate significantly before 2029.
                Do Your Own Research: It's crucial to conduct your own research on Bitcoin Cash's technology, roadmap, competition (other established cryptocurrencies and emerging altcoins), and the inherent risks of cryptocurrency investment.
                Invest Responsibly: Never invest more than you can afford to lose in any cryptocurrency, including BCH.
                   
                .........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}
        {showTypewriter && coin?.symbol === "LINK" && (
          <div
            id="typewriter-effect"
            style={{
              padding: 16,
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div>
              <TypewriterEffect
                text={`.....
                To predict the price of Chainlink (LINK) for 2029, we can apply a similar approach as with Ethereum, considering various factors that could influence its price:

                Market Adoption and Demand: The increasing adoption of decentralized finance (DeFi) and oracle services, for which Chainlink is a major provider, could drive demand for LINK tokens. As more projects integrate Chainlink's decentralized oracles, the demand for LINK may increase.
                Technological Developments: Chainlink continues to evolve its technology to enhance scalability, security, and flexibility. The successful implementation of upgrades and improvements could positively impact investor confidence and the price of LINK.
                Competition and Partnerships: Competition from other oracle providers and blockchain platforms offering similar services may affect Chainlink's market share. However, strategic partnerships and collaborations could strengthen Chainlink's position in the market and potentially boost its price.
                Overall Market Sentiment: The general sentiment and trends in the cryptocurrency market, as well as broader economic factors, can influence the price of LINK. Factors such as regulatory developments, investor sentiment, and macroeconomic conditions could impact the overall market and, consequently, the price of Chainlink.
                Given these considerations, predicting the exact price of Chainlink in 2029 remains speculative and subject to a high degree of uncertainty. It's essential to conduct thorough research, monitor market trends, and consider expert analysis when evaluating the potential future performance of Chainlink.
                .........`}
                animate={animate} // Pass animate state as a prop
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinDetailsPage;
