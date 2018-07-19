// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Subir mensajes a DB
document.getElementById('publishBtn').addEventListener('click', () => {
  publishMessageInDb();
});

function publishMessageInDb() {
  if (userInput.value == '') {
    alert('Debes ingresar un texto para poder compartir');
  } else {
    let currentUser = firebase.auth().currentUser.uid;
    let userName = firebase.auth().currentUser.displayName;
    let userText = userInput.value;
    let time = new Date().getTime();
    let date = new Date(time).toLocaleString();
    db.collection('messages').add({
        creator: currentUser,
        userName: userName,
        text: userText,
        date: date
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        userInput.value = '';
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
}

db.collection("messages").onSnapshot((querySnapshot) => {
  let userPosts = userMsg;
  //Limpia y borra los post del textTarea
  //userPosts.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().text}`);
    userPosts.innerHTML += `
    <div class="boxMsg">
    <p class="text-center">${doc.data().date}</p>
    <h4 class="text-center">${doc.id}</h4>
    <p class="text-center">${doc.data().creator}</p>
    <p>${doc.data().text}</p>
    <div class="icon">
    <button class="btn-delete" onclick="eliminar('${doc.id}')" id="icon-post"><i class="fas fa-trash-alt iconPost""></i></button>
    <button class="btn-edit" onclick="editar('${doc.id}', '${doc.data().text}')"><i class="fas fa-edit iconPost""></i></button>
    <button class="btn-like" ('${doc.id}')" id="icon-like"><i class="fas fa-heartbeat iconPost"></i></button></div>
    </div>
    `;

  });
});

//Funcion eliminar post
function eliminar(id) {
  let validation = prompt('Estás segur@ de eliminar? (SI/NO)').toLowerCase();
  if(validation == "si") {
    db.collection("messages").doc(id).delete()
    .then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }  
}

//Funcion editar
function editar(id, userText, Date) {
  document.getElementById('userInput').value = userText;

  let boton = document.getElementById('publishBtn');
  boton.innerHTML = 'Editar';

  //ejecutar funcion boton editar
  boton.onclick = function () {
    let currentUser = firebase.auth().currentUser.uid;
    let messagePost = document.getElementById('userInput').value;
    let messageRef = db.collection("messages").doc(id);
    //cambiar y editar el mensaje del usuario, y guardadas en variables
    console.log(`usuario actual: ${currentUser}, mensaje de usuario ${messagePost}, referencia ${messageRef}`);
    return messageRef.update({
      creator: currentUser.uid,
      text: messagePost,
      date: new Date()
    })
    .then(function () {
      console.log("Document successfully updated!");
      boton.innerHTML = 'Publicar';
      document.getElementById('messages').value = '';

    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
  };

}

function editar(id, userText, Date) {

}