import React, { useState } from 'react';
import './Searched.css';
import { baseUrl } from '../Api';
import Moviedetails from '../Moviedetails/Moviedetails';

const Searched = ({ data }) => {
  const [details, setDetails] = useState(false);

  const toggleButton = () => {
    setDetails(!details);
  };

  return (
    <div className='searched-cards'>
      <div className='card-titles'>
        <img src={`${baseUrl}${data.poster_path}`} alt="" />
        <p>{data.original_title}</p>
        <div className='btn'>
          <button className='watchlist'>Add To Watchlist</button>
          <button className='details' onClick={toggleButton}>
            Movie Details
          </button>
        </div>
      </div>
      {details && <Moviedetails data={data} />}
    </div>
  );
};

export default Searched;
