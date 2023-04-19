function showEditableMovie(data, status){
    if(!status){
        console.log("error");
    }
    else{
    const url =  window.location.href;
    const movieID = url.split("#")[1];
    console.log(data);
    data.forEach(movie => {
        console.log(movie.title)
        if (movie.id == movieID) {
            $("#movie-poster").attr("src", movie.poster);
            $("#title-input").attr("value", movie.title);
            $("#desc-input").append(movie.desc);
            $("#rating-input").attr("value", movie.rated.toUpperCase());
        }
    });
    }
};


$(document).ready(function(){
    if(!document.cookie){
        console.log("user");
        $.get("/getMovies", sortMovie)    
    }
    else{
        const role = document.cookie.split('=')[3].split(';')[0];
        console.log(role);
        if(role == "admin"){
            console.log("admin");
            $.get("/getMovies", showEditableMovie)
        }
        else{
            console.log("user");
            $.get("/getMovies", sortMovie) 
        }
    }
});