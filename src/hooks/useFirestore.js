import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

// Create hook - function that takes in collection we want documents from
// In our case its images collection
const useFirestore = (collection) => {
  // Set up state for documents we receve from collection
  // setDocs is a function to update the documents
  // useState([empty array - because no documents to begin with])
  const [docs, setDocs] = useState([]);

  // communicate with database to get documents
  /* all our db communication goes inside useEffect hook, so that 
  it can rerun whenever collection changes */
  // inside useEffect hook pass in callback fn which fires whenever dependencies change
  useEffect(() => {
    // 	use projectFirestore in order to reach into a collection and then listen for the documents inside that collection
    // .collection() to get the collection
    // .onSnapshot() method fires callback fn every time a change occurs inside this collection and also fires once initially
    // It takes in a snapshoh object what represents a snapshot at that moment in time of database collection
    // essentially we're listening real time data updates thanks to snapshot
    // every time new image is added to the db then we're notified of that by this snapshot
    const unsub = projectFirestore // add const unsub to when we no longer want to be  listening that collection to retreive documents we can easily unsubscribe using unsub()
      .collection(collection)
      // order documents in collection before we retreive them. .orderBy(property_used_for_order)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        // create an array of documents which will eventually return
        let documents = [];
        // cycle through the docs currently in db collection at that moment in time we get that snapshot
        snap.forEach((doc) => {
          // push data from documents into this array
          // .data() - gets data, .id - gets id from docs, ...doc.data() - gets all the properties from the data(url and createdAt) and spreads them inside this object {}
          documents.push({ ...doc.data(), id: doc.id });
        });
        // update the docs(line 10) according to documents array (line 25)
        setDocs(documents);
      });

    // return a cleanup function which is going to invoke unsub() method -> unsubscribe from the collection when we're no longer use it
    return () => unsub();
  }, [collection]); // [collection] - dependancy

  // return docs once we have them
  return { docs };
};

export default useFirestore;
