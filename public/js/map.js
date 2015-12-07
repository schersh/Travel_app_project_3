var map;
 var infoWindow;
 var service;

     function initialize() {
       map = new google.maps.Map(document.getElementById('mapDiv'), {
         center: {lat: 38.90, lng: -77.05},
         zoom: 14,
       });




 // Initialize the map on the page.

     // required google services
     infoWindow = new google.maps.InfoWindow();
     service = new google.maps.places.PlacesService(map);
     // service.getDetails(requestPlace, callback);
     map.addListener('idle', performSearch);

     // Autocomplete feature for the search box
     var input = document.getElementById("search");
     new google.maps.places.Autocomplete(input);


     // var requestPlace = {
     //   placeId:
     // }

     function performSearch() {
       var searchType = document.getElementById('searchType').value;
       var request = {
         bounds: map.getBounds(),
         keyword: searchType
       };
       service.radarSearch(request, callback);
     }


     function callback(results, status) {
       if (status !== google.maps.places.PlacesServiceStatus.OK) {
         console.error(status);
         return;
       }
       for (var i = 0, result; result = results[i]; i++) {
         addMarker(result);
       }
     }

     function addMarker(place) {
       var marker = new google.maps.Marker({
         map: map,
         position: place.geometry.location,
         icon: {
           url: 'http://maps.gstatic.com/mapfiles/circle.png',
           anchor: new google.maps.Point(10, 10),
           scaledSize: new google.maps.Size(10, 17)
         }
       });
     }

     service.getDetails({ placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
     }, function(place, status) {
       if (status === google.maps.places.PlacesServiceStatus.OK) {
         var marker = new google.maps.Marker({
           map: map,
           position: place.geometry.location
         });
         google.maps.event.addListener(marker, 'click', function() {
           infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
             'Place ID: ' + place.place_id + '<br>' +
             place.formatted_address + '</div>');
           infowindow.open(map, this);
         });
       }
     });

   // Add a custom marker on the GA building.
   var gaMarker = new google.maps.Marker({
     icon: "./images/General_Assembly_logo.png",
     position: new google.maps.LatLng(38.904895,-77.034021),
     map: map,
     title: "General Assembly"
   });

   var gaContent = "<h1>General Assembly</h1>" + "<br>" + "<p>This application was made at General Assembly's Washington, D.C. campus.</p>";

   // This is a google maps API feature that allows you to add a content box to a marker on the map.
   var gaWindow = new google.maps.InfoWindow({
     content: gaContent
   });

   // Google API special map listener function that opens our custom GA info window.
   google.maps.event.addListener(gaMarker, "click", function(){
     gaWindow.open(map, gaMarker)
   });

   // Get location form data
   var geocoder = new google.maps.Geocoder();
   $("#submit").on("click", function(){
     geocodeAddress(geocoder, map)
   })

   // Search for an address using the Google APIs Geocoder function
   function geocodeAddress(geocoder, resultsMap) {
     var address = document.getElementById('search').value;
     geocoder.geocode({'address': address}, function(results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
       map.setCenter(results[0].geometry.location);
       var marker = new google.maps.Marker({
           map: map,
           position: results[0].geometry.location
       });
     } else {
       alert("Geocode was not successful for the following reason: " + status);
     }
     });
   };
 }
