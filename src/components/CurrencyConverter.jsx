import { useEffect, useState } from 'react'
import axios from 'axios'
import './CurrencyConverter.css'

function CurrencyConverter() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [convertedAmount, setConvertedAmount] = useState(null)
  const [exchangeRate, setExchangeRate] = useState(null)

  const URL = `https://v6.exchangerate-api.com/v6/350f23924ee876448db0a176/pair/${fromCurrency}/${toCurrency}`

  useEffect(() => {
    const getExchangeRate = async uri => {
      try {
        const response = await axios.get(uri)
        const rate = response.data.conversion_rate
        setExchangeRate(rate)
      } catch (error) {
        console.error('Error fetching exchange rate:', error)
      }
    }

    if (fromCurrency !== toCurrency) {
      getExchangeRate(URL)
    } else {
      // Если from и to валюты совпадают - выставить 1
      setExchangeRate(1)
    }
  }, [fromCurrency, toCurrency])

  const handleAmountChange = event => {
    setAmount(event.target.value)
  }

  const handleFromCurrencyChange = event => {
    setFromCurrency(event.target.value)
  }

  const handleToCurrencyChange = event => {
    setToCurrency(event.target.value)
  }

  const handleConvert = () => {
    if (!isNaN(amount) && exchangeRate) {
      const convertedValue = amount * exchangeRate
      setConvertedAmount(convertedValue.toFixed(2))
    }
  }

  return (
    <section className='landing-section'>
      <div className='row container'>
        <div className='form'>
          <h1 className='landing-heading'>Currency Converter</h1>

          <div className='mb-2'>
            <label className='form-label'>
              Amount:
              <input type='number' value={amount} onChange={handleAmountChange} className='form-control' />
            </label>
          </div>

          <div className='mb-2'>
            <label className='form-label'>
              From Currency:
              <select value={fromCurrency} onChange={handleFromCurrencyChange} className='form-select select-tag'>
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
                <option value='RUB'>RUB</option>
              </select>
            </label>
          </div>

          <div className='mb-2'>
            <label className='form-label'>
              To Currency:
              <select value={toCurrency} onChange={handleToCurrencyChange} className='form-select select-tag'>
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
                <option value='RUB'>RUB</option>
              </select>
            </label>
          </div>

          <button onClick={handleConvert} className='btn btn-success'>
            Convert
          </button>

          {convertedAmount !== null && (
            <div>
              <p className='para'>
                Converted Amount: {convertedAmount} {toCurrency}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CurrencyConverter
