const form = document.querySelector(".userForm")
const inputName = form.elements["username"];
const inputEmail = form.elements["email"];
const inputPassword = form.elements["password"];

inputName.onblur = function(){
  if (inputName.value.length > 10 || inputName.value.length < 3) {
    inputName.classList.add('invalid');
    nameError.innerHTML = 'Please enter correct user name (length: 3 to 10)'
    nameError.style.color = "red";
  }
};

inputName.onfocus = function() {
  if (!this.classList.contains('invalid')) {
    nameError.innerHTML = 'Name should be between 3 and 10 characters';
    nameError.style.color = "green";
  }
  this.classList.remove("invalid");
};

inputEmail.onblur = function(){
  if (!inputEmail.value.includes("@")) {
    inputEmail.classList.add('invalid');
    emailError.innerHTML = 'Please enter correct email address (should contain "@")'
    emailError.style.color = "red";
  }
};

inputEmail.onfocus = function() {
    if (!this.classList.contains('invalid')) {
        emailError.innerHTML = 'Email should contain "@" sign';
        emailError.style.color = "green";
      }
      this.classList.remove("invalid");
};

inputPassword.onblur = function(){
  if (inputPassword.value.length < 8) {
    inputPassword.classList.add('invalid');
    pswrdError.innerHTML = 'Please enter correct password (minimum length: 8 symbols)'
    pswrdError.style.color = "red";
  }
};

inputPassword.onfocus = function() {
    if (!this.classList.contains('invalid')) {
        pswrdError.innerHTML = 'Password should be minimum 8 characters long';
        pswrdError.style.color = "green";
      }
      this.classList.remove("invalid");
};



form.onsubmit = function(event) {
    let isValid = true;
  
    
    if (inputName.value.length > 10 || inputName.value.length < 3) {
      inputName.classList.add('invalid');
      nameError.innerHTML = 'Please enter correct user name (length: 3 to 10)';
      isValid = false;
    }
  
    
    if (!inputEmail.value.includes("@")) {
      inputEmail.classList.add('invalid');
      emailError.innerHTML = 'Please enter correct email address (should contain "@")';
      isValid = false;
    }
  
    
    if (inputPassword.value.length < 8) {
      inputPassword.classList.add('invalid');
      pswrdError.innerHTML = 'Please enter correct password (minimum length: 8 symbols)';
      isValid = false;
    }
  
    
    if (!isValid) {
      event.preventDefault();
      alert("Please fill the form in right way")
    }
  };
  