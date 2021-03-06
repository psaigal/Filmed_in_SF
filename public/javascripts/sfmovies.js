$(document).ready(function() {
  arrayOfObjects = []

  $.getJSON('https://data.sfgov.org/resource/yitu-d5am.json', function(data) {
      //data is the JSON string
      var arrayOfInformation = data;
        for (index in arrayOfInformation) {
          arrayOfObjects.push({name:arrayOfInformation[index].title, location: arrayOfInformation[index].locations, releaseYear: arrayOfInformation[index].release_year, productionCompany: arrayOfInformation[index].production_company, director: arrayOfInformation[index].director})
      };
  })
  .done(function(){
      $(function() {
        var menuItems = [];
        for (index in arrayOfObjects) {
          menuItems.push(arrayOfObjects[index].name);
        }
        uniqueNames = menuItems.filter(function(item, pos) {
          return menuItems.indexOf(item) == pos;
        });
        $("#address").autocomplete({
          source: uniqueNames
        });
      });//end self-invoked function
  }); //end done




   //  $('#search').submit(function(event) {
   //  event.preventDefault();
   //  var path = $('#search').attr("action")
   //  var formData = $('#movie-form').serialize();
   //  $.ajax({
   //    url: '/submit',
   //    type: 'POST',
   //    data: formData,
   //    success: function(data) {
   //    console.log(data);
   //    console.log('Successful');
   // },

   //  error: function() {
   //    console.log('Error');
   //  }
   //  })
  //   .done(function(response){
  //     movieSearchTerm = response.nameOfMovie;
  //     for (index in arrayOfObjects) {
  //       console.log(arrayOfObjects[index].name);
  //       if (arrayOfObjects[index].name == movieSearchTerm) {
  //         // console.log(arrayOfObjects[index].location);
  //         $("#container").append(arrayOfObjects[index].location + "<br>");
  //       }
  //     }
  //   });
  // });

  });


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 37.775863, lng: -122.405674}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    var movieInput = $('#address').val();
    geocodeAddress(geocoder, map, movieInput);
  });


function geocodeAddress(geocoder, resultsMap, movieName) {
  var foundMatch = false;
  $("#container").append('<h4>Locations:</h4>')
  for (index in arrayOfObjects) {
      if (arrayOfObjects[index].name == movieName) {
        foundMatch = true;
        var address = arrayOfObjects[index].location + " San Francisco, CA";
        $("#container").append(arrayOfObjects[index].location + "<br>");
        var contentString = '<div id="content">' + 'Movie Title: ' + arrayOfObjects[index].name + '<br>' + 'Location: ' + arrayOfObjects[index].location + '<br>' + '</div>';
        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 200
        });
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });

            marker.addListener('mouseover', function() {
                infowindow.open(map, marker);
            });

          }
          else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
      else {
        console.log("No matches")
      }
    }
    if (foundMatch == false) {
      $("h5").append("<p>Sorry no matches were found</p>");
    }
  }
}



