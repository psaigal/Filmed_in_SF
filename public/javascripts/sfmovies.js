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
        console.log(arrayOfObjects);
        var menuItems = [];
        for (index in arrayOfObjects) {
          menuItems.push(arrayOfObjects[index].name);
          console.log(menuItems)
        }
        $("#address").autocomplete({
          source: menuItems
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
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    var movieInput = $('#address').val();
    geocodeAddress(geocoder, map, movieInput);
  });


function geocodeAddress(geocoder, resultsMap, movieName) {
  $("#container").append('<h4>Locations:</h4>')
  for (index in arrayOfObjects) {
        if (arrayOfObjects[index].name === movieName) {
          var address = arrayOfObjects[index].location + " San Francisco, CA";
          var contentString = '<div id="content">' + 'Movie Title: ' + arrayOfObjects[index].name + '<br>' + 'Location: ' + arrayOfObjects[index].location + '<br' + '</div>';
          var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
          });
          $("#container").append(arrayOfObjects[index].location + "<br>");

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
          console.log('no match')
        }
      }
    }
  }
