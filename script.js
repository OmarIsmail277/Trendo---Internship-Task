// First Part of the script is dealing with the UI and Form Validation
// Handling the Email/Phone Login
var email__link = document.getElementById("form__link__email");
var phone__link = document.getElementById("form__link__phone");
var email_tab = document.getElementById("email__tab");
var phone_tab = document.getElementById("phone__tab");
// By Default the Email Login is set
var email_style = email_tab.style.display = 'block';
var phone_style = phone_tab.style.display = "none";
// Error variable if credentials is not correct
var error = document.getElementById("error");
var correct = document.getElementById("correct");

email__link.addEventListener('focus', function() {
    email__link.classList.add("current");
    phone__link.classList.remove("current");
    email_tab.style.display='block';
    phone_tab.style.display="none";
 
});

phone__link.addEventListener('focus', function() {
    phone__link.classList.add("current");
    email__link.classList.remove("current");
    phone_tab.style.display='block';
    email_tab.style.display="none";
    email_style = "none";
    phone_style = "block";
});

// Handing the first step of login - Entering the Email/Phone Number
var button_1 = document.getElementById("next_btn");
var button_2 = document.getElementById("submit_btn");
// Firing the nextStep function on clicking the first Button to transfer to the Next Login Step (password-tab)
button_1.addEventListener("click", nextStep);

var password_tab = document.getElementById("password__tab");
var methods = document.getElementById("login__methods");

// This function Clears the first step of Login and Displays the second step
function nextStep(){
    // This Happpens in case the input(s) is/are non-empty
    if(validateForm()){
        // Display 'none' Email & Phone tabs 
        phone_tab.style.display='none';
        email_tab.style.display="none";
        // Display 'none' The Login Methods tab
        methods.classList.add("hide");
        // Display 'block' the Password tab
        password_tab.style.display="block";
        // Displaly 'none' the 'click' button
        button_1.style.display="none";
        // Displaly 'block' the 'submit' button
        button_2.style.display="block";
        document.getElementById("home").style.display = "block";
    }
}

function validateForm(){
    // This function deals with validation of the form fields
    // Check if inputs are non empty
    var x, y, z, valid = true;
    // Get all tabs (Email, Phone, Password)
    x = document.getElementsByClassName("tab");
    // Checking which tab is displayed
    if (email_tab.style.display == "block") z = 0;
    else if (phone_tab.style.display == "block") z = 1;
    else if (password_tab.style.display == "block") z = 2;

    // Get the inputs of the currently displayed tab
    y = x[z].getElementsByTagName("input");
    // Loop on the inputs to check if empty
    for (i = 0; i< y.length; i++){
        // if an input field is empty
        if (y[i].value == ""){
            // add an invalid class the input field
            y[i].classList.add("invalid");
            y[i].placeholder = "من فضلك ادخل المطلوب هنا ⚠";
            // and set the valid status to false
            valid = false;
        }
    }
    return valid;
}

// Second Part of the script is dealing with APIs and GET & POST Requests Through AJAX

// Firing the postInput function on clicking the Login Button to Display Posts
button_2.addEventListener("click", postInput);

function postInput(e) {
    if(validateForm())  {
        e.preventDefault();
        // defining variables to get the input values
        var user_email = document.getElementById("email").value;
        var user_password = document.getElementById("password").value;
        var user_phone = document.getElementById("phone").value;
        var country_code = document.getElementById("code").value;

        // defining objects

        // login_by_phone object
        var user_by_phone = { 
            "user": 
            {
                "country_code": "+20", 
                "phone_number": user_phone, 
                "password": user_password
            }, 
                "device": {"uid":"3", "token": "i"
            }
        };
        // login_by_email object
        var user_by_email = 
        {
        "user": 
        {
        "email" : user_email,
        "password" : user_password
        },
        "device": 
        {
            "uid":"3", 
            "token": "i"
        }
    };

    // Request type is 'Email' by default
    var request_type = "email";

    // Converting JS Object to JSON
    var email_data = JSON.stringify(user_by_email);
    var phone_data = JSON.stringify(user_by_phone);

    // Sending requests and receiving responses in JSON format using POST method
    var xhr = new XMLHttpRequest();

    // Checking if user is logging by Phone
    if (email_style === "none" && phone_style === "block") {
        request_type = 'phone';
    }

    // url of the server (remote-server of InovaEG)
    var url = "http://15.237.2.25/api/v1/login_by_" + request_type;

    // Sending the POST Request
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            error.style.display = "none";
            console.log(json);
            correct.style.display = "block";
            getInput();
        }
        else {
            error.style.display = "block";
        }
    };

    // Sending Email Data if the user is logging by email
    if (email_style === "block" && phone_style === "none") {
        xhr.send(email_data);
    }

    // Sending Phone Data if the user is logging by phone
    else if (phone_style === "block" && email_style === "none") {
        xhr.send(phone_data);
    }
}
}

// This Function is Dealing with "list home posts"
function getInput(){
    var posts = {
        "paging" : {
            "page_size" : 2,
            "page_number" : 1
        }
    };
    // Converting JS Object to JSON String
    var posts_data = JSON.stringify(posts);
    // Sending and receiving data in JSON format using POST method
    var xhr = new XMLHttpRequest();
    // Url of "list home posts" API
    var url = "http://15.237.2.25/api/v1/home/posts";
    xhr.open("GET", url, true);
    // Authorization Token "Bearer Token"
    var token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMTYsImRldmljZSI6NDY1LCJleHAiOjQ3NzIwMjY1NzJ9.8jscVW4sMfxhYpdTnuVtlRg5q5tMYCAIk3ME4bLBs_g";
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var posts_json = JSON.parse(xhr.responseText);
            var main__posts = posts_json["data"]["posts"];
            var output = "";
            for (var i in main__posts){
                output += "<div class='post'>" +"<span> Post id:</span> " +
                main__posts[i].id + " - <span> Post username: </span>" +
                main__posts[i].user.username + " | <span> Post body: </span> " + main__posts[i].body +
                "</div>"
            }
            document.getElementById("my__posts").innerHTML = output;
            document.getElementById("my__posts").style.display = "block";
            document.getElementById("container").style.display = "none";
            // console.log(posts_json["data"]["posts"]);
            console.log(main__posts);
            // alert("Great Again!");
        }
        else {
            alert("Oops! Request Failed! Your status code is " + xhr.status);
        }
    };
    xhr.send(posts_data)
}



