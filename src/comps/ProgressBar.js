import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';
import { motion } from 'framer-motion';

const ProgressBar = ({ file, setFile }) => {
  // use useStorage hook and pass in a file and destructure to get url & progress
  const { url, progress } = useStorage(file); // url & progress is received from the useStorage hook, because we used return in useStorage
  // hide progress bar after file has uploaded
  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]); // add setFile as dependancy when used in function

  return <motion.div className="progress-bar" initial={{ width: 0 }} animate={{ width: progress + '%' }}></motion.div>;
};

export default ProgressBar;
