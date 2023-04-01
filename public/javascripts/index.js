function loadMovies(movies){
    for (let i = 0; i<movies.length; i++){
        const oneLine = movies[i];
        for(n=1; n<4; n++){
            addMovie(oneLine, n);
        }
    }
}

function addMovie(line, id){
    if(line.id==id){
        $('#trend'+ id +'btn').attr('onclick', 'window.location.href=\"/movies.html#' + line.id + '\"');
        $('#trend'+ id +'img').attr('src', line.poster);
        $('#trend'+ id + 'head').text(line.title);
        $('#trend' + id + 'desc').text(line.desc);
        $('#trend' + id + 'dir').text(line.director);
        line.actors.forEach(function(actor) {
            $('#trend' + id + 'act').append(' ' + actor + ' ');
          });    
        }
}

function loadDirectors(directors){
    for (let i = 0; i<directors.length; i++){
        const oneLine = directors[i];
        for(n=1; n<4; n++){
            addDirector(oneLine, n);
        }
    }
}

function addDirector(line, num){
    const id = $('#trend' + num + 'dir').text();
    if(line.id === parseInt(id, 10)){
        $('#trend'+ num +'dir').text("Director: " + line.fname + " " + line.lname);
    }
}

function loadActors(actors){
    for (let i = 0; i<actors.length; i++){
        const oneLine = actors[i];
        for(n=1; n<4; n++){
            addActor(oneLine, n);
        }
    }
}

function addActor(line, num){
    const id = $('#trend' + num + 'act').text();
    console.log(id);
    var cast = [];
    if(id.includes(' ' + line.id + ' ')){
        const name = line.fname + " " + line.lname;
        $('#trend'+ num +'act').text($('#trend'+ num +'act').text().replace(line.id, name));
        if(hasNumber(document.getElementById("trend" + num + 'act').innerHTML)){
            document.getElementById("trend" + num + 'act').innerHTML = document.getElementById("trend" + num + 'act').innerHTML.replace(name, name + ", ");
        }
    }
}

function hasNumber(myString) {
    return /\d/.test(myString);
  }

function checkForCookie(){
    var cookie = decodeURIComponent(document.cookie);
    if(cookie != ""){
        console.log(cookie);
        window.location.href = "user.html?" + cookie;
    }
    else{
        console.log("no cookie");
        window.location.href = "login.html";
    }
}


$(document).ready(function getInfo() {
    $.get("/getMovies", loadMovies)
      .then(() => $.get("/getDirectors", loadDirectors)
      .then(() => $.get("/getActors", loadActors)));
  });

