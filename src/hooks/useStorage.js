// import react hooks
import { useState, useEffect } from 'react';
// import projectStorage, projectFirestore - for images
import { projectStorage, projectFirestore, timeStamp } from '../firebase/config';

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
    const storageRef = projectStorage.ref(file.name); // sets file ref in default location with current file name

    // reference to a collection where we want to save document
    const collectionRef = projectFirestore.collection('images');
    // take a file and put it in the reference
    // .on whenever state on upload changes, then fire a function snapshot
    storageRef.put(file).on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        // generate timestamp
        const createdAt = timeStamp();
        // add url to collection {url:url} same as {url}
        collectionRef.add({ url, createdAt });
        setUrl(url);
      }
    );
  }, [file]); // function inside every time dependancy([file]) changes. Every time we have a new file value the code inside useEffect runs

  return { progress, url, error };
};

export default useStorage;
