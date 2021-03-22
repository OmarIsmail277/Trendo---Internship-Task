var email__link = document.getElementById("form__link__email");
var phone__link = document.getElementById("form__link__phone");

var email_tab = document.getElementById("email__tab");
var phone_tab = document.getElementById("phone__tab");

var email_style =   email_tab.style.display='block';

var phone_style = phone_tab.style.display="none";



email__link.addEventListener('focus', function() {
    email__link.classList.add("current");
    phone__link.classList.remove("current");

    email_tab.style.display='block';
    phone_tab.style.display="none";
    console.log(email_style,phone_style);
});


phone__link.addEventListener('focus', function() {
    phone__link.classList.add("current");
    email__link.classList.remove("current");

    phone_tab.style.display='block';
    email_tab.style.display="none";

    email_style = "none";
    phone_style = "block";
});

var button_1 = document.getElementById("next_btn");
var button_2 = document.getElementById("submit_btn");
button_1.addEventListener("click", nextStep);

var password_tab = document.getElementById("password__tab");
var methods = document.getElementById("login__methods");

function nextStep() {
    if (validateForm()) {
    phone_tab.style.display='none';
    email_tab.style.display="none";
    methods.classList.add("hide");
    password_tab.style.display="block";
    button_1.style.display="none";
    button_2.style.display="block";
    }
}

function validateForm(){
    // This function deals with validation of the form fields
    var x, y, valid = true;
    x = document.getElementsByClassName("tab");
    var z;
    if (email_tab.style.display=="block") z = 0;
    else if (phone_tab.style.display=="block") z = 1;
    else if (password_tab.style.display=="block") z = 2;
    y = x[z].getElementsByTagName("input");
    for (i = 0; i < y.length; i++){
    // If a field is empty...
    if (y[i].value == ""){
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        y[i].placeholder = "Enter an input here please!";
        // and set the valid status to false:
        valid = false;
        }
    return valid;   
    }
}
