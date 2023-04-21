const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get('user');

$(document).ready(function(){
    $.post("/confirmEmail", {username: query}, function(data){
        console.log(data);
        if(!data.success){
            alert("Email not confirmed");
        }
        else{
            console.log("Email confirmed");
        }
    });
});