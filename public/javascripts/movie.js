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
                $("#movie-title-header").text(movie.title);
                $("#movie-poster2").attr("src", movie.poster);
                $("#title-input").attr("value", movie.title);
                $("#desc-input").append(movie.desc);
                $("#rating-input").attr("value", movie.rated.toUpperCase());
                $("#runtime-input").attr("value", movie.runtime);
                $("#release-input").attr("value", movie.released.split("T")[0]);
                $("#imbd-input").attr("value", movie.imdbrating);
            }
        });
    }
};

function showMovie(data, status){
    if(!status){
        console.log("error");
    }
    else{
        const url =  window.location.href;
        const movieID = url.split("#")[1];
        data.forEach(movie => {
            if (movie.id == movieID) {
                $("#movie-title-header").text(movie.title);
                $("#movie-poster1").attr("src", movie.poster);
                $("#movie-title").text(movie.title);
                $("#movie-desc").text(movie.desc); 
                $("#movie-rating").text("Rated for: "+movie.rated.toUpperCase()); 
                $("#movie-runtime").text(movie.runtime + " mins");
                $("#movie-release").text("Released on: "+movie.released.split("T")[0]);
                $("#movie-score").text("IMDB Score: "+movie.imdbrating);
            }
    });
    }
}

$(document).ready(function(){
    if(!document.cookie){
        console.log("user");
        $("#editMovie").attr("display", "none");
        $("#editMovie").attr("height", "0px");
        $("#editMovie").removeClass("my-5");
        $("#footer").addClass("fixed-bottom");
        $.get("/getMovies", showMovie)    
    }
    else{
        const role = document.cookie.split('=')[3].split(';')[0];
        console.log(role);
        if(role == "admin"){
            console.log("admin");
            $("#userView").attr("display", "none");
            $("#userView").attr("height", "0px");
            $("#userView").removeClass("my-5");
            $.get("/getMovies", showEditableMovie)
        }
        else{
            console.log("user");
            $("#editMovie").attr("display", "none");
            $("#editMovie").attr("height", "0px");
            $("#editMovie").removeClass("my-5");
            $("#footer").addClass("fixed-bottom");
            $.get("/getMovies", sortMovie) 
        }
    }
});