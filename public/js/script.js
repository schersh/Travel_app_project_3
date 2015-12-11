$(document).ready(function(){
  $("#submit").on("click", function(e){
    e.preventDefault()
    searchTerms = $("#search").val().split(", ");
    // e.preventDefault()
    var city = searchTerms[0]
    var state = searchTerms[1]
    forecast = new Forecast({city: city, state: state})
    forecast.loadForecast().then(function(){
      view = new ForecastView(forecast)
      view.render()
    })
  })
});

$(document).ready(function(){
      $('.slider').slider({full_width: true});
    });
