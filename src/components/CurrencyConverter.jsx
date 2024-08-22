import { useEffect, useState } from 'react'
import axios from 'axios'
import './CurrencyConverter.css'


function CurrencyConverter() {
  // Переменные состояния для хранения вводимого количества, валюты отправления, валюты получения, конвертированного количества и курса обмена
  const [amount, setAmount] = useState('') // Вводимое количество
  const [fromCurrency, setFromCurrency] = useState('USD') // Валюта отправления (изначально установлена в USD)
  const [toCurrency, setToCurrency] = useState('EUR') // Валюта получения (изначально установлена в EUR)
  const [convertedAmount, setConvertedAmount] = useState(null) // Конвертированное количество (изначально null)
  const [exchangeRate, setExchangeRate] = useState(null) // Курс обмена (изначально null)

  // Определить URL API для получения курса обмена

  const URL = `https://v6.exchangerate-api.com/v6/350f23924ee876448db0a176/pair/${fromCurrency}/${toCurrency}`

  // Использовать хук useEffect для получения курса обмена при монтировании компонента или при изменении валюты отправления или получения

  useEffect(() => {
    // Определить асинхронную функцию для получения курса обмена
    const getExchangeRate = async uri => {
      try {
        // Сделать GET-запрос к API для получения курса обмена
        const response = await axios.get(uri)
        // Извлечь курс обмена из данных ответа
        const rate = response.data.conversion_rate
        // Обновить переменную состояния курса обмена
        setExchangeRate(rate)
      } catch (error) {
        // Логировать ошибки в консоль
        console.error('Ошибка получения курса обмена:', error)
      }
    }

    // Если валюты отправления и получения отличаются, получить курс обмена
    if (fromCurrency !== toCurrency) {
      getExchangeRate(URL)
    } else {
      // Если валюты отправления и получения совпадают, установить курс обмена в 1
      setExchangeRate(1)
    }
  }, [fromCurrency, toCurrency])

  // Определить обработчики событий для обновления переменных состояния при вводе новых значений
  const handleAmountChange = event => {
    setAmount(event.target.value)
  }

  const handleFromCurrencyChange = event => {
    setFromCurrency(event.target.value)
  }

  const handleToCurrencyChange = event => {
    setToCurrency(event.target.value)
  }

  // Определить обработчик события для конвертации вводимого количества с помощью курса обмена и обновления переменной состояния конвертированного количества

  const handleConvert = () => {
    if (!isNaN(amount) && exchangeRate) {
      // Рассчитать конвертированное количество, умножив вводимое количество на курс обмена
      const convertedValue = amount * exchangeRate
      // Обновить переменную состояния конвертированного количества с результатом, округленным до 2 знаков после запятой
      setConvertedAmount(convertedValue.toFixed(2))
    }
  }

  // JSX для компонента
  return (
    <section className='landing-section'>
      <div className='row container'>
        <div className='form'>
          <h1 className='landing-heading'>Конвертер валют</h1>

          <div className='mb-2'>
            <label className='form-label'>
              Количество:
              <input type='number' value={amount} onChange={handleAmountChange} className='form-control' />
            </label>
          </div>

          <div className='mb-2'>
            <label className='form-label'>
              Стартовая валюта:
              <select value={fromCurrency} onChange={handleFromCurrencyChange} className='form-select select-tag'>
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
                <option value='RUB'>RUB</option>
              </select>
            </label>
          </div>

          <div className='mb-2'>
            <label className='form-label'>
              Переводная валюта:
              <select value={toCurrency} onChange={handleToCurrencyChange} className='form-select select-tag'>
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
                <option value='RUB'>RUB</option>
              </select>
            </label>
          </div>

          <button onClick={handleConvert} className='btn btn-success'>
            Перевести
          </button>

          {convertedAmount !== null && (
            <div>
              <p className='para'>
                Конвертированное количество: {convertedAmount} {toCurrency}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CurrencyConverter
