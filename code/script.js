const preObject = document.getElementById("object");

const dbRefObject = firebase.database().ref().child("object");

//Sync

dbRefObject.on("value", projectvlid => console.log(projectvlid.val()));