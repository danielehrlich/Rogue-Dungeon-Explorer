if (!global.document) {
	try {
		const jsdom = require('jsdom').jsdom; // could throw
		
		const exposedProperties = ['window', 'navigator', 'document'];
		
		global.document = jsdom('');
		global.window = document.defaultView;
		Object.keys(document.defaultView).forEach((property) => {
			if (typeof global[property] === 'undefined') {
				exposedProperties.push(property);
				global[property] = document.defaultView[property];
			}
		});
		
		global.navigator = {
			userAgent: 'node.js',
		};
	} catch (e) {
		// jsdom is not supported...
	}
}

/*Import
 import TestUtils from 'react-addons-test-utils';
 import { Provider } from 'react-redux';
 import { createStore } from 'redux';
 import reducers from '../src/reducers';
*/


/*
 function renderComponent(ComponentClass, props, state) {
 const componentInstance = TestUtils.renderIntoDocument(
 <Provider store={createStore(reducers, state)}>
 <ComponentClass {...props}/>
 </Provider >
 );
 
 return $(ReactDOM.findDOMNode(componentInstance));
 }
 */