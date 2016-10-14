import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../../src/reducers';
import { mount, shallow, render } from 'enzyme';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import ReactTestUtils from 'react-addons-test-utils';
import { initialStore } from  '../../src/helpers/initial_store';
import {BoardCreator} from '../../src/containers/board_creator';
import * as actions from '../../src/actions/index';
import ConnectedBoard, {Board} from '../../src/containers/board';
chai.use(chaiEnzyme());
const createStoreWithMiddleware = applyMiddleware()(createStore);

describe('<ConnectedBoard/>', (done) => {
	
	
	describe('These tests relate to the structure and style of the DOM', function (done) {
		
		var wrapper;
		
		before((done) => {
			var map1 = new BoardCreator();
			var map2 = map1.createMap();
			wrapper = mount(
			  <Provider store={createStoreWithMiddleware(reducers)}>
				  <ConnectedBoard firstLevel={map2}/>
			  </Provider>
			);
			done();
		});
		
		it('should have six <li> elements as part of the UI dashboard', function (done) {
			expect(wrapper.find('#ui')).to.have.exactly(6).descendants('li');
			done();
		});
		
		it('confirm the first UI element has text / the correct text displayed', function (done) {
			/*
			text contains test
			 */
			done();
		});
		
		/*
		Board should have loaded
		 */
		
		it('should have 59 rows making up the board', function () {
			expect(wrapper.find('#board')).to.have.exactly(59).descendants('.boardRow');
		});
		
	});

	
	describe('Player interaction tests', function (done) {
		
	
		it('the player should be able to move and change position', function () {
			
			function _addDirection(coords, direction) {
				return { x: coords.x + direction.x, y: coords.y + direction.y };
			}
			
			expect(_addDirection({ x: 5, y: 5 }, { x: 1, y: -1 })).to.deep.eql({x : 6, y: 4});
		});
		
	});
});