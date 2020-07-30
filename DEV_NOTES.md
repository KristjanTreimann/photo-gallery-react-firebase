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
