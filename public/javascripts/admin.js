function tabSelect(selector){
  $("#" + selector).addClass('selected');
  $("#" + selector).siblings().removeClass('selected');
  switch(selector){
      case 'movies-sidebar-btn':
          $('#movie-content').show();
          $('#movie-content').siblings().hide();
          break;
      case 'actors-sidebar-btn':
          $('#actor-content').show();
          $('#actor-content').siblings().hide();
          break;
      case 'directors-sidebar-btn':
          $('#director-content').show();
          $('#director-content').siblings().hide();
          break;
      case  'users-sidebar-btn':
          $('#user-content').show();
          $('#user-content').siblings().hide();
  }
}

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

function  showActors(data, status) {
    if (status) {
        $('#actorList').empty();
        data.forEach(actor => {
            $('#actorList').append(`<li class="trending">
            <button class="btn btn-light" style="float: right;" type="button" onclick="window.location.href=\'/actor.html#` + actor.id + `\'">Edit<i class="fas fa-edit ms-3"></i></button>
            <button class="li-btn" onclick="window.location.href=\"/actors.html#" + ` + actor.id + ` + "\"">
            <h2 class="text-start">` + actor.fname + ` ` + actor.lname + ` </h2>
            </button>
            </li>`);
            
    })}
}

function showDirectors(data, status) {
    if (status) {
        $('#directorList').empty();
        data.forEach(director => {
            $('#directorList').append(`<li class="trending">
            <button class="btn btn-light" style="float: right;" type="button" onclick="window.location.href=\'/director.html#` + director.id + `\'">Edit<i class="fas fa-edit ms-3"></i></button>
            <button class="li-btn" onclick="window.location.href=\"/directors.html#" + ` + director.id + ` + "\"">
            <h2 class="text-start">` + director.fname + ` ` + director.lname + ` </h2>
            </button>
            </li>`);
    })
  }
}

function showUsers(data, status) {
    if (status) {
        $('#userList').empty();
        data.forEach(user => {
            $('#userList').append(`<li class="trending">
            <button class="btn btn-light red-hover" style="float: right;" type="button" onclick="deleteUser(` + user.id + `)">Delete<i class="fas fa-trash ms-3"></i></button>
            <button class="li-btn" onclick="window.location.href=\"/users.html#" + ` + user.id + ` + "\"">
            <h2 class="text-start">` + user.Fname + ` ` + user.Lname + ` </h2>
            </button>
            </li>`);
    })
  }
}

function deleteUser(id) {
    $.post('/deleteUser', {id: id}, function(data, status){
        if (status) {
            alert(data);
            window.location.reload();
        }
    });
}

$(document).ready(function(){
    $.get('/getMovies', showMovies);
    $.get('/getActors',  showActors);
    $.get('/getDirectors', showDirectors);
    $.get('/getUsers', showUsers);
});