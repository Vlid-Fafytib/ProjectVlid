const preObject = document.getElementById('all');

const dbRefObject = firebase.database().ref().child('all');

//Sync
dbRefObject.on('value',  function (snap) {
// if(snap.val() == "")
console.log(snap.val().articles);
var arr = snap.val().articles;
var text = snap.val().articles.id1.text;
preObject.innerHTML = "<h1>" + arr.id1.text +"</h1>";
});
 