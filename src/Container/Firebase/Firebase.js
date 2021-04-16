import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const config = {
    apiKey: "AIzaSyDJggNj9w-viyl-3U3jGjNYWf3UodTCT5U",
    authDomain: "sign-in-with-7987d.firebaseapp.com",
    projectId: "sign-in-with-7987d",
    storageBucket: "sign-in-with-7987d.appspot.com",
    messagingSenderId: "137174857670",
    appId: "1:137174857670:web:87023bceec574a822964c7",
    measurementId: "G-7RWBF7H0S3"
};


firebase.initializeApp(config)
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};
export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({ prompt: "select_account" })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase