import React from 'react';
// accept selectedImg as prop by destructuring
const Modal = ({ selectedImg, setSelectedImg }) => {
  const handleClick = (e) => {
    // close modal when clicking only on backdrop
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };

  return (
    <div className="backdrop" onClick={handleClick}>
      <img src={selectedImg} alt="enlarged pic"></img>
    </div>
  );
};

export default Modal;
