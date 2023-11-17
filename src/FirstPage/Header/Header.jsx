import React, { useState } from 'react'
import {url, option} from '../Api'
import './header.css'
import Search from '../Search/Search'
import Searched from '../Searched/Searched'
import WatchList from '../Watchlist/Watchlist'
import Welcome from '../../assets/Loginpage/Welcomepage/Welcome'


const Header = ({username, userUid}) => {

  const [display, setDisplay] = useState(null)
  const [showWatchList, setShowWatchList] = useState('')

  const changeSearch = (searching) => {
    console.log(searching)
    fetch(url, option)
    .then(response => response.json())
    .then(res => {
        const matchData = res.results.find((data) => {
          return data.original_title === searching.label
        })
        if(matchData){
          setDisplay({original_title: searching.label, ...matchData})
        }
    })
    .catch(err => console.error(err));
  }
  console.log(username)

  const clickWatchList = () => {
    setShowWatchList(!showWatchList)
  }

  return (
    <div className='head'>
        <div className='background'>
          <div className="top">
            <div className="movie">
              <p>Movie Box</p>
            </div>
            <div className="search">
              <Search onSearchChange={changeSearch} />
            </div>
            <div className="signIn">
              <p>{`Hi, ${username}`}  <i className="fa fa-user-circle" aria-hidden="true"></i></p>
              <button className='list' onClick={clickWatchList}>Your WatchList <i className="fa fa-archive" aria-hidden="true"></i></button>
            </div>
          </div>
          <div className="mid">
            <h1>John Wick 3:</h1>
            <h1>Parabellum</h1>
            <p>
              John Wick is on the run after killing a member <br /> of the international assassins' guild,  <br /> and with a $14 million price tag on his head, <br /> he is the target of hit men and women everywhere.
            </p>
            <button> <a href="https://www.youtube.com/watch?v=M7XM597XO94" target='_blank'>Watch Trailer</a></button>
          </div>
          <div className="mid2">
            <h1>Viking:</h1>
            <p>Viking Prince Einar (Kirk Douglas) doesn't know it, <br /> but his most fearsome enemy, the slave Eric (Tony Curtis), <br /> is actually his half brother...</p>
            <button> <a href="https://www.youtube.com/watch?v=Yi4YnwFT7Gk">Watch Trailer</a> </button>
          </div>
        </div>
        {showWatchList && (
          <div className='modal'>
            <div className='modal-content'>
              <span className='close' onClick={() => setShowWatchList(false)}>
                &times;
              </span>
              <WatchList userUid={userUid}/>
            </div>
          </div>
        )}
        {display && <Searched data={display}/>}
    </div>
  )
}

export default Header