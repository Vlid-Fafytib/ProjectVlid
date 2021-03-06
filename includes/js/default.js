var acc = document.getElementById("menu_account");
var change_acc = document.getElementById("change_acc");
var menu_logout = document.getElementById("menu_logout");
var settings = document.getElementById("settings");
var favorites = document.getElementById("favorites");
change_acc.addEventListener('click', e => {
    document.location.href = "auth.html";
});

menu_logout.addEventListener('click', e => {
    firebase.auth().signOut();
    document.location.href = "auth.html";
});

settings.addEventListener('click', e => {
    document.location.href = "settings.html";
});

favorites.addEventListener('click', e => {
    document.location.href = "favorites.html";
});
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log("sign in");
        acc.innerHTML = "";
        acc.innerText = "Здравствуйте, " + user.displayName;
        // ...
    } else {
        // User is signed out.
        console.log("sign out");
        document.location.href = "auth.html";  //redirect if user is null 
    }
});
