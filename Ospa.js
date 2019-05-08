/*    JavaScript 6th Edition
 *    Chapter 8
 *    Chapter Homework

 *    O Spa! Account setup 
 *    Author: Kirstie OConnell
 *    Date:   10/23/2018

 *    Filename: styles.js
 */

"use strict";

// global variables
var profile = {};
var spaPackage = [];
var arrayString;
var objectString;

// validate entered username
function validateUsername() {
   var unInput = document.getElementById("uname");
   var errorDiv = document.getElementById("usernameError");
   try {
//      if (unInput.value.length < 4) {
      if (/.{4,}/.test(unInput.value) === false) {
         throw "Username must be at least 4 characters long";
      } else if (/\W/.test(unInput.value) === true) {
         throw "Username must contain only letters and numbers";
      }
      // remove any username error styling and message
      unInput.style.background = "";
      errorDiv.style.display = "none";
      errorDiv.innerHTML = "";
      // copy valid username value to profile object
      profile.username = unInput.value;
      // copy profile.username value to profile section
      document.getElementById("profileUsername").innerHTML = profile.username;
      // make profile section and username section visible
      document.getElementById("profile").style.display = "block";
      document.getElementById("usernameSection").style.display = "block";
   }
   catch(msg) {
      // display error message
      errorDiv.style.display = "block";
      errorDiv.innerHTML = msg;
      // change input style
      unInput.style.background = "rgb(255,233,233)";
   }
}

// validate entered password
function validatePassword() {
   var pw1Input = document.getElementById("pw1");
   var pw2Input = document.getElementById("pw2");
   var errorDiv = document.getElementById("passwordError");
   try {
//      if (pw1Input.value.length < 8) {
      if (/.{8,}/.test(pw1Input.value) === false) {
         throw "Password must be at least 8 characters";
      } else if (pw1Input.value.localeCompare(pw2Input.value) !== 0) {
         throw "Passwords must match";
      } else if (/[a-zA-Z]/.test(pw1Input.value) === false) {
         throw "Password must contain at least one letter";
      } else if (/\d/.test(pw1Input.value) === false) {
         throw "Password must contain at least one number";
      } else if (/[!@#_]/.test(pw1Input.value) === false) {
         throw "Password must contain at least one of the following symbols: ! @ # _";
      }
      // remove any password error styling and message
      pw1Input.style.background = "";
      pw2Input.style.background = "";
      errorDiv.style.display = "none";
      errorDiv.innerHTML = "";
      // copy valid password to profile object
      profile.password = pw1Input.value;
   }
   catch(msg) {
      // display error message
      errorDiv.style.display = "block";
      errorDiv.innerHTML = msg;
      // change input style
      pw1Input.style.background = "rgb(255,233,233)";
      pw2Input.style.background = "rgb(255,233,233)";      
   }
}

// validate entered email
function validateEmail() {
   var emailInput = document.getElementById("emailbox");
   var errorDiv = document.getElementById("emailError");
   var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
   try {
//      if (emailInput.value.search(/@/) === -1 || 
//          emailInput.value.lastIndexOf(".") === -1) {
//      if (
//         (/@/.test(emailInput.value) === false) || (
//            (/\...$/.test(emailInput.value) === false) &&
//            (/\....$/.test(emailInput.value) === false) &&
//            (/\.....$/.test(emailInput.value) === false) &&
//            (/\.......$/.test(emailInput.value) === false)
//         )
//      ) {
//      if ((/@/.test(emailInput.value) === false) ||
//          (/\..{2,6}$/.test(emailInput.value) === false)) {
      if (emailCheck.test(emailInput.value) === false) {
         throw "Please provide a valid email address";
      }
       // remove any email error styling and message
      emailInput.style.background = "";
      errorDiv.innerHTML = "";
      errorDiv.style.display = "none";
      // convert email address to lowercase
      emailInput.value = emailInput.value.toLowerCase();
      // copy valid email value to profile object
      profile.email = emailInput.value;
      // copy profile.email value to profile section
      document.getElementById("profileEmail").innerHTML = profile.email;
      // make profile section and email section visible
      document.getElementById("profile").style.display = "block";
      document.getElementById("emailSection").style.display = "block";
   }
   catch(msg) {
      // display error message
      errorDiv.innerHTML = msg;
      errorDiv.style.display = "block";
      // change input style
      emailInput.style.background = "rgb(255,233,233)";
   }
}

// add spapackage to profile
function registerPackage(event) {
   if (event === undefined) { // get caller element in IE8
      event = window.event;
   }
   var callerElement = event.target || event.srcElement;
   var packageName = callerElement.value;
   if (callerElement.checked) { // if box has just been checked
      // add checkbox value to spaPackage array
      spaPackage.push(packageName);
      // add checkbox value to list in profile section
      var newPackage = document.createElement("li");
      newPackage.innerHTML = packageName;
      document.getElementById("profilePackage").appendChild(newPackage);
      // make profile section and spaPackage section visible
      document.getElementById("profile").style.display = "block";
      document.getElementById("packageSection").style.display = "block";
   } else { // if box has just been unchecked
      var listItems = document.querySelectorAll("#profilePackage li");
      for (var i = 0; i < listItems.length; i++) {
         if (listItems[i].innerHTML === packageName) {
            // remove element at index i from array
            spaPackage.splice(i, 1); 
            // remove spaPackage from profile list
            listItems[i].parentNode.removeChild(listItems[i]);
            break;
         }
      }
   }
}

// convert form input to strings for submission
function convertToString() {
   // convert spaPackage array to string
   arrayString = spaPackage.toString();
   // convert profile object to string
   objectString = JSON.stringify(profile);
}

function createEventListeners() {
   var unInput = document.getElementById("uname");
   var pw2Input = document.getElementById("pw2");
   var emailInput = document.getElementById("emailbox");
   if (unInput.addEventListener) {
      unInput.addEventListener("change", validateUsername, false); 
      pw2Input.addEventListener("change", validatePassword, false); 
      emailInput.addEventListener("change", validateEmail, false); 
   } else if (unInput.attachEvent) {
      unInput.attachEvent("onchange", validateUsername);
      pw2Input.attachEvent("onchange", validatePassword);
      emailInput.attachEvent("onchange", validateEmail);
   }
   
   var spaPackage = document.getElementsByName("packages");
   if (spaPackage[0].addEventListener) {
      for (var i = 0; i < spaPackage.length; i++) {
         spaPackage[i].addEventListener("change", registerPackage, false);
      }
   } else if (spaPackage[0].attachEvent) {
      for (var i = 0; i < spaPackage.length; i++) {
         spaPackage[i].attachEvent("onchange", registerPackage);
      }
   }

   var button = document.getElementById("createBtn");
   if (button.addEventListener) {
      button.addEventListener("click", convertToString, false);
   } else if (button.attachEvent) {
      button.attachEvent("onclick", convertToString);
   }
}

if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}