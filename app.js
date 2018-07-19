var BASE_URL = 'http://api.openweathermap.org/data/2.5/group';

var query = {
  units: 'imperial',
  appid: "4ff7297df1f3ec7c3571266d62a57785",
  id: "5368361,5128581",
}

var state = {};

function getDataFromApi(searchTerm) {

  $.getJSON(BASE_URL, query)
    .done(function(data) {
      getData(data);
    })
    .fail(function() {
      $('.js-answer').html('<p>Oh no! Openweathermap.org appears to be down.<p><br><br><iframe width="280" height="158" src="https://www.youtube.com/embed/W8_Kfjo3VjU" frameborder="0" allowfullscreen></iframe>');
  })
};

function getData(data) {

  if (data.list[0]) {
    state.laTemp = parseInt(data.list[0].main.temp);
    state.nyTemp = parseInt(data.list[1].main.temp);
    state.laSky = (data.list[0].weather[0].main);
    state.nySky = (data.list[1].weather[0].main);
    state.laIcon = (data.list[0].weather[0].icon);
    state.nyIcon = (data.list[1].weather[0].icon);

    calculateData(state);
  }
};

function calculateData(state) {

    if (state.laSky === state.nySky) {

      if ((state.laTemp - state.nyTemp) <= 2 && (state.nyTemp - state.laTemp) <= 2) {
        state.result = "Yes.";
      }
      else if ((state.laTemp - state.nyTemp) <= 6 && (state.nyTemp - state.laTemp) <= 6) {
        state.result = "Pretty close.";
      }
      else if ((state.laTemp - state.nyTemp) <= 10 && (state.nyTemp - state.laTemp) <= 10) {
        state.result = "Sort of.";
      }
      else if ((state.laTemp - state.nyTemp) <= 14 && (state.nyTemp - state.laTemp) <= 19) {
        state.result = "Not really.";
      }
      else {
        state.result = "Nope.";
      }
   }
   else {
     state.result = "Nope.";
   }
showResult(state);
};

function showResult(state) {
  $('.js-answer').text(state.result);
  $('.weather').removeAttr('hidden');
  $('.la-weather').html('<h3>Los Angeles</h3><img src="http://openweathermap.org/img/w/' + state.laIcon + '.png"><br><p>Current conditions: ' + state.laTemp + '°F, ' + state.laSky + '</p>');
  $('.ny-weather').html('<h3>New York</h3><img src="http://openweathermap.org/img/w/' + state.nyIcon + '.png"><br><p>Current conditions: ' + state.nyTemp + '°F, ' + state.nySky + '</p>');
};

$(document).ready(function() {
  getDataFromApi(query);
});
