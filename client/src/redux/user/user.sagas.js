import { takeLatest,put,all,call } from "redux-saga/effects";
import {UserActionTypes} from './user.types'
import {auth,googleProvider,createUserProfileDocument,getCurrentUser} from '../../firebase/firebase.utils'

import {SignInFailure,SignInSuccess,signOutSuccess,signOutFailure,signUpSuccess,signUpFailure} from './user.action'



export function* getUser(user){
  const userRef=yield call(createUserProfileDocument,user)
  const userSnapshot=yield userRef.get()
  yield put(SignInSuccess({id:userSnapshot.id,...userSnapshot.data()}))
}



export function* signInWithGoogle(){
    try{
        const {user} =yield auth.signInWithPopup(googleProvider)
        yield getUser(user)
    }catch(error){

    }
}


export function* signInWithEmail({payload:{email,password}}){

  try{
    const {user}=yield auth.signInWithEmailAndPassword(email,password)
    yield getUser(user)
  }catch(error){
    yield put(SignInFailure(error))
  }
}



export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle)
}

export function* onEmailSignInStart(){
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmail)
}


export function* isUserAuthenticated(){
try{
  const userAuth= yield getCurrentUser()
  if(!userAuth) return
  yield getUser(userAuth)
} catch(error){
  yield put(SignInFailure(error))
}
}

export function* onCheckUserSession(){
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated)
}

export function* onSignOutStart(){
  yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut)
}

export function* signOut(){
try{
   yield auth.signOut()
   yield put(signOutSuccess())
 }catch(error){
   yield put(signOutFailure(error))
 }
}

export function* signUp({payload:{displayName,email,password,confirmPassword}}){


      if (password !== confirmPassword) {
        const error='passwords do not match'
        alert(error)
        yield put(signUpFailure(error))
        return
      }

      try {
        const { user } = yield auth.createUserWithEmailAndPassword(
          email,
          password
        );

        yield createUserProfileDocument(user, { displayName });



        yield put(signUpSuccess({email,password}))
      } catch (error) {
        yield put(signUpFailure(error));
      }
    }












export function* onSignUpStart(){
  yield takeLatest(UserActionTypes.SIGN_UP_START,signUp)
}

export function* onSignUpSuccess(){
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS,signInWithEmail)
}



export function* userSagas(){
    yield all([call(onGoogleSignInStart),call(onEmailSignInStart),call(onCheckUserSession),call(onSignOutStart),call(onSignUpStart),call(onSignUpSuccess)])
}
