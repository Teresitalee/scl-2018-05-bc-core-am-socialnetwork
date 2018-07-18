// DOM
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
