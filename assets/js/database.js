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
    creator: currentUser.uid,
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
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().text}`);
    userPosts.innerHTML += `
    <h4 class="text-center">${doc.id}</h4>
    <p class="text-center">${doc.data().creator}</p>
    <textarea rows="4" cols="60" >${doc.data().text}</textarea>
    `;
  });
});