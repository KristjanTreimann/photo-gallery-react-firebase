// import react hooks
import { useState, useEffect } from 'react';
// import projectStorage
import { projectStorage } from '../firebase/config';

// takes in file we're uploading
const useStorage = (file) => {
  // progress of the upload
  const [progress, setProgress] = useState(0);
  // any errors from the upload
  const [error, setError] = useState(null);
  // url we get back from storage after the image has uploaded
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references where the file saves
    const storgeRef = projectStorage.ref(file.name); // sets file ref in default location with current file name

    // take a file and put it in the reference
    // .on whenever state on upload changes, then fire a function snapshot
    storgeRef.put(file).on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storgeRef.getDownloadURL();
        setUrl(url);
      }
    );
  }, [file]); // function inside every time dependancy([file]) changes. Every time we have a new file value the code inside useEffect runs

  return { progress, url, error };
};

export default useStorage;
