function loadData(db){
    $('#billboard').empty();
    const billboardPics = [];
    for (let i = 0; i<db.length; i++){
        const oneLine = db[i];
        if(oneLine.billboard==1){
            billboardPics.append(oneLine.poster);
            console.log(oneLine.title);
        }
    }
    $('#billboard').append("<image src=\"" + oneLine.poster + "\">");
}

var myIndex = 0;
//carousel();

/*function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 5000); // Change image every 2 seconds
}*/

function printDB(db){
    for (let i = 0; i<db.length; i++){
        console.log(db[i].title);
    }
}

$(document).ready(function getInfo(){
    $.get("/getDB", loadData)
})