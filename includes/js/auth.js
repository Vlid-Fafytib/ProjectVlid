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
    const goNext = document.getElementById("btnGonext");
    btnLogin.addEventListener('click', e => {
        //Get email and pass
        const email = signEmail.value;
        const pass = signPassword.value;
        const auth = firebase.auth();
        //Sign in
        auth.signInWithEmailAndPassword(email, pass)
            .then(e => {
                document.location.href = "../html/index.html";
            }).catch(e => alert(e.message));

    });

    // Add signup button
    btnSignUp.addEventListener('click', e => {
        //Get email and pass
        const email = regEmail.value;
        const pass = regPassword.value;
        const auth = firebase.auth();
        //Sign in
        auth.createUserWithEmailAndPassword(email, pass)
            .then(
                data => {
                    // here you ned to deconstruct user
                    const { user } = data
                    if (user) {
                        user.updateProfile({
                            displayName: logNick.value //nickname
                        })
                    }
                    addNewUserToDatabase(logNick.value, email, user.uid);
                }
            )
            .catch(e => {
                alert(e.message);
                // console.log(e)
            });
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    goNext.addEventListener('click', () =>{
        document.location.href = "../html/index.html";
    });
    // Add a realtime listener
    firebase.auth().onAuthStateChanged(user => {

        if (user) {
            console.log("sign in");
            btnLogout.classList.remove("hide");
            btnLogout.value = "Log out from " + user.displayName;
            goNext.classList.remove("hide");
            goNext.value = "Enter as " + user.displayName;
        } else {
            console.log('not logged in');
            btnLogout.classList.add("hide");
            goNext.classList.add("hide");
        }
    });
    //set new user to DB 
    function addNewUserToDatabase(name, email, uid) {
        let userRef = firebase.database().ref("all/users/");
        userRef.child(uid).set({ 'name': name, 'email': email, 'uid': uid, 'favorites': "" });
        setInterval(() => {
            document.location.href = "../html/index.html";
        }, 1000);
    }
}());