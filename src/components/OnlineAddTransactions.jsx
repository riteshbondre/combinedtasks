import React,{ useState } from "react";
import { useHistory } from "react-router-dom";
import { maxDate } from "../helper/dates";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";

const OnlineAddTransaction = () =>{
    const history = useHistory()
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("personal");
  const [amount, setAmount] = useState(0);
  const [finalImg, setFinalImg] = useState("");
  const [image, setImage] = useState("");
  const offlineStorage = projectFirestore.collection("transactions");
    const storageRef = projectStorage.ref(
      "blobtransaction" + Math.floor(Date.now() / 1000)
    );

    
    const onImageUpload = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleAddTransaction = (e) => {
        history.push("/history");
        e.preventDefault();
        console.log(text,name,amount,image,date)
    storageRef.put(image).then((snapshot) => {
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
    }

    return(
        <div className="add-transaction">
      <div className="row">
        <h3>Add new transaction</h3>
        <form>
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input
              type="text"
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
              onChange={(e) => setName(e.target.value)}
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
    )
}

export default OnlineAddTransaction