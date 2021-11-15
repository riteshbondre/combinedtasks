import React, { useState, useEffect } from "react";
import { base64StringToBlob } from "blob-util";
import { collection, addDoc } from "firebase/firestore";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";
const OfflineUploadForm = ({ setSelectedImg,finalImg, setFinalImg ,setUrl}) => {
  const [file, setFile] = useState(null);
 
  const [error, setError] = useState(null);
  const [img, setImg] = useState();
  
  

  const types = ["image/png", "image/jpeg"];
  const offlineStorage = projectFirestore.collection("images");
  const storageRef = projectStorage.ref("blob" + Math.floor(Date.now() / 1000));
  React.useEffect(() => {
    const storedImg = localStorage.getItem("storedImg")
      ? JSON.parse(localStorage.getItem("storedImg"))
      : [];

    if (img) {
      storedImg.push(img);
      localStorage.setItem("state", JSON.stringify(storedImg));
    }

    setFinalImg(storedImg);
  }, [img]);
  console.log(finalImg)
  
  var connected = navigator.onLine;
 
  const handleConnectionChange = async (event) => {
    // if (event.type == "offline") {
    //   console.log("You lost connection.");
    // }
    if (event.type == "online") {
      console.log("You are now back online.");
      
      for (var index = 0; index < finalImg.length; index++) {
        const trimmedBaseString = finalImg[index].split(",").pop();

        blob = base64StringToBlob(trimmedBaseString, "image/jpeg");
        console.log(blob);
        
        if (blob == null) return;
        storageRef.put(blob).then(
          // "state_changed",
          (snap) => {
            //   let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            //   setProgress(percentage);
            //   console.log(percentage);
            // },
            // (err) => {
            //   setError(err);
            // },
            // async () => {
            storageRef.getDownloadURL().then((url) => {
              const createdAt = timestamp();
              offlineStorage.add({ url, createdAt });
              setUrl(url);
            });
          }
        );
      }
      localStorage.removeItem("storedImg");
    }

    console.log(new Date(event.timeStamp));
  };
  window.removeEventListener("online", handleConnectionChange);
  window.addEventListener("online", handleConnectionChange);
  // console.log("img", img);
  const onImageUpload = async (e) => {
    const selected = e.target.files[0];
    const base64 = await convertBase64(selected);
    setImg(base64);
  };

  var blob = {};


  // const onUpload = async (e) => {
  //   e.preventDefault();
  //     for (var index = 0; index < finalImg.length; index++) {
  //       const trimmedBaseString = finalImg[index].split(",").pop();

  //       blob = base64StringToBlob(trimmedBaseString, "image/jpeg");
  //       console.log(blob);
        
  //       if (blob == null) return;
  //       storageRef.put(blob).then(
  //         // "state_changed",
  //         (snap) => {
  //           //   let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
  //           //   setProgress(percentage);
  //           //   console.log(percentage);
  //           // },
  //           // (err) => {
  //           //   setError(err);
  //           // },
  //           // async () => {
  //           storageRef.getDownloadURL().then((url) => {
  //             const createdAt = timestamp();
  //             offlineStorage.add({ url, createdAt });
  //             setUrl(url);
  //           });
  //         }
  //       );
  //     }
  //     localStorage.removeItem("storedImg");
  //   // await projectFirestore.addDoc(offlineStorage,{offImg:finalImg[index]})
  // };

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



  return (
    <div>
      <form>
        <label>
          <input type="file" onChange={onImageUpload} />
          <span>+</span>
        </label>
        {/* <button onClick={onUpload}>upload</button> */}
        <div className="output">
          {error && <div className="error">{error}</div>}
          {file && <div>{file.name}</div>}
          {/* {file && <OfflineProgressBar file={finalImg} setFile={setFinalImg} />} */}

          <div>
            <div className="img-grid">
              {finalImg &&
                finalImg.map((data) => (
                  <div
                    className="img-wrap"
                    layout
                    whileHover={{ opacity: 1 }}
                    onClick={() => setSelectedImg(data)}
                  >
                  </div>
                ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OfflineUploadForm;
