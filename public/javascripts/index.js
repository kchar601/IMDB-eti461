function loadData(db){
    console.log("Hello");

    //var div = $('<div></div>').append(JSON.stringify(tripInfo));
    $('#billboard').empty();
    for (let i = 0; i<db.length; i++){
        const oneLine = db[i];
        const span = $("<span></span>").append("Title: " + oneLine.title + "<br>");
        //const paragraph = $("<p></p>").append(oneTrip.title + "<br>").append(span);
        $('#billboard').append(span);
    }

}


function printDB(db){
    for (let i = 0; i<db.length; i++){
        console.log(db[i].title);
    }
}

$(document).ready(function getInfo(){
    $.get("/getDB", loadData)
})