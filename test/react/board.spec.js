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
		
		it('Should have the correct text in the <p> element', function (done) {
			expect(wrapper.find('p')).to.contain.text('Hello Funny');
			done();
		});
		
		it('Should have six <li> elements as part of the UI dashboard', function (done) {
			expect(wrapper.find('#ui')).to.have.exactly(6).descendants('li');
			done();
		});
		
		it('Should have 59 rows making up the board', function () {
			expect(wrapper.find('#board')).to.have.exactly(59).descendants('.boardRow');
		});
		
		// it('Should have 149 columns making up the board', function() {
		// 	expect(wrapper.find('.boardRow')).to.have.exactly(149).descendants('.tile');
		// });
	});
	//
	
	describe('Player interaction tests', function (done) {
		beforeEach((done) => {
			var map3 = new BoardCreator();
			var map4 = map3.createMap();
			var props = {firstLevel: map4, store: createStoreWithMiddleware(reducers)};
			var FunBoard = new ConnectedBoard(props);
			console.log(FunBoard);
			done();
		});
	//
		it('The player should be able to move and change position', function () {
			console.warn("pass");

		});
	});
	
});