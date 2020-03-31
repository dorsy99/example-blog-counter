import {createCustomElement} from '@servicenow/ui-core';
import '@servicenow/now-button';
import {createHttpEffect} from '@servicenow/ui-effect-http';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const INC_FETCH_SUCCESS = 'INC_FETCH_SUCCESS'

const fetchIncEffect = createHttpEffect(':url', {
    method: 'GET',
    headers: {},
    pathParams: ['url'],
    dataParam: 'data',
    successActionType: INC_FETCH_SUCCESS
});

const handleFetchIncSucceeded = ({action, updateState}) => {
	var x = action.payload;
	console.log(x);
	/* updateState({
		path: "inc",
		value: x,
		operation: "set"
	})*/ 
}

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