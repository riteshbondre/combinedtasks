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
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const offlineStorage = projectFirestore.collection("transactions");
  const storageRef = projectStorage.ref(
    "blobtransaction" + Math.floor(Date.now() / 1000)
  );
  const types = ["image/png", "image/jpeg"];

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
    if (e.target.files.length > 0) {
      const selected = e.target.files[0];

      // setImage(base64);
      if (selected && types.includes(selected.type)) {
        const base64 = await convertBase64(selected);
        setImage(base64);
        setError("");
      } else {
        setImage(null);
        setError("Please select an image file (png or jpg)");
      }
    }
  };
  //Adding New transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();

    // history.push("/history");
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

  return (
    <div className="add-transaction">
      <div className="row">
        <h3>Add new transaction</h3>
        <form>
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input
              required
              type="text"
              ref={input}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
            />
          </div>
          <div className="form-control">
            <label htmlFor="date">Date</label>
            <input
              required
              type="date"
              value={date}
              max={maxDate}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Select Date"
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
              required
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">
              Picture
              <br />
            </label>
            <input type="file" onChange={onImageUpload} />
            {error && <div className="error">{error}</div>}
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
