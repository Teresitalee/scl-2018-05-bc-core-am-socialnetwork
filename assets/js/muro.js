
// Avatar y nombre GOOGLE

var userPic = document.getElementById('user-pic');
var userName = document.getElementById('user-name');

function InicializarFire() {
  firebase.auth().onAuthStateChanged(function(user) {
    /* body... */

    if (user) {
      let userDisplayName = user.displayName;
      let userPhoto = user.photoURL;

      userName.textContent = userDisplayName;
      userPic.style.backgroundImage = 'url(' + userPhoto + ')';
    }
  });
}

window.onload = function() {
  InicializarFire();
};


