var MongoClient = require ('mongodb').MongoClient;

var FilmQuery = function() {
  this.url = 'mongodb://localhost:27017/ratings_site';

};

FilmQuery.prototype = {
  all: function(onQueryFinished) {
    MongoClient.connect(this.url, function(error, db) {
      // if (db) {
      //   console.log("connected!");
      // } 
      var collection = db.collection('films');
      collection.find().toArray(function(err, docs)
        {
          onQueryFinished(docs); 
        });
    })
  },

  add: function(film, onQueryFinished)  {
    MongoClient.connect(this.url, function(err, db) {
      var collection = db.collection('films');
      collection.insert(film);
      collection.find().toArray(function(err, docs) {
        onQueryFinished(docs);
      });
    });
    // console.log(db.collection.find);
  }
};

module.exports = FilmQuery;