const url =  window.location.href;
const actorID = url.split("#")[1];

var awardList = $.get('/getAwards', setAwardList);

function setAwardList(data, status){
    if(status){
        awardList = data;
    }
}

function showAwards() {
    let awards = $("#awards").html(); // Get the inner HTML of the #awards element
    for (let i = 0; i < awardList.length; i++) {
        const awardID = awardList[i].id;
        const regex = new RegExp(awardID, 'g'); // Create a global regular expression for the award ID
        const matches = awards.match(regex); // Get all matches of the award ID in the awards content
        
        if (matches && matches.length > 0) {
            // Replace each award ID with the award information
            for (let j = 0; j < matches.length; j++) {
                awards = awards.replace(awardID, awardList[i].award + " - " + awardList[i].category + "<br>");
                console.log(awardID);
            }
        }
    }
    $("#awards").html(awards); // Set the updated inner HTML to the #awards element
}



function showEditableActor(data, status){
    if(!status){
        console.log("error");
    }
    else{
        console.log(data);
        data.forEach(actor => {
            if (actor.id == actorID) {
                $("#actor-image-edit").attr("src", actor.selfie);
                $("#fname-input").val(actor.fname);
                $("#lname-input").val(actor.lname);
                $("#dob-input").val(actor.birthday.split("T")[0]);
                $("#pob-input").val(actor.placeOfBirth);
                $("#image-input").val(actor.selfie);
                $("#wikipedia-input").val(actor.wikepedia);
            }
        })
        }
};

function showActor(data, status){
    if(!status){
        console.log("error");
    }
    else{
        console.log(data);
        data.forEach(actor => {
            if(actor.id == actorID){
                if (actor.awards) {
                    actor.awards.forEach(award => {
                        $("#awards").append(award + " ");
                    });
                }
                if (actor.id == actorID) {
                    $("#actor-name").append(actor.fname + " " + actor.lname);
                    $("#actor-dob").append(actor.birthday.split("T")[0]);
                    $("#actor-pob").append(actor.placeOfBirth);
                    $("#actor-image").attr("src", actor.selfie);
                    $("#wikipedia").append(`<br><button class="btn btn-primary text-large" onclick="window.location='`+actor.wikepedia+`'">Wikipedia</button>`);
                }         
            } 
        });
        showAwards();
    }
}


function updateActor(){
    const fname = $("#fname-input").val();
    const lname = $("#lname-input").val();
    const birthday = $("#dob-input").val();
    const placeofbirth = $("#pob-input").val();
    const selfie = $("#image-input").val();
    const wikipedia = $("#wikipedia-input").val();
  
    const parsedActorID = parseInt(actorID);
  
    const actor = {
      fname: fname,
      lname: lname,
      birthday: birthday,
      placeOfBirth: placeofbirth,
      selfie: selfie,
      wikepedia: wikipedia
    };
  
    console.log("Sending update request:", { actor: actor, id: parsedActorID });
  
    $.post("/updateActor", {actor: actor, id: parsedActorID}, function(data, status){
      if(!status){
        console.log("error");
      }
      else{
        console.log(data);
        window.location.reload();
      }
    });
  }
  


$(document).ready(function(){
    if(!document.cookie){
        console.log("user");
        $("#editActorForm").hide();
        $.get("/getActors", showActor);
    }
    else{
        const role = document.cookie.split('=')[3].split(';')[0];
        console.log(role);
        if(role == "admin"){
            console.log("admin");
            $("#userView").hide().removeClass("d-inline-flex");
            $.get("/getActors", showEditableActor);
            $("#editActorForm").submit(function(event) {
                updateActor();
              });
        }
        else{
            console.log("user");
            $("#editActorForm").hide();
            $.get("/getActors", showActor);
        }
    }
});
