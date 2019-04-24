(function(){
    const config = {
        apiKey: "AIzaSyAnJvlFlRek-KgQlsvAq1dkJgxT-pPY0hQ",
        authDomain: "projectvlid.firebaseapp.com",
        databaseURL: "https://projectvlid.firebaseio.com",
        projectId: "projectvlid",
        storageBucket: "projectvlid.appspot.com",
        messagingSenderId: "134314771529"
    };
    firebase.initializeApp(config); 
//Get elements

const signEmail = document.getElementById("signEmail");
const signPassword = document.getElementById("signPassword");
const logNick = document.getElementById('regNick');
const regEmail = document.getElementById("regEmail");
const regPassword = document.getElementById("regPassword");
const btnLogin = document.getElementById("btnSignIn");
const btnSignUp = document.getElementById("btnSignUp");
const btnLogout = document.getElementById("btnLogout");
let nickname;
btnLogin.addEventListener('click', e => {
    //Get email and pass
    const email = signEmail.value;
    const pass = signPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

// Add signup button
btnSignUp.addEventListener('click', e => {
        //Get email and pass
        const email = regEmail.value;
        const pass = regPassword.value;
        const auth = firebase.auth();
        nickname = logNick.value;
        //Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise
        .catch(e => console.log(e.message));
});

btnLogout.addEventListener('click', e => {
   firebase.auth().signOut(); 
});

// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        btnLogout.classList.remove("hide");
    } else {
        console.log('not logged in');
        btnLogout.classList.add("hide");
    }
});
}());