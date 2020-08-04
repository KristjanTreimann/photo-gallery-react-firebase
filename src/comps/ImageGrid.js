import React from 'react';
import useFirestore from '../hooks/useFirestore';

// accepts a setSelectedImg prop from App.js
const ImageGrid = ({ setSelectedImg }) => {
  // { docs } - use destructuring to get docs
  // 'images' - collection name we want to listen to in useFirestore hook
  const { docs } = useFirestore('images');

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <div className="img-wrap" key={doc.id} onClick={() => setSelectedImg(doc.url)}>
            <img src={doc.url} alt="uploaded pic" />
          </div>
        ))}
    </div>
  );
};

export default ImageGrid;
