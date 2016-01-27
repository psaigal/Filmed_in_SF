$.getJSON('https://data.sfgov.org/api/views/yitu-d5am/rows.json?accessType=DOWNLOAD', function(data) {
    //data is the JSON string
    var arrayOfObjects = []
    var arrayOfInformation = data.data;
      for (index in arrayOfInformation) {
        arrayOfObjects.push({name:arrayOfInformation[index][14], location: arrayOfInformation[index][10]})
    }
    // input = "Luis Mandoki";
    for (index in arrayOfObjects) {
      if (arrayOfObjects[index].name == input) {
        $("#container").append(arrayOfObjects[index].location + "<br>");
      }
    }
});




