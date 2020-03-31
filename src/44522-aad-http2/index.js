import {createCustomElement} from '@servicenow/ui-core';
import '@servicenow/now-button';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const view = (state, {dispatch, updateState}) => {
    <div>
        <h1>test</h1>
    </div>
}

createCustomElement('x-44522-aad-http2', {
	renderer: { type: snabbdom },
	initialState: {
	},
	actionHandlers: {
	},
	view,
	styles
});