$(document).ready(function loadContent() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get('search')
    $.get('/searchContents', addData);

  });

function addData(data){
    console.log(data);
}