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
        $('#trend'+ id +'btn').attr('onclick', 'window.location.href=\"/movie.html#' + line.id + '\"');
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
    //console.log(id);
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


$(document).ready(function getInfo() {
    $.get("/getMovies", loadMovies)
      .then(() => $.get("/getDirectors", loadDirectors)
      .then(() => $.get("/getActors", loadActors)));
  });


function search(){
    let query = document.getElementById("searchBox").value;
    //console.log(query);
    if (query == null || query == ""){
        return false;
    } else {
        window.location = "/searchResults.html?query=" + encodeURIComponent(query);
    }
    
}

$('#searchBox').on("keyup", function(e) {
    if (e.keyCode == 13) {
        console.log('Enter');
    }
});