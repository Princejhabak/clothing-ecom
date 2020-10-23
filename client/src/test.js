import firebase from 'firebase/app'
import 'firebase/firestore'

const firestore=firebase.firestore

firestore.CollectionReference('users').doc('oQNZVfUIAb482HkIvfEk').collection('cartItems')
.doc('Jr2llWcCJxLScdiBxVuN')
