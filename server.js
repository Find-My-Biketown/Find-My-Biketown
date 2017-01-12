var express = require('express'),
  requestProxy = require('express-request-proxy'),
  port = process.env.PORT || 3000,
  app = express();

app.use(express.static('./'));
app.get('/googleMaps', proxyGoogle);

function proxyGoogle(request, response) {
  (requestProxy({
    url: 'https://maps.googleapis.com/maps/api/js',
    query: {
      key: process.env.API_KEY,
      libraries: 'places',
      callback: 'initMap()'
    }
  }
))(request, response);
};


app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
