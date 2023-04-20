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

function showMovies(data, status) {
    if (status) {
      //console.log(status);
        $('#movieList').empty();
        findMatch(data);
  
      data.forEach(movie => {
        actors = [];
            movie.actors.forEach(function(actor) {
                for(var i = 0; i < actorList.length; i++){
                    if(actorList[i].id == actor){
                        actors.push(" " + actorList[i].fname + " " + actorList[i].lname);
                    }}
                });
            directors = [];
            for(var i = 0; i < directorList.length; i++){
                if(directorList[i].id == movie.director){
                    directors.push(" " + directorList[i].fname + " " + directorList[i].lname + " ");
            }};  
            
            //console.log(actors);
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

function findMatch(data){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get('query').toLowerCase();
    //console.log(data);

    const lowercaseData = data.map(obj => {
        const lowercaseData = {};
        for (let key in obj) {
            lowercaseData[key] = typeof obj[key] === 'string' ? obj[key].toLowerCase() : obj[key];
        }
        return lowercaseData;
      });
      

    const results = [];
    
    //shows ratings
    lowercaseData.forEach(element => {
        if (element.rated.includes(query)){
            results.push(data[lowercaseData.indexOf(element)]);
        }
    });

    //shows titles
    lowercaseData.forEach(element => {
        if (element.title.includes(query)){
            results.push(data[lowercaseData.indexOf(element)]);
        }
    });

    //shows descriptions
    lowercaseData.forEach(element => {
        if (element.desc.includes(query)){
            results.push(data[lowercaseData.indexOf(element)]);
        }
    });

    uniqResultsSet = new Set(results);
    uniqResults = [];

    for (const x of uniqResultsSet.values()) {
        uniqResults.push(x);
    }

    if (uniqResults.length == 0){
        document.getElementById("searchingFor").innerText = 'No results for "' + query + '"';
    } else if (uniqResults.length == 1){
        document.getElementById("searchingFor").innerText = uniqResults.length.toString() + ' result for "' + query + '"';
    } else {
        document.getElementById("searchingFor").innerText = uniqResults.length.toString() + ' results for "' + query + '"';
    }

    //this is where all the contents are logged, Keith
    console.log(uniqResults);

} 

$(document).ready(function() {
    $.when(directorList, actorList).done(function () {
        $.get('/getMovies', findMatch);
      });
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get('query');
    document.getElementById("searchingFor").innerText = 'Searching for: "' + query + '"';
});
