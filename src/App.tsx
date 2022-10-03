
import './App.css';
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { ICar } from './models';
import axios from 'axios';
import './index.css'
import ell from './Ellipse.png'

const Styles = styled.button``


function App() {


  const [price, setPrice] = useState('1000000')
  const [cont, setCont] = useState('10')
  const [lising, setLising] = useState('1')
  const [first, setFirst] = useState(100000)
  const [pay, setPay] = useState(0)
  const [sum, setSum] = useState(0)
  const [disabled, setDisabled] = useState(false)

  const CarData : ICar = {
    price: 0,
    cont: 0,
    first: 0,
    lising: 0,
    sum: 0,
    pay: 0
  }

  useEffect(() => {
    let vzn = parseInt(price) * parseInt(cont) / 100
    setFirst(Math.round(vzn))
  }, [cont, price])

  useEffect(() => {
    const monthPay = (parseInt(price) - first) * ((0.035 * Math.pow((1 + 0.035), parseInt(lising))) / (Math.pow((1 + 0.035), parseInt(lising)) - 1))
    setPay(Math.round(monthPay))
  }, [first, lising])

  useEffect(() => {
    const summ = first + (parseInt(lising)*pay)
    setSum(Math.round(summ))
  }, [pay])

  function PriceHandler (event: any) {
    setPrice(event.target.value)
  }
  function onMoveHandler() {
    if (parseInt(price) < 1000000) {
      setPrice('1000000')
    }
    else if (parseInt(price) > 6000000) {
      setPrice('6000000')
    }
    if (parseInt(cont) < 10) {
      setCont('10')
    }
    else if (parseInt(cont) > 60) {
      setCont('60')
    }
    if (parseInt(lising) < 1) {
      setLising('1')
    }
    else if (parseInt(lising) > 60) {
      setLising('60')
    }
  }

  async function onClickHandler() {
    setDisabled(true)
    CarData.price = parseInt(price)
    CarData.cont = parseInt(cont)
    CarData.lising = parseInt(lising)
    CarData.first = first
    CarData.pay = pay
    CarData.sum = sum
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({CarData})
    };
    try {
      await axios.post('https://eoj3r7f3r4ef6v4.m.pipedream.net', requestOptions)
      setDisabled(false)
    } catch (error) {
      console.log(error)
      setDisabled(false)
    }
  }

  const btnClass = disabled? 'SubmitBtn BtnText DisabledBtn' : 'SubmitBtn BtnText'



  return (
    <div className="App">
      <div className='Container'>
       
        <h1 className='MainTitle'>Рассчитайте стоимость автомобиля в лизинг</h1>
        <div className='MainInputs'>
          <div className='TitleInput'>
            <p className='PTitle1'>Стоимость автомобиля</p>
            <div className='Input'>
              <input type='text' onChange={PriceHandler}  value={price} className='Var'></input>
              <h2 className='Var'>₽</h2>
            </div>
            <input className='InputLine' value={price} type="range" min={1000000} max={6000000}  onChange={event => setPrice(event.target.value)}/>
          </div>
          <div className='TitleInput'>
            <p className='PTitle1'>Первоначальный взнос</p>
            <div className='Input'>
              <h2 className='Var'>{first.toLocaleString()} ₽</h2>
              <div className='Persent'>
                <input  className='VarPer' value={cont} onChange={event => setCont(event.target.value)}></input>
                <p className='Persents'>%</p>
              </div>
            </div>
            <input className='InputLine' type="range" min={10} max={60} value ={cont} onChange={event => setCont(event.target.value)}/>
          </div>
          <div className='TitleInput'>
            <p className='PTitle1'>Срок лизинга</p>
            <div className='Input'>
              <input type='text' className='Var' value={lising.toLocaleString()} onChange={event => setLising(event.target.value)}></input>
              <h2 className='Var'>мес.</h2>
            </div>
            <input className='InputLine' type="range" min={1} max={60} value ={lising} onChange={event => setLising(event.target.value)}/>
          </div>
          
        </div>
        <div className='Results'>
          <div className='Result'>
            <p className='PTitle2'>Сумма договора лизинга</p>
            <h1 className='Rez'>{sum.toLocaleString()} ₽</h1>
          </div>
          <div className='Result'>
            <p className='PTitle2'>Ежемесячный платеж от</p>
            <h1 className='Rez'>{pay.toLocaleString()} ₽</h1>
          </div>
          <div className='Result RezBtn'>
              <button className={btnClass} id={'btnSub'} disabled={disabled} onMouseOver={onMoveHandler} onClick={onClickHandler}>{disabled?<img className='animate-spin' src={ell} alt="" />: 'Оставить заявку'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
