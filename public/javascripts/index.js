function loadData(db){
    for (let i = 0; i<db.length; i++){
        const oneLine = db[i];
        if(oneLine.id=="3"){
            $('#trend1img').attr('src', oneLine.poster);
            $('#trend1head').text(oneLine.title);
            $('#trend1desc').text(oneLine.desc);
        }
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
  