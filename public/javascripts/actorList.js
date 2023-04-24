function selected(selector){
    $("#" + selector + "DD").addClass('selected');
    $("#" + selector + "DD").siblings().removeClass('selected');
    getSortStyle();    
}
function showActors(data, status) {
    if (status) {
      $('#actorList').empty();
  
      data.forEach(actor => {            
            $('#actorList').append(`<li class="trending">
            <button class="li-btn" onclick="window.location.href=\'/actor.html#` + actor.id + `\'">
            <img style="float: left;" src="` + actor.selfie + `" class="me-3">
            <h2>` + actor.fname + " " + actor.lname + `</h2>
            <p>` + actor.birthday.split("T")[0] + `</p>
            <p>` + actor.placeOfBirth + `</p>
            </button>
            </li>`);
            
    })}
}

function getSortStyle() {
    const urlParams = new URLSearchParams(window.location.search).get('sortBy');
    //console.log(urlParams);
    let agg;
    switch (urlParams) {
      case 'firstName':
        agg = [{ '$sort': { 'fname': 1 } }];
        break;
      case 'lastName':
        agg = [{ '$sort': { 'lname': 1 } }];
        break;
      case 'age':
        agg = [{ '$sort': { 'birthday': 1 } }];
        break;
      default:
        agg = [{ '$sort': { 'id': 1 } }];
    }
    $.get('/getSortedActors', { 'agg': JSON.stringify(agg) }, showActors);
  }   

  $(document).ready(function () {
    getSortStyle();

    const urlParams = new URLSearchParams(window.location.search).get('sortBy');
    if (urlParams) {
      selected(urlParams);
    }
  });
  