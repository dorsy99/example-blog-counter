import { createCustomElement } from '@servicenow/ui-core';
// import { createHttpEffect } from '@servicenow/ui-effect-http';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

async function httpEffect(url, options, coeffects) {
	const {action, dispatch} = coeffects;
  
	dispatch('FETCH_STARTED');
	try {
	  const result = await fetch(url, options);
	  let data = await result.json();
	  dispatch('FETCH_SUCCEEDED', data);
	} catch(e) {
	  dispatch('FETCH_FAILED', e, {} /* meta */, true /* error */);
	}
}

function createHttpEffect(url, options) {
	return {
	  effect: httpEffect,
	  args: [url, options]
	};
}

//ACTIONS
const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
const FETCH_USER = "FETCH_USER";
const BUTTON_CLICKED = 'BUTTON_CLICKED';


//HTTP EFFECT
/*
const fetchUserEffect = createHttpEffect(':url', {
	method: 'POST',
	headers: {},
	pathParams: ['url'],
	dataParam: 'data',
	successActionType: USER_FETCH_SUCCESS
});
*/

// Create the effect for fetching a user
const endpoint = "https://wizardly-wing-66188a.netlify.com/.netlify/functions/server/";
// const endpoint = "https://thevirustracker.com/free-api?countryTotal=id";
const fetchUserEffect = createHttpEffect(endpoint, { 
	method: 'GET',
	headers: {
		//"user-agent": "sn",
		//"Access-Control-Allow-Origin": "*",
		//"Content-Type": "application/json",
		//"origin": "https://testsite.com"
	},
	//mode: 'no-cors'
	//successActionType: USER_FETCH_SUCCESS
 });

// Handle when user fetch succeeded: log the result
const handleFetchUserSucceeded = ({action}) => {
	var x = action.payload;
	//console.log();
	updateState({
		path: "test",
		value: x,
		operation: "set"
	})
}

// Handle when user fetch failed: alert failure message
const handleFetchUserFailed = ({action}) => alert('User fetch failed!');


// VIEW
const view = (state, {dispatch, updateState}) => {
	console.log(state);
	function buttonClicked() {
		dispatch('BUTTON_CLICKED');
	}
	function getUser() {
		dispatch('USER_FETCHED', {url: '/api/test1'});
	}

	return (
		<div>
			<div>Hello World! Finally, Amirite?</div>
			<a href="#" on-click={buttonClicked}>CLICK ME</a>
			<br /><br />
			<a href="#" on-click={getUser}>Fetch User?</a>
		</div>

	);
};

createCustomElement('x-44522-aad-example-blog', {
	renderer: { type: snabbdom },
	initialState: {
		test: "init"
	},
	/* updateState({
		firstName: 'Fred',
		lastName: 'Luddy'
	}), */
	actionHandlers: {
		'BUTTON_CLICKED': (coeffects) => console.log("A link was clicked"),
		'USER_FETCHED': fetchUserEffect,
		'FETCH_SUCCEEDED': handleFetchUserSucceeded,
		'FETCH_FAILED': handleFetchUserFailed
	},
	view,
	styles
});

