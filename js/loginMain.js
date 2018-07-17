document.getElementById('loginBtn').addEventListener('click', () => {
  login();
});
document.getElementById('registerBtn').addEventListener('click', () => {
  register();
});

function login() {
  const emailValue = email.value;
  const passwordValue = password.value;
  firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
  .then(() => {
    console.log('Usuario logueado correctamente');
    link('../profile.html');
  })
  .catch((error) => {
    console.log('Error de Firebase: ' + error.code);
      console.log('Mensaje de error de Firebase: ' + error.message);
  })
}

function register() {
  const emailValue = email.value;
  const passwordValue = password.value;
  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
  .then(() => {
    console.log('Usuario registrado correctamente');
    loginPage.style.display = 'none';
    userRegistration.style.display = 'block';
  })
  .catch((error) => {
    console.log('Error de Firebase: ' + error.code);
      console.log('Mensaje de error de Firebase: ' + error.message);
  })
}
