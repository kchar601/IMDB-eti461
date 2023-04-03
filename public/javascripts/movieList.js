function selected(selector){
    $(selector).addClass('selected');
    $(selector).siblings().removeClass('selected');
}

function showMovies(data, status){
    if(status){
        console.log(data);
        data.forEach(movie => {
            actors = [];
            movie.actors.forEach(function(actor) {
                for(var i = 0; i < actorList.length; i++){
                    if(actorList[i].id == actor){
                        actors.push(" " + actorList[i].fname + " " + actorList[i].lname + " ");
                    }}
                });
            directors = [];
            for(var i = 0; i < directorList.length; i++){
                if(directorList[i].id == movie.director){
                    directors.push(" " + directorList[i].fname + " " + directorList[i].lname + " ");
            }};  
            console.log(directors);
            console.log(actors);             
            $('#movieList').append(`<li class="trending">
            <button class="li-btn" onclick="window.location.href=\"/movies.html#" + ` + movie.id + ` + "\"">
            <img style="float: left;" src="` + movie.poster + `">
            <h2>` + movie.title + `</h2>
            <p>` + movie.desc + `</p>
            <p>` + directors + `</p>
            <p>` + actors + `</p>
            </button>
            </li>`);
            
    })}
}

var directorList = $.get('/getDirectors', setDirectorList);
var actorList = $.get('/getActors', setActorList);

function setDirectorList(data, status){
    if(status){
        directorList = data;
    }
}

function setActorList(data, status){
    if(status){
        actorList = data;
    }
}

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('sortBy'));
    $.get('/getMovies', urlParams.get('sortBy'), showMovies);
})