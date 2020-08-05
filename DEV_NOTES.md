# Photo gallery app using React & Firebase

1. Create React app using `npx create-react-app photo-gallery-react-firebase`
2. Add Firebase using `npm i firebase`
3. Add a folder to **src** named _comps_ to store components
4. Create custom component for title

## About structure

1. _src_/**index.js** - kickstarts the react application
2. _src_/**App.js** - root component
3. _src_/**index.css** - all the styling is kept

## Firebase setup

1. Create new project in <https://firebase.google.com>
2. Add Firebase to your web app. Click icon `</>` and name it.
3. Get your web app's Firebase configuration inside the `<script>var firebaseConfig...</script>` tags
4. Create new folder in _src_/_firebase_ and add new file inside **config.js**. Paste configuration there.
5. Import firebase into **config.js** -> `import * as firebase from 'firebase/app'`
6. `import 'firebase/storage';` -> for storing images
7. `import 'firebase/firestore';` -> for database
8. Initialize storage and firestore.
9. Export services to use in other components `export { projectStorage, projectFirestore }`
10. Set up firebase database in firebase -> Database -> Create database -> Start in test mode
11. Start storage service in firebase -> Storage -> Get Started. Change storage rules so we can easily upload images without authentication. Remove `:if request.auth != null` from rules.

## Upload form

1. New file in _comps_/UploadForm.js
2. Create react component including form and export it.
3. Import UploadForm in App.js.
4. Add onChange handler to input in UploadForm.js to react Choose File button. Use the useState hook to store file in local state.
5. Create error and typecheck. If image uploads show image name, else show error.

## Firebase Storage

To communicate with firebase storage we need to use firebase storage sdk.  
Create a custom hook to handle fire upload and firebase storage.  
Hook in the react is just a way to create a small chunk of reusable code and then those hooks can be used in whatever components need them.
New folder in src/_hooks_ and inside **useStorage.js**

## Progress Bar

1. Create new component for progress bar in _comps_/**ProgressBar.js**
2. Nest it inside `div` with `{file && <ProgressBar />}` in **UploadForm.js**. -> If file selected output progressbar. Right side of && is only executed if left side is true.
3. Pass file to the ProgressBar because we're using useStorage hook inside that component. To do that add prop `file={file}`. Also pass the prop `setFile={setFile}` function so that when the progress is complete we can set file back to null and then the progress bar doesnt show again.
4. Inside ProgressBar we need to use the `useStorage` hook to upload a file. First we need the props we passed into the progress bar and use destructuring to get url and progress.
5. In **ProgressBar.js** we want to get url and process values using destructuring we set it equal to useStorage hook and pass in file, then in **useStorage.js** useStorage function fires useEffect hook which takes the file, creates a reference and tries to upload a file. At that time we get values back like progress and when upload finishes we get url where the image was stored. console.log(url, process) and try to upload a file to see if it shows up in Chrome console.
6. In Firebase check storage to see if image you uploaded exists.
7. Now in **Progress.js** we want to use the `progress` value to create a ProgressBar. Percentage value of progress could indicate the width of the progressbar. Use inline styling to set width equal to progress value -> `<div className="progress-bar" style={{ width: progress + '%' }}>`
8. Add styling to progress bar in **index.css**
9. Remove progress bar after file has uploaded. Set the value of file back to null when we have an url. Url is received after the file has uploaded. Use useEffect to fire a function when url value changes and set file value to null.

## Store image url to a database collection

Currently we have a functionality to store our images to database, but now we want cycle through of these images and show them on the screen.  
To do that we need to store url we got from uploading the image inside a database.

1. Since we are interacting with the `firestore database` we need to import it from the _firebase_/**config.js** into **useStorage.js**.
2. Create new referance -> `const collectionRef = projectFirestore.collection('images');`-> projectFirestore - which we use when we want to interact with firebase database, -> collection('name') is a built in method to reference to a specific collection. Takes in collection name as argument. In firebase if collection doesnt exist it gets created when we save document to it.
3. In useEffect hook use `collectionRef.add({})` and pass in an object which represents this document. {url : url} -> first prop. is url and we set it to url we got `const url = await storageRef.getDownloadURL();` . We can shorten {url : url} to {url}. Next we want to add a `{createdAt}´ which is basically a timestamp when the document was created so in later we can order the documents by these timestamps and show them chronologically on the screen.
4. We need to create a timestamp. Best way to do that with firebase is to create a `firebase server timestamp` inside _firebase_/**config.js** -> add `const timeStamp = firebase.firestore.FieldValue.serverTimestamp;` . Export timestamp function and import to **useStorage.js**. Set const createdAt to timeStamp function and invoke it. `const createdAt = timeStamp()`
5. Now check from `Firebase`if database collection images was created with document inside containing fields like **createdAt:** and **url:**
6. Delete any image uploaded to storage, because they dont have the documents associated with them inside the firestore.
7. Upload new image and check from firebase if its a) available in storage b) in database has a document inside images collection.

Read more from Firestore [docs](https://firebase.google.com/docs/firestore)!

## Firestore hook && image grid

Now we want to set up a connection between our application and firestore, so we can actively listen for documents being added into collection. Then we can retrieve these documents, cycle through them in a react component and output an image for each one of them using url propery stored in firebase. Also order them by date by using createdAt property.

1. Create a component to cycle through firebase collection 'images' documents and output each image using url. Create new ImageGrid component in _comps_/**ImageGrid.js** and import it to **App.js**.
2. To get url from documents we create a new hook. In _hooks_ add new file called **useFirestore.js** and create hook inside. We set `projectFirestore.collection.....` equal to const unsub and then invoke it with `return () => unsub()` to stop listening collection changes.
   We want to do that if we unmount the ImageGrid component which is what is going to be using this hook to get the data. Because if we're not showing that component, if it unmounts then we dont need those images anymore.
3. Use the hook in **ImageGrid.js**. Use destructuring to get the docs and pass in collection name to useFirestore().Check with console.log(docs) if it shows up in console.
4. Display images - { docs - to see if docs exists, docs.map() - cycle through}
5. Add styling to images.

## Creating a modal

Make a modal so that when clicked on image it opens up in full size.

1. New component in _comps_/**Modal.js**
2. Modal img takes in src of any image we click on website
3. Create a state inside of root component and pass function _setSelectedImg_ down to ImageGrid as a prop.  
   Accept that prop in **ImageGrid.js** using destructuring in `const ImageGrid = ({ setSelectedImg })`.  
   Attach a click event to `<div className="img-wrap" key={doc.id}>` because we output this div for each individual image.  
   Use `onClick={() => setSelectedImg(doc.url)` -> onClick is equal to a function that invokes setSelectedImage() and pass in a value into this and this value becomes selectedImg state value in **App.js**.  
   We want to pass through URL of the image we want to show. At the moment this comes from `<img src={doc.url} alt="uploaded pic" />` as `doc.url`. So now whenever we click on image we're updating the value in selectedImg in **App.js** with url of this image we clicked on.
4. Pass selectedImg from **App.js** to `<Modal selectedImg={selectedImg}/>` as prop and accept it as prop by destructuring in **Modal.js**. Now the image src={selectedImg}. When clicking on picture it should show up in screen as extra image below.
5. Add modal styling in **index.css**. We create style for backdrop so the image will be highlighted and background will be faded a bit.
6. We also need to add a check in **App.js** to see if image has been loaded and then we can show the modal properly, otherwise it may not work because it thinks selectedImg value is null after refresh. To do that add a condition for modal -> `{selectedImg && <Modal selectedImg={selectedImg} />}`
7. To close the modal we need to add a click event handler to backdrop, meaning when we click on backdrop it closes the modal. We need to use setSelectedImg method and set it to null again. That way modal will close because we show it only when image value exists. In **App.js** pass in prop setSelectedImg to ´<Modal />´ and accept it in **Modal.js**. Then in **Modal.js** add event listener and set it equal to a function called handleClick -> `onClick={handleClick}`. Create function handleClick what takes in the event object and inside that use function setSelectedImage and set it to null -> `const handleClick = (e) => { setSelectedImg(null); };`
8. We need to check event target object because we dont want to close model when clicking on a picture. Use `e.target.classList.contains('backdrop')` to select correct div on which clicking closes model.

## Adding animations - framer motion

We're using animation package for react - [Framer Motion](https://framer.com/motion)

1. Install using `npm install framer-motion`
2. To use motion on react elements we have to import it and use `motion.` before tag name. For example if we want to add motion to div element we add `<motion.div> </motion.div>`
3. Let's add motion to images. In **ImageGrid.js** we select corresponding div element and add .motion to it. Now we can add motion attributes to that element. We use `whileHover` attribute and set that equal to an object and inside object we can specify some css style attributes. `layout` - whenever the motion element moves position in the page it animates to the new position. When we add new image all other images have to rearrange and move on page - `layout` attr gives animation to that.
4. Add .motion to img so when adding new images they fade in slightly `<motion.img src={doc.url} initial={{ opacity: 0}} animate={{opacity: 1}} transition={{ delay: 1 }} alt="uploaded pic" />` -> initial opacity is 0, then it animates to 1 and animation starts after 1s.
5. Add .motion animation to progress bar in **ProgressBar.js** to make it smoother.
6. Add .motion to modal in **Modal.js** for backdrop change opacity smoothly and for image pop down from the top. Use viewport height to do so.
