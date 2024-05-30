window.addEventListener('beforeunload', function (e) {

  let username = document.getElementById("username").value;
  let email = document.getElementById("gmail").value; 
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("subject", subject);
  localStorage.setItem("message", message);
});

function myFunction() {

  let username = localStorage.getItem("username") || "";
  let email = localStorage.getItem("email") || ""; 
  let subject = localStorage.getItem("subject") || "";
  let message = localStorage.getItem("message") || "";

  console.log("Username: " + username);
  console.log("Email: " + email);
  console.log("Subject: " + subject);
  console.log("Message: " + message);
  
  document.getElementById("username").value = username;
  document.getElementById("gmail").value = email; 
  document.getElementById("subject").value = subject; 
  document.getElementById("message").value = message; 
}
const checkbox = document.querySelector("#myForm");

checkbox.addEventListener("submit", validate);

function validate(event) {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let email = document.getElementById("gmail").value; 
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  const usernameError = document.getElementById("username-error");
  const emailError = document.getElementById("gmail-error");
  const subjectError = document.getElementById("subject-error");
  const messageError = document.getElementById("message-error");

  usernameError.textContent = "";
  emailError.textContent = "";
  subjectError.textContent = "";
  messageError.textContent = "";

  let isValid = true;
  let errors = [];

  if (username === "" || !/^[a-zA-Z\s\-_]+$/.test(username)) {
    errors.push("Please enter a valid username");
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "" || !emailRegex.test(email)) {
    errors.push("Please enter a valid email address.");
    isValid = false;
  }

  if (subject === "") {
    errors.push("Please select your course."); 
    isValid = false;
  } 
  else if (subject.length < 5) { 
    errors.push("Subject must be at least 5 characters long.");
    isValid = false;
  }

  if (message === "") {
    errors.push("Please enter your message.");
    isValid = false;
  } 
  else if (message.length < 10) { 
    errors.push("Message must be at least 10 characters long.");
    isValid = false;
  }

  if (!isValid) {
    
    errors.forEach(error => {
      switch (error) {
        case "Please enter a valid username":
          usernameError.textContent = error;
          break;
        case "Please enter a valid email address.":
          emailError.textContent = error;
          break;
        case "Please select your course.":
          subjectError.textContent = error;
          break;
        case "Subject must be at least 5 characters long.":
          subjectError.textContent = error;
          break;
        case "Please enter your message.":
          messageError.textContent = error;
          break;
        case "Message must be at least 10 characters long.":
          messageError.textContent = error;
          break;
      }
    });
  } else {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup-text').innerHTML = "Your details have been successfully stored in the localstorage .<br><br>" +
    "username : " + username + "<br>" +
    "email : " + email + "<br>" +
    "subject : " + subject + "<br>" +
    "message : " + message;
  }
  return isValid;
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

function submitForm() {
  document.getElementById("myForm").submit();
}