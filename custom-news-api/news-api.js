var https = require('https');
var db = require('./db');

const apiKey = 'f38cdd0cf03640369769a6ddb7032400';
var sourcesUrl = 'https://newsapi.org/v2/sources?' +
        'country=us&' +
        'category=sports&' +
        'apiKey=' + apiKey;

module.exports = {
  setSources: function() {
    // Set default sources and articles
    https.get(sourcesUrl, (resp) => {
      let data = '';

      // Piece together data by https "chunks"
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // When everything has been received...
      resp.on('end', () => {
        // Get sources off of response and save 5 to database
        let sources = JSON.parse(data).sources;
        for (var i = 0; i < 5; i++){
          let source = sources[i];
          let dbSource = {
            id: source.id,
            name: source.name,
            description: source.description
          };
          if(db.get('sources').find({id: dbSource.id}).value() == null){
            db.get('sources').push(dbSource).write();
          }
        }
      });

    });
  },

  getArticles: function(sourceId) {
    var url = 'https://newsapi.org/v2/everything?' +
            'pageSize=10&' +
            'sources=' + sourceId + '&' +
            'apiKey=' + apiKey;

    // Return a promise since we need this info, not saving to db like above
    return new Promise((resolve, reject) => {
      https.get(url, (resp) => {
        let data = '';

        // Piece together data by https "chunks"
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // When everything has been received resolve the articles
        resp.on('end', () => {
          resolve(JSON.parse(data).articles);
        });

        // Reject promise on error
        resp.on('error', reject);
      });
    });
  }
}
