import {createCustomElement} from '@servicenow/ui-core';
import '@servicenow/now-button';
import {createHttpEffect} from '@servicenow/ui-effect-http';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const INC_FETCH_SUCCESS = 'INC_FETCH_SUCCESS'

//testing
const endpoint = '/api/now/table/incident?sysparm_limit=1';

const fetchIncEffect = createHttpEffect(endpoint, {
    method: 'GET',
    headers: {},
    //pathParams: ['url'],
    //dataParam: 'data',
    successActionType: INC_FETCH_SUCCESS
});

const handleFetchIncSucceeded = ({action, updateState}) => {
	var x = action.payload;
    console.log(x);
    //console.log(state);
	updateState({
		path: "inc",
		value: {
            number: x.result[0].number,
            sys_id: x.result[0].sys_id
        },
		operation: "set"
	}) 
}

/*
		inc: {
			number: "INC1234",
			sys_id: "test"
		}
*/

const view = (state, {dispatch, updateState}) => {
	function getIncident() {
		dispatch('INC_FETCHED', {url: '/api/now/table/incident?sysparm_limit=1'});
	}

    return(
        <now-button 
            cta="Positive" 
            iconName="" 
            iconSet="solid" 
            label="Fetch an INC" 
            size="md" 
            variant="primary" 
            on-click={getIncident}
        />

    );
};

createCustomElement('x-44522-aad-http2', {
	renderer: { type: snabbdom },
    view,
    actionHandlers: {
        'INC_FETCHED': fetchIncEffect,
        'INC_FETCH_SUCCESS': handleFetchIncSucceeded,
    },
	styles
});