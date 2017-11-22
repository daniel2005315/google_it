"use strict";
module.change_code = 1;


var alexa = require( 'alexa-app' );
var app = new alexa.app( 'google_it' );

// Try to use chinese Tokenizer
//var tokenizerC = require('chinese-tokenizer')('./cedict_ts.u8');

// test accessig sentiment_Analyser
var sentiment_Analyser = require.main.require('./process/sAnalyse.js');
var pos_Parser = require.main.require('./process/posParser.js');

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
		var score = sentiment_Analyser.getScore(item);
		var pos = pos_Parser.isNoun(item);
    response.say("The sentiment score for"+ item+" is "+score);
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
