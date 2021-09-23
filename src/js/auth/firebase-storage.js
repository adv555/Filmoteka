import refs from '../refs';
//======== v 8
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import firebase from 'firebase/app';

//======== v 9 beta

// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD0jbN5v0-kKWjXaNWBztLZTb-nPHL-wAI',
  authDomain: 'filmoteka-auth-90b5d.firebaseapp.com',
  databaseURL: 'https://filmoteka-auth-90b5d-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-auth-90b5d',
  storageBucket: 'filmoteka-auth-90b5d.appspot.com',
  messagingSenderId: '191666943221',
  appId: '1:191666943221:web:715ecf4e8f7dd5b87681bc',
};

// Initialize Firebase

//======== v 8 beta
firebase.initializeApp(firebaseConfig);
//======== v 9 beta
// const firebaseApp = initializeApp(firebaseConfig);

const db = firebase.database();
const name = db.ref('name');
name.on('value', el => {
  console.log(el.val());
  // this.state({ name: el.val() });
});
console.log(db);
console.log(name);

const db2 = firebase.firestore();
console.log(db2);

export default class App {
  constructor() {
    this.state = {
      email: '',
      password: '',
      hasAccount: false,
      name: '',
      key: '',
      value: '',
      data: {},
    };
  }
  // регистрируем аккаунт юзера на firebase
  createAccount() {
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => console.log(response))
      // .then(this.state({ hasAccount: true }))
      .catch(error => console.log(error));
  }

  // вход в существующий аккаунт юзера на firebase
  signIn() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }
  sendData() {
    const { key, value } = this.state;
    const db = firebase.database();
    db.ref(key).push(value);
    alert('your data was ritten to db');
  }
  gettData() {
    const db = firebase.database();
    const surname = db.ref('surname');
    surname.on('value', el => console.log(el.val(), 'testval'));
  }
}

// function onChange({ target: { value, id } }) {
//   // console.log(e.target);
//   // console.log(value, id);
//   // e.preventDefault();
//   this.state = {
//     [id]: value,
//   };
//   console.log(this.state);
// }

// function onSubmit(e) {
//   e.preventDefault();
//   const email = e.currentTarget.elements.email.value;
//   const password = e.currentTarget.elements.password.value;
//   console.log(email, password);
//   // console.dir(e.target);
//   // console.log(e.currentTarget.elements.query.value);
// }

// export default class App {
//   constructor(user) {
//     this.watched = [];
//     this.queue = [];
//     this.user = user;
//   }
//   get watched() {
//     return this.watched;
//   }
//   get queue() {
//     return this.queue;
//   }
// }

// refs.userForm.addEventListener('input', onChange);
// refs.userForm.addEventListener('submit', onSubmit);
