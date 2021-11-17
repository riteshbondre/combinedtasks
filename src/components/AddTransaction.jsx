import React, { useState, useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useHistory } from "react-router-dom";
import { maxDate } from "../helper/dates";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";
import ImageUpload from "./DataUpload";
import { base64StringToBlob } from "blob-util";
var blob = {};
const AddTransaction = () => {
  const history = useHistory();
  const input = useRef();
  const { addTransaction, transactions } = useContext(GlobalContext);
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [name, setCategory] = useState("personal");
  const [amount, setAmount] = useState(0);
  const [finalImg, setFinalImg] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(null);
  const offlineStorage = projectFirestore.collection("transactions");
  const storageRef = projectStorage.ref(
    "blobtransaction" + Math.floor(Date.now() / 1000)
  );

  const offlinetranscations = transactions
  console.log(offlinetranscations)
  
  const convertBase64 = (selected) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selected);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onImageUpload = async (e) => {
    const selected = e.target.files[0];
    const base64 = await convertBase64(selected);

    setImage(base64);
  };
  //Adding New transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();
    
    history.push("/history");
    const newTranscation = {
      id: Math.floor(Math.random() * 1000000),
      text,
      name,
      amount: +amount,
      date,
      image,
    };
    addTransaction(newTranscation);
    setAmount(0);
    setText("");
    setDate("");
    setFinalImg("");
    
  };

  const extractArray = (arr) => {
    for (var index = 0; index < arr.length; index++) {
      const trimmedBaseString = arr[index].image.split(",").pop();
      blob = base64StringToBlob(trimmedBaseString, "image/jpeg");
      console.log(blob);
      setImage(blob);
  }
}

  const handleConnectionChange = async (event) => {
    if (event.type == "online") {
      console.log("You are now back online.");
      // console.log(transactions.length);
     
      extractArray(offlinetranscations)
        storageRef.put(blob).then((snapshot) => {
          storageRef
          // .child(image.name)
          .getDownloadURL()
          .then (url => {
              offlineStorage.add({
                  timestamp: timestamp(),
                  text,
                  name,
                  amount: +amount,
                  date,
                  imageUrl : url,
              })
             
          
         
          setImage("");
          setAmount(0);
      setText("");
      setDate("");
      })
      },
      (error) => {
          console.log(error);
          alert(error.message);
      },)   
      
      // if(index === transactions.length){
      //   localStorage.removeItem("state");
      // }

        // storageRef.put(blob)
        // .then((snap) => {
        //   storageRef.getDownloadURL().then((url) => {
        //     const createdAt = timestamp();
        //     offlineStorage.add({
        //       timestamp: createdAt,
        //       text: text,
        //       imageUrl: url,
        //       name: name,
        //       amount: amount,
        //       date: date,
        //     });
        //     if(index === transactions.length-1){
        //       localStorage.removeItem("state");
        //     }
        //     setUrl(url);
        //     setAmount(0);
        //     setText("");
        //     setCategory("");
        //     setImage(null);
        //     setDate("");
        //   });
        // })
          
        
        // offlineStorage.add({
        //     name: name, text:text,
        //     amount: amount,
        //     date:date,
        //     image:image });

        // if (blob == null) return;
        // offlineStorage.push(transactions[index]);
        // storageRef.put(transactions[index]).then(

        //   (snap) => {
        //     console.log(transactions[index])
        //     storageRef.getDownloadURL().then((url) => {
        //       const createdAt = timestamp();
        //       offlineStorage.add({ id:  Math.floor(Math.random() * 1000000),
        //         name: name, createdAt,text,
        //         amount: amount,
        //         date:date,
        //         image:url });
        //       setUrl(url);
        //     });
        //   }
        // );
     

       localStorage.removeItem("state");
    }

    console.log(new Date(event.timeStamp));
  };
  window.removeEventListener("online", handleConnectionChange);
  window.addEventListener("online", handleConnectionChange);

  return (
    <div className="add-transaction">
      <div className="row">
        <h3>Add new transaction</h3>
        <form>
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input
              type="text"
              ref={input}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              value={date}
              max={maxDate}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Select Date"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              value={name}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
            >
              <option value="personal">Personal</option>
              <option value="travel">Travel</option>
              <option value="essential">Essential</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="amount">
              Amount <br />
              (negative - expense, positive - income)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">
              Picture
              <br />
            </label>
            <input type="file" onChange={onImageUpload} />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              onClick={handleAddTransaction}
              className="btn"
            >
              Add transaction
            </button>
          </div>
        </form>
      </div>
    </div>
    
  );
};

export default AddTransaction;
