/*
window.onload = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log('User: ' + JSON.stringify(user));
      window.open('../muro.html', '_self', 'true');
    } else {
      loginPage.style.display = 'block';
    }
  });
};
*/

document.getElementById('loginBtn').addEventListener('click', () => {
  login();
});
document.getElementById('registerBtn').addEventListener('click', () => {
  goToRegistration();
});
document.getElementById('fbkBtn').addEventListener('click', () => {
  loginFacebook();
});
document.getElementById('googleBtn').addEventListener('click', () => {
  loginGoogle();
});
document.getElementById('backBtn').addEventListener('click', () => {
  backToLogin();
});
document.getElementById('nextBtn').addEventListener('click', () => {
  register();
  saveToDB();
});
document.getElementById('logoutBtn').addEventListener('click', () => {
  logOut();
});

function login() {
  const emailValue = email.value;
  const passwordValue = password.value;
  firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {
      console.log('Usuario logueado correctamente');
      window.open('../muro.html', '_self', 'true');
    })
    .catch((error) => {
      console.log('Error de Firebase: ' + error.code);
      console.log('Mensaje de error de Firebase: ' + error.message);
    });
}

function backToLogin() {
  loginPage.style.display = 'block';
  userRegistration.style.display = 'none';
}

function goToRegistration() {
  loginPage.style.display = 'none';
  userRegistration.style.display = 'block';
}

function register() {
  const emailValue = userEmail.value;
  const passwordValue = userPassword.value;
  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {
      console.log('Usuario registrado correctamente');
      //window.open('../muro.html', '_self', 'true');
    })
    .catch((error) => {
      console.log('Error de Firebase: ' + error.code);
      console.log('Mensaje de error de Firebase: ' + error.message);
    });
}

function loginFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      console.log('Usuario logueado correctamente');
      window.open('../muro.html', '_self', 'true');
    })
    .catch((error) => {
      console.log('Error de Firebase: ' + error.code);
      console.log('Mensaje de error de Firebase: ' + error.message);
    });
}

function loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
    })
    .then(() => {
      console.log('Usuario logueado correctamente');
      window.open('../muro.html', '_self', 'true');
    })
    .catch(function (error) {
      console.log('Error de Firebase: ' + error.code);
      console.log('Mensaje de error de Firebase: ' + error.message);
      console.log('Email de usuario con problemas: ' + error.email);
      console.log('Credencial de usuario con problemas: ' + error.credential);
    });
}

function logOut() {
  firebase.auth().signOut()
    .then(() => {
      console.log('Bye Bye');
      window.open('../../index.html', '_self', 'true');
    })
    .catch((error) => {
      console.log('Permanecerás aca...para siempre!! ' + error);
    });
}

// Inicializando Base de Datos
const firestore = firebase.firestore();
const settings = { /* your settings... */
  timestampsInSnapshots: true
};
firestore.settings(settings);

//Agregar usuario a DB
function saveToDB() {
  const db = firebase.firestore();
  let name = document.getElementById('userName').value;
  let email = document.getElementById('userEmail').value;

  db.collection("users").add({
      id: uid,
      name: name,
      email: email,
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.uid);
      document.getElementById('userName').value = '';
      document.getElementById('userEmail').value = '';
    })
    .catch(function (error) {
      console.log('Error de Firebase: ' + error.code);
      console.log('Mensaje de error de Firebase: ' + error.message);
    });
}