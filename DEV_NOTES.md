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
