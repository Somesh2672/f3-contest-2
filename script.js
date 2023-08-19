const ipAddress = document.getElementById("UserIp");
const startbtn = document.getElementById("getstarted");


$.getJSON("https://api.ipify.org?format=json", function (data) {
    $("#UserIp").html(data.ip)
});


startbtn.addEventListener('click',()=>{
    location.href='./content Page';
})