function loadData(db){
    for (let i = 0; i<db.length; i++){
        const oneLine = db[i];
        checkLine(oneLine, 1);
        checkLine(oneLine, 2);
        checkLine(oneLine, 3);
    }
}
function checkLine(line, id){
    if(line.id==id){
        $('#trend'+ id +'img').attr('src', line.poster);
        $('#trend'+ id + 'head').text(line.title);
        $('#trend' + id + 'desc').text(line.desc);
    }
    return false;
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
  