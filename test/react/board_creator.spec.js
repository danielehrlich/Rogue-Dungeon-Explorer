import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../../src/reducers';
import { mount, shallow, render } from 'enzyme';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { initialStore } from  '../../src/helpers/initial_store';
import BoardC, {BoardCreator} from '../../src/containers/board_creator';
import * as actions from '../../src/actions/index';
import ConnectedBoard, {Board} from '../../src/containers/board';
chai.use(chaiEnzyme());
const createStoreWithMiddleware = applyMiddleware()(createStore);


describe('<BoardCreator/>', () => {
	
	
	describe('These tests relate to the structure and style of the DOM', function (done) {
		
		var wrapper;
		beforeEach((done) => {
			wrapper = render(
			  <Provider store={createStoreWithMiddleware(reducers)}>
				  <BoardC/>
			  </Provider>
			);
			done();
		});
		
		it('Should have the correct text in the <p> element', function (done) {
			expect(wrapper.find('.hellome')).to.contain.text('Fun Text');
			done();
		});
		
		
	});
	
	describe('The algorithm to create the map works', function (done) {
		
		it('Should do something map creating related', function (done) {
			let map1 = new BoardCreator();
			let map2 = map1.createMap();
			done();
		});
		
		
	});
	
});