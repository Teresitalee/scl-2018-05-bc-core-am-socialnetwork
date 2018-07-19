// Initialize Cloud Firestore through Firebase}


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
    let currentUserName = firebase.auth().currentUser.displayName;
    let userText = userInput.value;
    let time = new Date().getTime();
    let date = new Date(time).toLocaleString();
    db.collection('messages').add({
        creator: currentUser,
        userName: currentUserName,
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
  userPosts.innerHTML = '';
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
    <button class="btn-like" onclick="count('${doc.id}')" id="icon-like"><i class="fas fa-heartbeat iconPost"></i></button></div>
    </div>
    `;

  });
});

//Funcion eliminar post
function eliminar(id) {
  let validation = prompt('Estás segur@ de eliminar? (SI/NO)').toLowerCase();
  if (validation == "si") {
    db.collection("messages").doc(id).delete()
      .then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }
}

//Funcion editar
function editar(id, userText) {
  document.getElementById('userInput').value = userText;
  let boton = document.getElementById('publishBtn');
  boton.innerHTML = 'Editar';
  //ejecutar funcion boton editar
  boton.onclick = function () {
    let messageRef = db.collection("messages").doc(id);
    //cambiar y editar el mensaje del usuario, y guardadas en variables
    let userText = document.getElementById('userInput').value;
    return messageRef.update({
        text: userText,
      })
      .then(function () {
        console.log("editado!");
        boton.innerHTML = 'Publicar';
        document.getElementById('userInput').value = '';
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("No edito: ", error);
      });
  };
}
// Inicializando Base de Datos
const firestore = firebase.firestore();
const settings = { /* your settings... */
  timestampsInSnapshots: true
};
firestore.settings(settings);


//Contador de likes y guardarlo a DB
function saveLikeToDB() {
  const db = firebase.firestore();
  let likes = document.getElementById('like-post').value;

  var heartCountRef = firebase.database().ref('posts/' + postId + '/heartCount');
  heartCountRef.on('value', function (snapshot) {
    updateHeartCount(postElement, snapshot.val());
  });

}

// guardar los conteos de likes
var count = 0;

function count() {
  contador++;
  console.log('El contador es:' + contador);
}

function countLikeInDb() {
  let currentUser = firebase.auth().currentUser.uid;
  let currentUserName = firebase.auth().currentUser.displayName;
  let userText = userInput.value;
  db.collection('messages').add({
      feelings: currentUser,
      post: currentUserName,
      users: userText,

    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      userInput.value = '';
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

}