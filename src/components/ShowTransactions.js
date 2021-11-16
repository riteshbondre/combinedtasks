import React from 'react';
import useFirestore from '../hooks/useFirestore';

const ShowTransactions = () => {
  const { docs } = useFirestore('transactions');
//  console.log(docs)
  return (
    <div >
      {docs && docs.map(doc => (
       <div >
       <div >
         
         <h5>{doc.text}</h5>
         <h5>{doc.amount}</h5>
       </div>
 
       <img
         src={doc.imageUrl}
       />
 
       {/* {header--avatar and username}
             {posts}
             {pictures}
             {username + caption} */}
       <h6>
         {doc.name}
       </h6>
       <h6>
         {doc.date}
       </h6>
     </div>
      ))}
    </div>
  )
}

export default ShowTransactions;