import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const view = (state, {updateState}) => {
	return (
		<div>Hello World! Finally, Amirite?</div>
	);
};

//createCustomElement('44522-aad-example-blog', {
createCustomElement('x-44522-aad-example-blog', {
	renderer: {type: snabbdom},
	view,
	styles
});
