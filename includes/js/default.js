var acc = document.getElementById("menu_account");
var change_acc = document.getElementById("change_acc");
var menu_logout = document.getElementById("menu_logout");
var settings = document.getElementById("settings");

change_acc.addEventListener('click', e => {
  document.location.href = "../html/auth.html";
});

menu_logout.addEventListener('click', e => {
  firebase.auth().signOut();
  document.location.href = "../html/auth.html";
});

settings.addEventListener('click', e => {
  document.location.href = "../html/settings.html";
});
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log("sign in");
    acc.innerHTML = "";
    acc.innerText = "Здравствуйте, " + user.displayName;
    // console.log(user.displayName);
    // ...
  } else {
    // User is signed out.
    console.log("sign out");
  }
});