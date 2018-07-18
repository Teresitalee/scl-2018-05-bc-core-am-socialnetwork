
/*
var db = firebase.firestore();




const firestore = firebase.firestore();
const settings = { 
  timestampsInSnapshots: true
};
firestore.settings(settings);

function postUser() {
  const currentUser = firebase.auth().currentUser;
  let postArea = document.getElementById('comment').value;
  

  db.collection("post").add({
    usuario:  currentUser.uid,
    creator : currentUser.displayName,
    texto : postArea,
    fecha : new Date 


  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById('comment').value = ''; //limpio para cuando refresque la pagina no aparezcan los datos anteriores
      

    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

}

//Leer documentos
let postArea = document.getElementById('postContainer'); // guardando datos
db.collection("post").onSnapshot((querySnapshot) => { //onSnapShot agente escucha
  postContainer.innerHTML = '';

    querySnapshot.forEach((doc) => {
      postArea.value = " "; 
    postContainer.innerHTML += ` 
    <div class = "row">
    <div>${doc.data().usuario} </div> 
    <div>${doc.data().texto}</div>
  </div>`
});
});
*/
