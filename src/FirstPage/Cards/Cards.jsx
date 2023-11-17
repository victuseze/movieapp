import React, { useEffect, useState } from 'react';
import './cards.css';
import { url, option, baseUrl } from '../Api';
import { addToWatchList, database } from '../../assets/Loginpage/Firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cards = ({userUid}) => {
  const [data, setData] = useState(null);
  const [openCards, setOpenCards] = useState([]);

  const toggleValue = (index) => {
    setOpenCards(prevOpenCards => prevOpenCards.includes(index)
      ? prevOpenCards.filter(cardIndex => cardIndex !== index)
      : [...prevOpenCards, index]
    );
  };

  useEffect(() => {
    fetch(url, option)
      .then(response => response.json())
      .then(res => {
        setData(res.results);
        console.log(res);
      })
      .catch(err => console.error(err));
  }, []);


  return (
    <div className="car">
      <div className='cards'>
        {data && data.map((el, index) => {
          return (
            <div className='card-tiles' key={index}>
              <img src={`${baseUrl}${el.poster_path}`} alt="Movie Images" />
              <p>{el.original_title}</p>
              <button className='watchList' onClick={() => addToWatchList(el.original_title, userUid)}>Add To WatchList</button>
              {/* <button className='watchList' onClick={() => addToWatchList(el.original_title, el.re)}>Add To WatchList</button> */}
              <button className='details' onClick={() => toggleValue(index)}>Movie Details</button>
              {openCards.includes(index) && 
                <div>
                  <p>Movie: {el.release_date}</p>
                  <p><span>Movie Language:</span> {el.original_language === "en" ? "English" : "Not English"}</p>
                  <p>Movie Overview: {el.overview}</p>
                </div>
              }
              <ToastContainer />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
