const messageElement = document.querySelector('#js-message');

// Password objects
const password        = document.querySelector('#js-password');
const passwordConfirm = document.querySelector('#js-password-confirm');
const passwordToggle  = document.querySelector('#js-toggle-password');
const passwordSuggest = document.querySelector('#js-suggest-password');
const email = document.querySelector("#email")
const name = document.querySelector("#name");
let passwordDisplayed = false;

// On form submission, check the passwords match and display a message if the password (would have) been saved.
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  if (password.value != password.value) {
    messageElement.innerText = 'The passwords don\'t match!';
    messageElement.classList.add('settings-message--error');
    messageElement.classList.remove('settings-message--success');
  } else {
    messageElement.innerText = 'Settings successfully saved!';
    messageElement.classList.add('settings-message--success');
    messageElement.classList.remove('settings-message--error');
    succSumb();
  }
});

// Add a suggested password for the user (to both password & confirm password inputs)
passwordSuggest.addEventListener('click', function(event) {
  let newPassword = btoa(Math.random().toString(36).substring(2));
  // password.value        = newPassword;
  passwordConfirm.value = newPassword;
});

// Toggle the type of input the password field is (for user visibility)
passwordToggle.addEventListener('click', function(event) {
  passwordDisplayed = !passwordDisplayed;
  
  if (passwordDisplayed) {
    passwordToggle.innerText = "Hide Password";
    passwordConfirm.type = 'text';
    password.type = 'text';
  } else {
    passwordToggle.innerText = "Display Password";
    passwordConfirm.type = 'password';
    password.type = 'password';
  }
});
//func for update user data 
function succSumb() {
  let currentPassword = password.value;//curr pass
  let newPassword = passwordConfirm.value;//new pass for acc
  let newEmail = email.value;//new email
  //get current user
  const user = firebase.auth().currentUser;
  //get credentials for reauth 
  const credentials = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
  //reauth current user
  user.reauthenticateWithCredential(credentials)
  .then(e =>{ 
    console.log('reauth ok')
    user.updatePassword(newPassword).then(() => {//if reauth succs - change pass
      console.log("success change pass");
      user.updateEmail(newEmail).then(() =>{//if change pass succ - change email 
        console.log("success change email");
      }).catch(e => {
        console.error(e);
      });
    }).catch(event =>{  //if change pass is not ok - log error
      console.error(event);
    });
    user.updateProfile({ //update displayName for current user
      displayName: name.value,
    }).then(e => {
      console.log(name.value);
    }).catch(e => {
      console.error(e)
    });
  });
}

