var button_1 = document.getElementById("submit_btn");
button_1.addEventListener("click", postInput);

function postInput(e){

if(validateForm()) {
e.preventDefault();
var user_email = document.getElementById("email").value;
var user_password = document.getElementById("password").value;
var user_phone = document.getElementById("phone").value;
var country_code = document.getElementById("code").value;

var user_by_phone = { "user": {"country_code": "+20", "phone_number": "1095026412", "password": "password"}, "device": {"uid":"3", "token": "i"}};
var user_by_email = {
  "user" : {
    "email" : "testing_email@example.com",
    "password" : "password"
    },
    "device": {
        "uid":"3", 
        "token": "i"
    }
};
    var posts = {
        "paging" : {
            "page_size" : 2,
            "page_number" : 1
        }
    };

var request_type = "email";


var email_data = JSON.stringify(user_by_email);
var phone_data = JSON.stringify(user_by_phone);
var posts_data = JSON.stringify(posts);
// console.log(phone_data);
// Sending and receiving data in JSON format using POST method
var xhr = new XMLHttpRequest();

if (email_style==="none" && phone_style == "block") {
request_type = 'phone';
}

var url = "http://15.237.2.25/api/v1/login_by_" + request_type;


xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onload = function () {
    if (xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json);
        alert("Great!");
    }
};

if (email_style==="block" && phone_style == "none") {
xhr.send(email_data);

 var url = "http://15.237.2.25/api/v1/home/posts";
    xhr.open("GET", url, true);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMTYsImRldmljZSI6NDY1LCJleHAiOjQ3NzIwMjY1NzJ9.8jscVW4sMfxhYpdTnuVtlRg5q5tMYCAIk3ME4bLBs_g");

    xhr.onload = function () {
        if (xhr.status === 200) {
            var json2 = JSON.parse(xhr.responseText);
            console.log(json2);
            alert("Great Again!");
        }
    };
    xhr.send(posts_data);
}
else if (email_style==="none" && phone_style == "block") {
xhr.send(phone_data);
console.log(phone_data);
}
}
}



