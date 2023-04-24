function selected(selector){
    $("#" + selector + "DD").addClass('selected');
    $("#" + selector + "DD").siblings().removeClass('selected');
    getSortStyle();    
}
function showDirectors(data, status) {
    if (status) {
      console.log(data);
      $('#directorList').empty();
  
      data.forEach(director => {            
            $('#directorList').append(`<li class="trending">
            <button class="li-btn" onclick="window.location.href=\'/director.html#` + director.id + `\'">
            <img style="float: left;" src="` + director.Selfie + `" class="me-3">
            <h2>` + director.fname + " " + director.lname + `</h2>
            <p>` + director.birthday.split("T")[0] + `</p>
            <p>` + director.placeOfBirth + `</p>
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
    console.log("hello")
    $.get('/getSortedDirectors', { 'agg': JSON.stringify(agg) }, showDirectors);
  };

  $(document).ready(function () {
    getSortStyle();

    const urlParams = new URLSearchParams(window.location.search).get('sortBy');
    if (urlParams) {
      selected(urlParams);
    }
  });
  