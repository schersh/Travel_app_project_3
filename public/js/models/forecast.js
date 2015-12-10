$(document).ready(function(){
$("#submit").on("click", function(){
  searchTerms = $("#search").val().split(", ");
  console.log(searchTerms)
    var url = "http://api.wunderground.com/api/af2a6647675184fd/conditions/q/" + searchTerms[1] + "/" + searchTerms[0] + ".json"
  var result = $.getJSON(url).then(function(response){
    //var forecast = response.forecast
    console.log(response)
    self.tempF = response.current_observation.temp_f
    self.iconUrl = response.current_observation.icon_url
    self.description = response.current_observation.forecast
  });
});
});
