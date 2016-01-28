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
        console.log(arrayOfObjects[index].name);
        if (arrayOfObjects[index].name == movieSearchTerm) {
          // console.log(arrayOfObjects[index].location);
          $("#container").append(arrayOfObjects[index].location + "<br>");
        }
      }
    });
  });
  });
});

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    console.log('click');
    var movieInput = $('#address').val();
    console.log(movieInput);
    geocodeAddress(geocoder, map, movieInput);
  });
}

function geocodeAddress(geocoder, resultsMap, movieName) {
   console.log(movieName);
  for (index in arrayOfObjects) {
        if (arrayOfObjects[index].name === movieName) {
          var address = arrayOfObjects[index].location + " San Francisco, CA";
            geocoder.geocode({'address': address}, function(results, status) {
              if (status === google.maps.GeocoderStatus.OK) {
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                  map: resultsMap,
                  position: results[0].geometry.location
                });
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            });
        } else{
          console.log('no match')
        }
  }

}
