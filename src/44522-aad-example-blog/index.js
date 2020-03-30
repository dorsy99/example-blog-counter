import { createCustomElement } from '@servicenow/ui-core';
// import { createHttpEffect } from '@servicenow/ui-effect-http';
import '@servicenow/now-button';
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
//const endpoint = "https://wizardly-wing-66188a.netlify.com/.netlify/functions/server/";
const endpoint = '/api/now/table/incident?sysparm_limit=1'
const fetchUserEffect = createHttpEffect(endpoint, { 
	method: 'GET',
	headers: {
	},
 });

// Handle when user fetch succeeded: log the result
const handleFetchUserSucceeded = ({action, updateState}) => {
	var x = action.payload;
	//console.log(x);
	updateState({
		path: "test",
		value: x,
		operation: "set"
	})
}

// Handle when user fetch failed: alert failure message
const handleFetchUserFailed = ({action}) => {
	//alert('User fetch failed!');
	console.log(action);
}


// VIEW
const view = (state, {dispatch, updateState}) => {
	console.log(state);
	//getUser();
	function buttonClicked() {
		dispatch('BUTTON_CLICKED');
	}
	function getUser() {
		dispatch('USER_FETCHED', {url: '/api/test1'});
	}
	var output = '';
	if (state.test.punchline) {
		output = <div>PUNCHLINE: {state.test.punchline}</div>
	}

	return (
		<div>
			<div><h1>Hello World! Finally, Amirite?</h1></div>
			<div><now-button cta="Positive" iconName="" iconSet="solid" label="Log something to console" size="md" variant="primary" on-click={buttonClicked}></now-button></div>
			<div><now-button cta="Positive" iconName="" iconSet="solid" label="Show a joke" size="md" variant="primary" on-click={getUser}></now-button></div>
			<div>JOKE: {state.test.joke}</div>
			{output}
		</div>
	);
};

createCustomElement('x-44522-aad-example-blog', {
	renderer: { type: snabbdom },
	initialState: {
		test: {
			joke: "Now Experience Documentation", 
			//punchline: "Haha"
		}
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

