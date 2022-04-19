import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { BACK_END_URL } from '../../constants/urls'
import { Listing } from '../../types/types'
import BedIcon from '@mui/icons-material/Bed';
import './Dashboard.css'
import { Typography } from '@mui/material'

export const Dashboard = () => {
    const [listings, setListings] = React.useState<Listing[]>([])

    React.useEffect(() => {
        const getListings = async () => {
            const res = await axios.get(`${BACK_END_URL}/listings`)
            setListings(res.data.listings)
        }
        getListings()
    }, [])

  return (
    <div className='dashboard-container'>

    
      <h1>My Listings</h1>
    <div className='listing-container'>
      {listings.map(listing => <div className='listing' key={listing.id}>
        
          <img className='property-img' src={listing.picture} />
          
          <div className='listing-content'>
            <Link to={`/calendar/${listing.id}`} >
              <Typography sx={{ fontSize: 24 }} color="text.secondary">
                {listing.title}
              </Typography>
            </Link>
            <div className='listing-content-bedroom'><BedIcon /> : {listing.beds}</div>
            </div>
          <div className='listing-score'>
            <Typography sx={{ fontSize: 36 }} color="text.secondary">{listing.health * 100}</Typography>
            <Typography sx={{ fontSize: 24 }} color="text.secondary">Health Score</Typography>
          </div>
      </div>)}
      </div>
      </div>
  )
}
