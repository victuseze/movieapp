import React from 'react'
import './moviesdetails.css'

const Moviedetails = ({data}) => {


  return (
    <div className='details'>
        <div className="full_details">
            <p><span>Movie Overview:</span> {data.overview}</p>
            <p><span>Movie Language:</span> {data.original_language === "en" ? "English" : null}</p>
            <p><span>Movie Release Date:</span> {data.release_date}</p>
            <p><span>Adult Content:</span> {data.adult === false ? 'No' : "Yes"}</p>
            <p><span>Movie Vote:</span> {data.vote_average.toFixed(2)}</p>
        </div>
    </div>
  )
}

export default Moviedetails