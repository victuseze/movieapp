import Cards from '../Cards/Cards'
import './body.css'

const Body = ({userUid}) => {

  return (
    <div className='entity'>
        <h2>Trending Movie</h2>
        <div className="card-tiles">
          <Cards userUid={userUid}/>
        </div>
    </div>
  )
}

export default Body
