module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'google_it' );


app.launch( function( request, response ) {
	response.say( 'This is a testing skill' ).reprompt( 'It should run...' ).shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);
	response.say( 'Sorry an error occured ' + error.message);
};

// First line is Intent's name
app.intent("SearchIntent", {
    "slots": {
      "searchPhrase": "SearchItem"
    },
    "utterances": [
      "find {-|searchPhrase}",
  		"Google about {-|searchPhrase}",
  		"tell me about {-|searchPhrase}",
  		"I want to know about {-|searchPhrase}"
    ]
  },
  function(request,response) {
    var item = request.slot('searchPhrase');
    response.say("You wanted to Google about "+ item);
  }
);


/*
app.intent('SearchIntent',
  {
    "slots":{"SearchItem":"ACTOR"}
	,"utterances":[
		"find {SearchItem}",
		"Google about {SearchItem}",
		"tell me about {SearchItem}",
		"I want to know about {SearchItem}"]
  },
  function(request,response) {
    var number = request.slot('SearchItem');
    response.say("You wanted to search for the actor "+SearchItem);
  }
);
*/
module.exports = app;
