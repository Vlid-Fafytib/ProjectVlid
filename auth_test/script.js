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
    let nickname;

    btnLogin.addEventListener('click', e => {
        //Get email and pass
        const email = signEmail.value;
        const pass = signPassword.value;
        const auth = firebase.auth();
        //Sign in
        auth.signInWithEmailAndPassword(email, pass)
        .catch(e => console.log(e.message))
        .then(e => {
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
                            displayName: nickname// some displayName, // some photo url
                        })
                    }
                    document.location.href = "../index.html";
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
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            console.log(uid);
            userInfo(user);
            btnLogout.classList.remove("hide");
        } else {
            console.log('not logged in');
            btnLogout.classList.add("hide");
        }
    });

    function userInfo(user) {
        // console.log(nickname);
        if (user != null) {
            user.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName); 
                console.log("  Email: " + profile.email);
                // console.log("  Photo URL: " + profile.photoURL);
            });
        }
    }

}());