 var map;
 var infoWindow;
 var service;

 // Initalize the map and center it on Washington, D.C.
 function initialize() {
   map = new google.maps.Map(document.getElementById('mapDiv'), {
     center: {
       lat: 38.90,
       lng: -77.05
     },
     zoom: 14,
   });


   // required google services
   infoWindow = new google.maps.InfoWindow();
   service = new google.maps.places.PlacesService(map);

   map.addListener('idle', performSearch);

   // Autocomplete feature for the search box
   var input = document.getElementById("search");
   new google.maps.places.Autocomplete(input);


   // Function of the search bar
   function performSearch() {
     var searchType = document.getElementById('searchType').value;
     var request = {
       bounds: map.getBounds(),
       keyword: searchType
     };
     service.radarSearch(request, callback);
   };

   // Callback that places markers
   function callback(results, status) {
     if (status !== google.maps.places.PlacesServiceStatus.OK) {
       console.error(status);
       return;
     }
     for (var i = 0, result; result = results[i]; i++) {
       addMarker(result);
     }
   }

   // Put the marker on the map, please
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

     // This frustrated me.
     google.maps.event.addListener(marker, 'click', function() {
       service.getDetails(place, function(result, status) {
         if (status !== google.maps.places.PlacesServiceStatus.OK) {
           console.error(status);
           return;
         }
         var placeUrl = result.website;
         infoWindow.setContent(result.name + "<br />" + result.formatted_address + "<br />" + result.formatted_phone_number + "<br />" + "Google Rating: " + result.rating + "<br />" + "Price Level: " + result.price_level + "<br />" + "<a href=\"" + placeUrl + "\">" + placeUrl + "</a>" + "<br />" + "Most Helpful Review: " + result.reviews[0].text + "<br />");
         infoWindow.open(map, marker);
       });
     });
   }
   // Add a custom marker on the GA building.
   var gaMarker = new google.maps.Marker({
     icon: "./images/General_Assembly_logo.png",
     position: new google.maps.LatLng(38.904895, -77.034021),
     map: map,
     title: "General Assembly"
   });

   var gaContent = "<h1>General Assembly</h1>" + "<br>" + "<p>This application was made at General Assembly's Washington, D.C. campus.</p>";

   // This is a google maps API feature that allows you to add a content box to a marker on the map.
   var gaWindow = new google.maps.InfoWindow({
     content: gaContent
   });

   // Google API special map listener function that opens our custom GA info window.
   google.maps.event.addListener(gaMarker, "click", function() {
     gaWindow.open(map, gaMarker)
   });

   // Get location form data
   var geocoder = new google.maps.Geocoder();
   $("#submit").on("click", function() {
     geocodeAddress(geocoder, map)
   })

   // Search for an address using the Google APIs Geocoder function
   function geocodeAddress(geocoder, resultsMap) {
     var address = document.getElementById('search').value;
     geocoder.geocode({
       'address': address
     }, function(results, status) {
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
