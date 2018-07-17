

//Avatar y nombre GOOGLE
function InicializarFire() {


  firebase.auth().onAuthStateChanged(function (user) {
    /* body... */

    if (user) {
      var userDisplayName = user.displayName;
      var userPhoto = user.photoURL;

      userName.textContent = userDisplayName;
      userPic.style.backgroundImage = 'url(' + userPhoto + ')';


    }

  });

}

window.onload = function () {
  InicializarFire();
}

var userPic = document.getElementById('user-pic');
var userName = document.getElementById('user-name');


//Publicar
const boton = document.getElementById("btnPublicar");

boton.addEventListener("click", () => {
  // Acá guardo el comentario ingresado por el usuario en el textarea
  let comments = document.getElementById("comment").value;

  // Limpiar el textarea
  document.getElementById("comment").value = " ";

  //contenedor donde dejaré mis comentarios en HTML
  const cont = document.getElementById("cont");

  //Crear div contenedor
  const newComments = document.createElement("div");

  //Validar que el textarea tenga un comentario y no esté vacío
  if (comments.length === 0 || comments === null){
    alert ("Debes ingresar un mensaje");
    return false;
  }

})




