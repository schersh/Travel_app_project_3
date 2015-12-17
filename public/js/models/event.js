var Event = function(info){
  this.city = info.city;
  this.state = info.state;
}

//ERICA: loadForecast? self.tempF? Careful about copying and pasting code without changing details...
Event.prototype.loadForecast = function(){
  var self = this
  // url to hit the API endpoint, make sure to put your key in!
  var url ="http://www.nvivo.es/api/request.php?api_key=8e544baadf97a35bd6a0ccb7069be716&method=city.getEvents&city=" + this.state + "/" + this.city + ".json"
  // makes the AJAX get request using $.getJSON() passing in the URL above
  var request = $.getJSON(url)
  // in this promise `.then` we'll set some attributes for a Forecast by drilling
  //  through the response we get back from the API
  .then(function(response){
    self.tempF = response.current_observation.temp_f
    self.iconUrl = response.current_observation.icon_url
    self.description = response.current_observation.weather
  })
  return request
}
