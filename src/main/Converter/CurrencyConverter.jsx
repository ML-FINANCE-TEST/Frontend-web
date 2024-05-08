import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CurrencyConverter.css'; // Import CSS file for styling

const CurrencyConverter = () => {
  const [targetCurrency, setTargetCurrency] = useState('');
  const [conversionRate, setConversionRate] = useState(null);
  const [error, setError] = useState(null);

  const currencyOptions = [
    'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD',
    'NOK', 'KRW', 'MXN', 'SGD', 'HKD', 'TRY', 'INR', 'RUB', 'ZAR', 'BRL',
    'DKK', 'PLN', 'THB', 'IDR', 'HUF', 'CZK', 'ILS', 'CLP', 'PHP', 'AED',
    'COP', 'SAR', 'MYR', 'RON', 'VND', 'ARS', 'IQD', 'BOB', 'NGN', 'KES',
    'EGP', 'PKR', 'UAH', 'BDT', 'VES', 'LKR', 'TWD', 'TND', 'GHS', 'MAD',
    'HRK', 'PYG', 'UZS', 'OMR', 'XAU', 'NPR', 'XDR', 'ISK', 'AFN', 'RSD',
    'SCR', 'BHD', 'DZD', 'HTG', 'LYD', 'XAG', 'CUC', 'NAD', 'GEL', 'SYP',
    'XPF', 'MUR', 'LSL', 'AWG', 'MDL', 'XCD', 'SLL', 'JMD', 'BND', 'BWP',
    'BZD', 'CDF', 'FJD', 'LAK', 'MMK', 'MNT', 'RWF', 'SRD', 'TOP', 'MGA',
    'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM',
    'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD',
    'BTN', 'BWP', 'BYN', 'BYR', 'BZD', 'CAD', 'CDF', 'CHF', 'CLF', 'CLP',
    'CNY', 'COP', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP',
    'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP',
    'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG',
    'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD',
    'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KID', 'KMF', 'KPW', 'KRW', 'KWD',
    'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL',
    'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN',
    'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB',
    'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB',
    'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS',
    'SPL', 'SRD', 'STN', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND',
    'TOP', 'TRY', 'TTD', 'TVD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU',
    'UZS', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XDR', 'XOF', 'XPF',
    'YER', 'ZAR', 'ZMW', 'ZWD'
  ];
  

  useEffect(() => {
   
    if (targetCurrency) {
      fetchData();
    }
  }, [targetCurrency]);



  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://exchange-rate-api1.p.rapidapi.com/convert',
      params: {
        base: 'gbp',
        target: targetCurrency
      },
      headers: {
        'X-RapidAPI-Key': 'c091a4e18dmsh080c2384c7f4c47p1bafcejsn01decb6ed9be',
        'X-RapidAPI-Host': 'exchange-rate-api1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setConversionRate(response.data.convert_result.rate);
      console.log(response, 'response')
    } catch (error) {
      console.error(error);
      setError('Error fetching conversion rate');
    }
  };


  const handleSelectChange = (event) => {
    setTargetCurrency(event.target.value);
  };

  const handleConvert = () => {
    if (targetCurrency) {
      fetchData();
    }
  };

  return (
    <div className="converter-container">
      <h2 className="converter-title">Currency Swap</h2>
      <div className="converter-input">
        <label htmlFor="targetCurrency" className="converter-label">Convert to:</label>
        <select
          id="targetCurrency"
          value={targetCurrency}
          onChange={handleSelectChange}
          className="converter-dropdown"
        >
          <option value="">Select currency</option>
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <button onClick={handleConvert} className="converter-button">Convert</button>
      </div>
      {conversionRate && (
        <div className="conversion-result">
          <p className="conversion-text">{`1 GBP = ${conversionRate} ${targetCurrency.toUpperCase()}`}</p>
        </div>
      )}
      {error && (
        <p className="error-message">{error}</p>
      )}
    </div>
  );
};

export default CurrencyConverter;
