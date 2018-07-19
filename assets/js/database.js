// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Subir mensajes a DB
document.getElementById('publishBtn').addEventListener('click', () => {
  publishMessageInDb();
});

function publishMessageInDb() {
  let currentUser = firebase.auth().currentUser;
 
  let userText = userInput.value;
  db.collection('messages').add({
    creator: currentUser.displayName,
    
    text: userText,
    date: new Date()
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    userInput.value = '';
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

db.collection("messages").onSnapshot((querySnapshot) => {
  let userPosts = userMsg;
  //Limpia y borra los post del textTarea
  //userPosts.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().text}`);
    userPosts.innerHTML += `
    <div class="boxMsg">
    <h4 class="text-center">${doc.id}</h4>
    <p class="text-center">${doc.data().creator}</p>
    <p>${doc.data().text}</p>
    <div class="icon">
    <button class="btn-delete" onclick="eliminar('${doc.id}')" id="icon-post"><i class="fas fa-trash-alt iconPost""></i></button>
    <button class="btn-edit" onclick="editar('${doc.id}', '${doc.data().text}')"><i class="fas fa-edit iconPost""></i></button>
    <button class="btn-like" onclick="count(${doc.id})" id="icon-like"><i class="fas fa-heartbeat iconPost"></i></button></div>
    </div>
    `;
    
  });
});

// guardar los conteos de likes
var count = 0;

function count(doc.id){
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






/*<h4 class="text-center">${doc.data().creator}</h4>
    <p class="text-center">${doc.data().userName}</p>
    <span id="${doc.id}">${doc.data().text}</span>
    <p class="text-center">${doc.data().date}</p>
    <button class="btn-edit" onclick="editar('${doc.id}','${doc.data().creator}','${doc.data().userName}','${doc.data().text}','${doc.data().date}')"><i class="fas fa-edit"></i></button>
    <button class="btn-post" onclick="eliminar('${doc.id}')" id="icon-post"><i class="fas fa-trash-alt"></i></button></div>*/

//Funcion eliminar post
function eliminar(id) {

  db.collection("messages").doc(id).delete().then(function () {
    console.log("Document successfully deleted!");

  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}

//FUnción editar mensaje
function editar(id,creator,text,date) {
  let oldText = document.getElementById(id);
  console.log(oldText);
  // cambiar nombre a boton
  let boton = document.getElementById('publishBtn');
  boton.innerHTML = 'Editar';
  //ejecutar funcion boton editar
  boton.onclick = () => {
    let postRef = db.collection("messages").doc(id);
    //cambiar y editar el mensaje del usuario, y guardadas en variables
    let userText = document.getElementById('userInput');
  
    return postRef.update({
      creator: currentUser.uid,
      text: userText,
      date: new Date()
    })
      .then(function () {
        console.log("Document successfully updated!");
        boton.innerHTML = 'Guardar';
        document.getElementById('messages').value = '';
        
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

  };
}

/*
function editar(id,currentUser,currentUserName,userText,date) {
  let postRef = db.collection("messages").doc(id);

  let oldText = document.getElementById(id);
  console.log(oldText);
  // cambiar nombre a boton
  let boton = document.getElementById('publishBtn');
  boton.innerHTML = 'Editar';

  //ejecutar funcion boton editar
  boton.onclick = () => {
    //cambiar y editar el mensaje del usuario, y guardadas en variables
    let userText = document.getElementById('userInput');
  
    return postRef.update({
      creator: currentUser.uid,
      text: userText,
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
  }
}
*/
