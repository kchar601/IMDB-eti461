$(document).ready(function loadContent() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get('query');
    document.getElementById("searchingFor").innerText = 'Searching for: "' + query + '"';
  });

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
        $('#search'+ id +'btn').attr('onclick', 'window.location.href=\"/movies.html#' + line.id + '\"');
        $('#search'+ id +'img').attr('src', line.poster);
        $('#search'+ id + 'head').text(line.title);
        $('#search' + id + 'desc').text(line.desc);
        $('#search' + id + 'dir').text(line.director);
        line.actors.forEach(function(actor) {
            $('#search' + id + 'act').append(' ' + actor + ' ');
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
    const id = $('#search' + num + 'dir').text();
    if(line.id === parseInt(id, 10)){
        $('#search'+ num +'dir').text("Director: " + line.fname + " " + line.lname);
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
    const id = $('#search' + num + 'act').text();
    //console.log(id);
    var cast = [];
    if(id.includes(' ' + line.id + ' ')){
        const name = line.fname + " " + line.lname;
        $('#search'+ num +'act').text($('#search'+ num +'act').text().replace(line.id, name));
        if(hasNumber(document.getElementById("search" + num + 'act').innerHTML)){
            document.getElementById("search" + num + 'act').innerHTML = document.getElementById("search" + num + 'act').innerHTML.replace(name, name + ", ");
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
    let query = encodeURIComponent(document.getElementById("searchBox").value);
    window.location = "/searchResults.html?query=" + query;
}