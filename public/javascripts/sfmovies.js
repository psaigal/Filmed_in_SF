var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -35.397, lng: 150.644},
    zoom: 8
  });
}


$(document).ready(function() {
  arrayOfObjects = []

  $.getJSON('https://data.sfgov.org/api/views/yitu-d5am/rows.json?accessType=DOWNLOAD', function(data) {
      //data is the JSON string
      var arrayOfInformation = data.data;
        for (index in arrayOfInformation) {
          arrayOfObjects.push({name:arrayOfInformation[index][14], location: arrayOfInformation[index][10]})
      }


    $('#movie-form').submit(function(event) {
    event.preventDefault();
    var path = $('#movie-form').attr("action")
    var formData = $('#movie-form').serialize();
    console.log(formData);
    $.ajax({
      url: '/submit',
      type: 'POST',
      data: formData,
      success: function(data) {
      console.log(data);
      console.log('Successful');
   },

    error: function() {
      console.log('Error');
    }
    })
    .done(function(response){
      movieSearchTerm = response.nameOfMovie;
      for (index in arrayOfObjects) {
        if (arrayOfObjects[index].name == movieSearchTerm) {
          $("#container").append(arrayOfObjects[index].location + "<br>");
        }
      }
    });
  });
  });
});

