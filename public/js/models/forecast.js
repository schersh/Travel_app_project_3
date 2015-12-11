var Forecast = function(info){
  this.city = info.city;
  this.state = info.state;
}

Forecast.prototype.loadForecast = function(){
  var self = this
  // url to hit the API endpoint, make sure to put your key in!
  var url ="http://api.wunderground.com/api/af2a6647675184fd/conditions/q/" + this.state + "/" + this.city + ".json"
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
