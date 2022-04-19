import React from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import { BACK_END_URL } from '../../constants/urls'
import CalendarComponent from 'react-calendar'
import { Days } from '../../types/types'
import { formatDate } from '../../utils/utils'
import { TileContent } from './TileContent'
import {debounce} from 'lodash'
import './Calendar.css'

export const Calendar = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [dates, setDates] = React.useState<Days[]>([])
  const [basePrice, setBasePrice] = React.useState(0)

  React.useEffect(() => {
    const getCalendly = async () => {
      const res = await axios.get(`${BACK_END_URL}/calendar/${id}`)
      setDates(res.data.days)
      setBasePrice(res.data.basePrice)
    }
    getCalendly()
  }, [])

  const updateBasePriceAPI = React.useCallback(debounce(async (value) => {
    const price = parseInt(value)
    setBasePrice(price)
    const res = await axios.post(`${BACK_END_URL}/calendar/${id}`, {basePrice: price})
    console.log(res.data)
  }, 1000), [])

  const changeBasePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBasePriceAPI(e.target.value)
  }

  return (
    <div className='calendly-container'>
      <div>
        <button className='back-button' onClick={() => navigate('/')}>Back</button>
        </div>
        <div className='update-base-price'>
          <label>Update Base Price</label>
          <input onChange={changeBasePrice} className='base-price-input' type='text' />
        </div>
        <div className='caldenly'>
          <CalendarComponent minDate={new Date()} selectRange={true} onChange={(val: Date) => {
          }} tileDisabled={({date }) => {
          const fullDate = formatDate(date)
          return dates.some(date => date.isBlocked && date.date === fullDate )
        }} tileContent={({date}) => {
          const fullDate = formatDate(date)
          const propertyDate = dates.find(date => date.date === fullDate )
          return <TileContent fullDate={fullDate} basePrice={basePrice} date={propertyDate} />
        }}  />
        </div>
      
      </div>
  )
}
