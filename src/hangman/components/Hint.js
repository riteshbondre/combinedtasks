// import React, { useState } from "react";

// const Hint = ({
//   selectedWord,
//   setDisableButton,
//   disableButton,
//   correctLetters,
//   setShowHint,
//   showHint,
//   score,
//   hintCount,
//   wrongLetters,
//   setHintCount,
// }) => {
//   const hint = selectedWord[Math.floor(Math.random() * selectedWord.length)];
//   // for (var i = 1; i < 100; i++) {

//   //   if (i % 2 === 0) v = i;
//   //   c = v / 2;
//   // shift the whole logic in app component with disable button and hint count

//   // }

//   function handleClick() {
//     setHintCount(0);
//     setShowHint(hint);
//     setDisableButton(true);
//   }

//   return (
//     <div className="hint-container">
//       <button
//         className="hint-btn"
//         // ref={btnRef}
//         onClick={() => handleClick()}
//         disabled={disableButton}
//       >
//         Hint :{hintCount}
//       </button>
//       {showHint}
//     </div>
//   );
// };

// export default Hint;
