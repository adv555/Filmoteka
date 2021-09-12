import refs from '../refs';
import debounce from 'lodash.debounce';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import firebase from 'firebase/app';
import App from './firebase-storage';

const db = firebase.firestore();
const authApp = new App();
console.log(db);
// refs.userForm.addEventListener('input', debounce(onChange, 500));
refs.userForm.addEventListener('submit', onSubmit);

// function onChange({ target: { value, id } }) {
//   // console.log(e.target);
//   // console.log(value, id);
//   // e.preventDefault();
//   authApp.state = {
//     [id]: value,
//   };
//   authApp.createAccount();
//   console.log(authApp.state);
// }

function onSubmit(e) {
  e.preventDefault();

  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;

  console.log(email, password);

  authApp.state = {
    // [id]: value,
    email: email,
    password: password,
    hasAccount: true,
  };
  authApp.createAccount();
  console.log(authApp.state);
}
