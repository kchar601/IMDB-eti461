function showMovies(data, status) {
    if (status) {
      //console.log(data);
        $('#movieList').empty();
  
      data.forEach(movie => {
            $('#movieList').append(`<li class="trending">
            <button class="btn btn-light" style="float: right;" type="button" onclick="window.location.href=\'/movie.html#` + movie.id + `\'">Edit<i class="fas fa-edit ms-3"></i></button>
            <button class="li-btn" onclick="window.location.href=\"/movies.html#" + ` + movie.id + ` + "\"">
            <img class="small-poster" alt="poster" style="float: left;" src="` + movie.poster + `">
            <h2>` + movie.title + ` </h2>
            <p>` + movie.desc + `</p>
            </button>
            </li>`);
            
    })}
}

$(document).ready(function(){
    $.get('/getMovies', showMovies);
});