const messageElement = document.querySelector('#js-message');

// Image elements
const fileUpload        = document.querySelector('#js-file-uploader');
const profileTrigger    = document.querySelector('#js-profile-trigger');
const profileBackground = document.querySelector('#js-profile-pic');

// Password objects
const password        = document.querySelector('#js-password');
const passwordConfirm = document.querySelector('#js-password-confirm');
const passwordToggle  = document.querySelector('#js-toggle-password');
const passwordSuggest = document.querySelector('#js-suggest-password');
let passwordDisplayed = false;

// On form submission, check the passwords match and display a message if the password (would have) been saved.
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  if (password.value != passwordConfirm.value) {
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
  password.value        = newPassword;
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

function succSumb() {
    
}

