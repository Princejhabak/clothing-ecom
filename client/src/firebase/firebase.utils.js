import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config={
    apiKey: "AIzaSyB-RTe-qdkDXKBT4uHSeQYPKVvYVjW2DxU",
    authDomain: "crwn-db-78f14.firebaseapp.com",
    databaseURL: "https://crwn-db-78f14.firebaseio.com",
    projectId: "crwn-db-78f14",
    storageBucket: "crwn-db-78f14.appspot.com",
    messagingSenderId: "532466294367",
    appId: "1:532466294367:web:d2f28c71535f8f1760c5ea",
    measurementId: "G-TEE9M5QQN1"
  };

  export const  createUserProfileDocument= async (userAuth, additionalData) =>{
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const Snapshot= await userRef.get()
    console.log(Snapshot)
    if(!Snapshot.exists) {
      const {displayName, email} = userAuth
      const createdAt= new Date()

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }
      catch(error){
        console.log('error creating user', error.message)
      }
    }
    return userRef

  }

  firebase.initializeApp(config)


  // export const addCollectionAndDocuments = async(collectionKey,objectsToAdd)=>{

  //   const collectionRef=firestore.collection(collectionKey)
  //   const batch=firestore.batch()

  //   objectsToAdd.forEach(obj => {
  //     const newDocRef= collectionRef.doc()
  //     console.log(newDocRef)
  //     batch.set(newDocRef,obj)

  //   });
  //   return await batch.commit()

  // }



export const getCurrentUser =()=>{
  return new Promise((resolve,reject)=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth=>{
      unsubscribe()
      resolve(userAuth)
    },reject)
  })
}




export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};








  export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
  ) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });

    return await batch.commit();
  };







  export const auth=firebase.auth()
  export const firestore=firebase.firestore()

  export const googleProvider= new firebase.auth.GoogleAuthProvider()
  googleProvider.setCustomParameters({prompt:'select_account'})
  export const SignInWithGoogle=()=>auth.signInWithPopup(googleProvider)

  export default firebase
