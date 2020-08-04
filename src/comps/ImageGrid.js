import React from 'react';
import useFirestore from '../hooks/useFirestore';

const ImageGrid = () => {
  // { docs } - use destructuring to get docs
  // 'images' - collection name we want to listen to in useFirestore hook
  const { docs } = useFirestore('images');

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <div className="img-wrap" key={doc.id}>
            <img src={doc.url} alt="uploaded pic" />
          </div>
        ))}
    </div>
  );
};

export default ImageGrid;
