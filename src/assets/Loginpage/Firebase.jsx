import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, onValue, remove, child} from "firebase/database";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB9kc-ays0zKWkNnhKDGIJ4WLVwmnDWli0",
  authDomain: "movieapp-b9daf.firebaseapp.com",
  projectId: "movieapp-b9daf",
  storageBucket: "movieapp-b9daf.appspot.com",
  messagingSenderId: "1026499204880",
  appId: "1:1026499204880:web:508ae5495d44db0fef7795",
  databaseURL: "https://movieapp-b9daf-default-rtdb.firebaseio.com/",
};

const application = initializeApp(firebaseConfig);
const dataBase = getDatabase(application);


let itemId

const handleNotification = (type, message) => {
  toast[type](message);
};


export const addToWatchList = (title, userUid) => {
  const watchListRef = ref(dataBase, `watchlist/${userUid}`)
  const newItemRef = push(watchListRef, {
    movie_title: title,
  });

  let itemId = newItemRef.key;

  console.log(itemId);
  console.log(title);
  console.log("Added To DataBase!");

  handleNotification("success", `${title}, Added to Watchlist!`);

  return itemId;
};


export const openWatchList = (setWatchlist, userUid) => {
  const watchListRef = ref(dataBase, `watchlist/${userUid}`)
  onValue(watchListRef, (snapshot) => {
    const watchListData = snapshot.val();
    console.log("Watchlist Data:", watchListData)
    if (watchListData) {
      const watchlistArray = Object.entries(watchListData).map(([itemId, item]) => ({
        itemId,
        ...item,
      }));
      console.log("Watchlist Array:", watchlistArray);
      setWatchlist(watchlistArray);
    }
  });
};


export const removeData = (itemId, userUid) => {
  const watchListRef = ref(dataBase, `watchlist/${userUid}`)
  const itemRef = child(watchListRef, itemId);
  remove(itemRef)
    .then(() => {
      console.log('Item removed successfully');
    })
    .catch((error) => {
      console.error('Error removing item:', error);
    });
};


export const getGlobalItemId = () => {
  return itemId;
};

// Initialize Firebase
export const app = application;
export const auth = getAuth(app);
export const database = dataBase;

