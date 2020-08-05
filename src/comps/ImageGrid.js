import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';

// accepts a setSelectedImg prop from App.js
const ImageGrid = ({ setSelectedImg }) => {
  // { docs } - use destructuring to get docs
  // 'images' - collection name we want to listen to in useFirestore hook
  const { docs } = useFirestore('images');

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <motion.div
            className="img-wrap"
            key={doc.id}
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => setSelectedImg(doc.url)}
          >
            <motion.img
              src={doc.url}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              alt="uploaded pic"
            />
          </motion.div>
        ))}
    </div>
  );
};

export default ImageGrid;
