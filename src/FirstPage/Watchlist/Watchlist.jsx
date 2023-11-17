// WatchList.jsx
import React, { useEffect, useState } from "react";
import { openWatchList, removeData } from "../../assets/Loginpage/Firebase";

const WatchList = ({userUid}) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    openWatchList(setWatchlist, userUid);
  }, [userUid]);

  const handleRemoveItem = (itemId) => {
    if (itemId) {
      removeData(itemId, userUid);
    } else {
      console.error("Invalid itemId. Unable to remove item.");
    }
  };

  return (
    <div>
      <h1>WatchList</h1>
      {watchlist.length > 0 ? (
        <ul>
          {watchlist.map((item) => (
            <li key={item.itemId}>
              {item.movie_title} {" "}
              <button onClick={() => handleRemoveItem(item.itemId)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your watchlist is empty.</p>
      )}
    </div>
  );
};

export default WatchList;
