// Copyright 2014 Peter Rood

var buttonPosition,
	head,
	searchButton,
	searchField,
	searchID,
	searchQuery = 'pants',
	searchText,
	script,
	site;

// Load annyang speech recognition library
head = document.getElementsByTagName('head')[0];
script = document.createElement('script');
script.type= 'text/javascript';
script.src= 'https://cdnjs.cloudflare.com/ajax/libs/annyang/1.1.0/annyang.min.js';
head.appendChild(script);

site = window.location.hostname;

// Assign variables based on current site
switch (site){
	case 'www.amazon.com':
		searchID = '#twotabsearchtextbox';
		buttonPosition = 'parentNode.parentNode.parentNode.parentNode.nextElementSibling.firstElementChild';
		break;
	case 'www.ebay.com':
		searchID = '#gh-ac';
		buttonPosition = 'parentNode.parentNode.parentNode.nextSibling.nextSibling.firstElementChild';
		break;
	case 'www.etsy.com':
		searchID = '#autocomplete-field';
		buttonPosition = 'nextSibling.nextElementSibling';
		break;
	case 'play.google.com':
		searchID = '#gbqfq';
		buttonPosition = 'gbqfq';
		break;
	case 'www.walmart.com':
		searchID = '#searchText';
		buttonPosition = 'parentNode.nextSibling.nextSibling.nextElementSibling';
		break;
	case 'www.zappos.com':
		searchID = '#globalSearchField';
		buttonPosition = 'nextElementSibling';
		break;
	default:
		searchID = '';
		break;
}
/*
if (annyang) {
	var search = function() {
	if (searchID !== '') {
	searchField = getSearchField();
	searchField.value = term;
	searchButton = getSearchButton(buttonPosition);
	searchButton.click();
	} else {
		alert("Voice navigation hasn't been enabled on this site yet.\n" +
			"Please request that this site be added.\n" +
			"http://bit.ly/voicenavigation");
	}
}
	var commands = {
	// annyang will capture anything after a splat (*) and pass it to the function.
	// e.g. saying "Show me Batman and Robin" is the same as calling showFlickr('Batman and Robin');
	'search *term': search,
	};

  annyang.addCommands(commands);

  annyang.start();
}
*/
search(searchQuery);

/*
if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
	var recognition = new webkitSpeechRecognition();
}
*/

function getSearchButton(buttonPosition) {
	switch (buttonPosition) {
		case 'gbqfq':
			return document.querySelector('#gbqfb');
			break;
		case 'nextElementSibling':
			return searchField.nextElementSibling;
			break;
		case 'nextSibling.nextElementSibling':
			return searchField.nextSibling.nextElementSibling;
			break;
		case 'parentNode.nextSibling.nextSibling.nextElementSibling':
			return searchField.parentNode.nextSibling.nextSibling.nextElementSibling;
			break;
		case 'parentNode.parentNode.parentNode.nextSibling.nextSibling.firstElementChild':
			return searchField.parentNode.parentNode.parentNode.nextSibling.nextSibling.firstElementChild;
			break;
		case 'parentNode.parentNode.parentNode.parentNode.nextElementSibling.firstElementChild':
			return searchField.parentNode.parentNode.parentNode.parentNode.nextElementSibling.firstElementChild;
			break;
		default:
			return '';
			break;
	}
}

function getSearchField() {
	return document.querySelector(searchID);
}

function search(searchQuery) {
	if (searchID !== '') {
		searchField = getSearchField();
		searchField.value = searchQuery;
		searchButton = getSearchButton(buttonPosition);
		searchButton.click();
	} else {
		alert("Voice navigation hasn't been enabled on this site yet.\n" +
			"Please request that this site be added.\n" +
			"http://bit.ly/voicenavigation");
	}
}

function upgrade() {
	alert('Web Speech API is not supported by this browser.\n' +
		'Please upgrade to Chrome version 25 or later.\n' +
		"https://www.google.com/chrome");
}
