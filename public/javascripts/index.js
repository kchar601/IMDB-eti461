function loadData(db){
    $('#billboard').empty();
    const billboardPics = [];
    for (let i = 0; i<db.length; i++){
        const oneLine = db[i];
        if(oneLine.billboard==1){
            billboardPics.push(oneLine.poster);
            console.log(oneLine.title);
        }
    }
        for (let i = 0; i<billboardPics.length; i++){
            console.log(billboardPics[i])
            document.getElementById("carousel" + i).src = billboardPics[i];
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

$(document).ready(function() {
    $('.nav-link').hover(function() {
      $(this).addClass('hover');
    }, function() {
      $(this).removeClass('hover');
    });
  });
  