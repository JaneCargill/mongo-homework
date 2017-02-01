var Film = require('./film');
var Review = require('./review');

var Films = function() {

  // var review1 = new Review({
  //   comment: "It's not even a thing. What just happened. I want my life back.",
  //   rating: 1,
  //   author: "Val"
  // });

  // var review2 = new Review({
  //   comment: "Pew pew pew lightsabers space cowboys whoot what's not to love",
  //   rating: 100,
  //   author: "Val"
  // });

  // var film1 = new Film({
  //   title: "Now You See Me",
  //   actors: ["Woody Harrelson", "Jesse Eisenberg"],
  //   genre: "Mystery"
  // });

  // var film2 = new Film({
  //   title: "Star Wars Episode IV: A New Hope",
  //   actors: ["Harrison Ford", "Alec Guiness"],
  //   genre: "Action"
  // });

  // film1.addReview(review1);
  // film2.addReview(review2);

  // return [film1, film2];
}

Films.prototype = {
  makeRequest: function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
  },

makePostRequest: function(url, callback, newData) {
  var data = JSON.stringify(newData);
  var request = new XMLHttpRequest();
  request.open('POST', url);
  request.onload = callback;
  request.send(data);
},

  all: function(callback) {
    var self = this;
    //this = film object itself
    this.makeRequest("http://localhost:3000/api/films", function() {
      if(this.status !== 200) {
        return;
      }
      var jsonString = this.responseText;
      //this here = the reqeust object
      var results = JSON.parse(jsonString);
      console.log(results);
      var films = self.populateFilms(results);
      //.bind(this) cannot be used as it would override this.responseText
      callback(films);
    })
  },
  populateFilms: function(results) {
    var films = [];

    for (var result of results) {
      var film = new Film(result);
      films.push(film);
    }
    return films;
  }
  // submitForm: function(form) {
  //   var title = document.querySelector('#title');
  //   var actors = document.querySelector('#actors');
  //   var genre = document.querySelector('#genre');

  //   var newFilm = new Film() {
  //     this.title = title.value;
  //     this.actors = actors.value;
  //     this.genre = genre.value;
  //   }
    
}

module.exports = Films;
