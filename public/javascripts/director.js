const url =  window.location.href;
const directorID = url.split("#")[1];


function showEditableDirector(data, status){
    if(!status){
        console.log("error");
    }
    else{
        console.log(data);
        data.forEach(dir => {
            if (dir.id == directorID) {
                $("#fname-input").val(dir.fname);
                $("#lname-input").val(dir.lname);
                $("#dob-input").val(dir.birthday.split("T")[0]);
                $("#pob-input").val(dir.placeOfBirth);
                $("#image-input").val(dir.Selfie);
                $("#wikipedia-input").val(dir.Wikepedia);
                $("#director-image-edit").attr("src", dir.Selfie);
            }
        })
    }
};

function showDirector(data, status){
    if(!status){
        console.log("error");
    }
    else{
        console.log(data);
        data.forEach(dir => {
            if(dir.id == directorID){
                $("#director-name").append(dir.fname + " " + dir.lname);
                $("#director-dob").append(dir.birthday.split("T")[0]);
                $("#director-pob").append(dir.placeOfBirth);
                $("#director-image").attr("src", dir.Selfie);
                $("#wikipedia").append(`<br><button class="btn btn-primary text-large" onclick="window.location='`+dir.Wikepedia+`'">Wikipedia</button>`);     
            } 
        });
    }
}


function updateDirector(){
    const fname = $("#fname-input").val();
    const lname = $("#lname-input").val();
    const birthday = $("#dob-input").val();
    const placeofbirth = $("#pob-input").val();
    const selfie = $("#image-input").val();
    const wikipedia = $("#wikipedia-input").val();
  
    const parseddirID = parseInt(directorID);
  
    const director = {
      fname: fname,
      lname: lname,
      birthday: birthday,
      placeOfBirth: placeofbirth,
      selfie: selfie,
      wikepedia: wikipedia
    };
  
    console.log("Sending update request:", { director: director, id: parseddirID });
  
    $.post("/updateDirector", { director: director, id: parseddirID }, function(data, status){
      if(!status){
        console.log("error");
      }
      else{
        console.log(data);
        window.location.href = "/director.html#"+directorID;
      }
    });
  }
  


$(document).ready(function(){
    if(!document.cookie){
        console.log("user");
        $("#editDirectorForm").hide();
        $.get("/getDirectors", showDirector);
    }
    else{
        const role = document.cookie.split('=')[3].split(';')[0];
        console.log(role);
        if(role == "admin"){
            console.log("admin");
            $("#userView").hide().removeClass("d-inline-flex");
            $.get("/getDirectors", showEditableDirector);
            $("#editDirectorForm").submit(function(event) {
                updateDirector();
              });
        }
        else{
            console.log("user");
            $("#editDirectorForm").hide();
            $.get("/getDirectors", showDirector);
        }
    }
});
