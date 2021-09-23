import refs from '../refs';
// import debounce from 'lodash.debounce';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import firebase from 'firebase/app';
import App from './firebase-storage';

const authApp = new App();

const db = firebase.firestore();
console.log(db);

// refs.userForm.addEventListener('input', debounce(onChange, 500));
refs.userForm.addEventListener('submit', onSubmit);
refs.userForm2.addEventListener('submit', onSubmit2);

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

function onSubmit2(e) {
  e.preventDefault();

  const key = e.currentTarget.elements.key.value;
  const value = e.currentTarget.elements.value.value;

  console.log(key, value);

  authApp.state = {
    // [id]: value,
    key: key,
    value: value,
  };
  const db = firebase.database();
  db.ref(key).push(value);
  alert('your data was ritten to db');
  // authApp.createAccount();
  console.log(authApp.state);
}

// const userForm = document.getElementById('user-login-form');
// const userForm2 = document.getElementById('user-login-form-2');
