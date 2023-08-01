const { initializeApp } = require("firebase/app");
const firebaseConfig = require("../config/firebase.config");

const firebaseInitialize = () => {
  initializeApp(firebaseConfig);
};

module.exports = firebaseInitialize;
