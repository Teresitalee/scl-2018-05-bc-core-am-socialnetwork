// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Subir mensajes a DB
document.getElementById('publishBtn').addEventListener('click', () => {
  publishMessageInDb();
});

function publishMessageInDb() {
  const currentUser = firebase.auth().currentUser;
  let userText = userInput.value;
  db.collection('messages').add({
    creator: currentUser.displayName,
    text: userText,
    date: new Date (). getTime ()
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    userInput.value = '';
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}
/*
// Leer mensajes desde DB
let userPosts = userMsg;
//let userPostsRef = db.doc(`messages/${}`)
db.collection("messages").doc()
  .onSnapshot((doc) => {
    console.log("Current data: ", doc.data().text);
    userPosts.innerHTML += `
    <h4 class="text-center">${doc.id}</h4>
    <p class="text-center">${doc.data().creator}</p>
    <textarea rows="4" cols="60" >${doc.data().text}</textarea>
    `;
  });
*/
db.collection("messages").onSnapshot((querySnapshot) => {
  let userPosts = userMsg;
  //Limpia y borra los post del textTarea
  userPosts.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().text}`);
    userPosts.innerHTML += `
    <div class="boxMsg">
    <h4 class="text-center">${doc.data().date}</h4>
    <p class="text-center">${doc.data().creator}</p>
    <p>${doc.data().text}</p>
    <div class="icon">
    <button class="btn-delete" onclick="eliminar('${doc.id}')" id="icon-post"><i class="fas fa-trash-alt iconPost""></i></button>
    <button class="btn-edit" onclick="editar('${doc.creator}','${doc.data().text}')"><i class="fas fa-edit iconPost""></i></button>
    <button class="btn-like" ('${doc.id}')" id="icon-like"><i class="fas fa-heartbeat iconPost"></i></button></div>
    </div>
    </div>`;
    
  });
});


//Funcion eliminar post
function eliminar(id) {

  db.collection("messages").doc(id).delete().then(function () {
    console.log("Document successfully deleted!");

  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}


//Funcion editar
function editar(creator,userText) {
  document.getElementById('userInput').value = userText;

  let boton = document.getElementById('publishBtn');
  boton.innerHTML = 'Editar';

  //ejecutar funcion boton editar
  boton.onclick = function () {
    let washingtonRef = db.collection("messages").doc(creator);
    //cambiar y editar el mensaje del usuario, y guardadas en variables
    let userText = document.getElementById('userInput').value;
  
    return washingtonRef.update({
      text: userText,
     
    })
      .then(function () {
        console.log("editado!");
        boton.innerHTML = 'Publicar';
        document.getElementById('messages').value = '';
        
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("No edito: ", error);
      });
  }

}