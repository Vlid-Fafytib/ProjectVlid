(function () {
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
    // let nickname;

    btnLogin.addEventListener('click', e => {
        //Get email and pass
        const email = signEmail.value;
        const pass = signPassword.value;
        const auth = firebase.auth();
        //Sign in
        auth.signInWithEmailAndPassword(email, pass)
        .catch(e => console.log(e.message))
        .then(e => {
            localStorage.setItem("passs", pass);
            localStorage.setItem("email", email);
            document.location.href = "../index.html";
        });

    });

    // Add signup button
    btnSignUp.addEventListener('click', e => {
        //Get email and pass
        const email = regEmail.value;
        const pass = regPassword.value;
        const auth = firebase.auth();
        nickname = logNick.value;
        //Sign in
        auth.createUserWithEmailAndPassword(email, pass)
            .then(
                data => {
                    // here you ned to deconstruct user
                    const { user } = data
                    if (user) {
                        user.updateProfile({
                            
                            displayName: logNick.value //nickname// some displayName, // some photo url
                        })
                    }
                    localStorage.setItem("pass", pass);
                    localStorage.setItem("email", email);
                    // document.location.href = "../index.html";
                }
                )
            .catch(e => {
                console.log(e)
            })
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(user => {
        
        if (user) {
            // // var displayName = user.displayName;
            // // var email = user.email;
            // var emailVerified = user.emailVerified;
            // var photoURL = user.photoURL;
            // var isAnonymous = user.isAnonymous;
            // // var uid = user.uid;
            // localStorage.setItem("uid", user.uid);
            // localStorage.setItem("displayName", user.displayName);
            // localStorage.setItem("email", user.email);
            // localStorage.setItem("isAnonymous", user.isAnonymous);
            // localStorage.setItem("emailVerified", user.emailVerified);
            // localStorage.setItem("password", user.pass);
            // console.log(user.displayName);
            // // localStorage.setItem("profile", profile);
            // // var providerData = user.providerData;
            // // console.log(uid);
            // // console.log(nickname);
            //  userInfo(user);
            btnLogout.classList.remove("hide");
        } else {
            console.log('not logged in');
            btnLogout.classList.add("hide");
        }
    });

    function userInfo(user) {

        if (user != null) {
            user.providerData.forEach(function (profile) {

                console.log("  Email " + profile.email);
            });
        }
    }
}());