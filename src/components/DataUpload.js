import React,{ useState } from 'react'
// import { Button } from "@material-ui/core";
import {
    projectStorage,
    projectFirestore,
    timestamp,
  } from "../firebase/config";
import firebase from 'firebase';
// import './imageUpload.css';


function ImageUpload() {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const offlineStorage = projectFirestore.collection("transactions");
    const storageRef = projectStorage.ref(
      "blobtransaction" + Math.floor(Date.now() / 1000)
    );
  

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
    storageRef.put(image).then((snapshot) => {
        storageRef
        // .child(image.name)
        .getDownloadURL()
        .then (url => {
            offlineStorage.add({
                timestamp: timestamp(),
                caption : caption,
                imageUrl : url,
            })
        
        setCaption("");
        setImage(null);
            
    })
    },
    (error) => {
        console.log(error);
        alert(error.message);
    },)   
    }


    return (
        <div className="imageupload" >
            
            <input type="text" placeholder="Enter caption" onChange={event => setCaption(event.target.value)} value={caption} />
            <input type="file" onChange={handleChange} />
            
            <button onClick={handleUpload}> Upload</button>
            
        </div>
    )
}

export default ImageUpload
