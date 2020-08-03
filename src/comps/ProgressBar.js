import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';

const ProgressBar = ({ file, setFile }) => {
  // use useStorage hook and pass in a file and destructure to get url & progress
  const { url, progress } = useStorage(file); // url & progress is received from the useStorage hook, because we used return in useStorage
  // hide progress bar after file has uploaded
  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]); // add setFile as dependancy when used in function

  return <div className="progress-bar" style={{ width: progress + '%' }}></div>;
};

export default ProgressBar;
