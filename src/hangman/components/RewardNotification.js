import React from "react";

const RewardNotification = ({ showNotification,score }) => {
  return (
    <div className={`notification-container ${showNotification ? "show" : ""}`}>
      <p>rewards added..... you won rs..938403</p>
      
     
    </div>
  );
};

export default RewardNotification;