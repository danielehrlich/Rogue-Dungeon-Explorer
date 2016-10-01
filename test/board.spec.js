import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../src/reducers';
import { mount, shallow, render } from 'enzyme';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { initialStore } from  '../src/helpers/initial_store';
import { BoardCreator } from '../src/containers/board_creator';
import * as actions from '../src/actions/index';
import ConnectedBoard, {Board} from '../src/containers/board';
chai.use(chaiEnzyme());
const createStoreWithMiddleware = applyMiddleware()(createStore);


describe('<ConnectedBoard/>', () => {
	
	var map1, map2;
	var wrapper;
	
	beforeEach( (done) => {
		map1 = new BoardCreator();
		map2 = map1.createMap();
		wrapper = mount(<ConnectedBoard firstLevel = {map2} store={createStoreWithMiddleware(reducers)}/>);
		done();
	});
	
	it('should have an <i> element with class ra-broadsword', function (done) {
		expect(wrapper.find('p')).to.contain.text('Hello Funny');
		done();
	});
	
	// it('should have an <i> element with class ra-broadsword', function (done) {
	// 	expect(wrapper.find('li.ra-health span')).to.contain.text('Health:');
	// 	done();
	// });
	
	
	
});

/*
 setTimeout(
 function(){
 wrapper = render(<ConnectedBoard firstLevel = {map2} store={createStoreWithMiddleware(reducers)}/>);
 }, 100);
 */