import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../src/reducers';
import { mount, shallow, render } from 'enzyme';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { initialStore } from  '../src/helpers/initial_store';
import BoardC, {BoardCreator} from '../src/containers/board_creator';
import * as actions from '../src/actions/index';
import ConnectedBoard, {Board} from '../src/containers/board';
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
			console.log(wrapper.createMap);
			expect(wrapper.find('.hellome')).to.contain.text('Fun Text');
			done();
		});
		
		// it('Should have six <li> elements as part of the UI dashboard', function(done) {
		// 	expect(wrapper.find('#ui')).to.have.exactly(6).descendants('li');
		// 	done();
		// });
		//
		// it('Should have 59 rows making up the board', function() {
		// 	expect(wrapper.find('#board')).to.have.exactly(59).descendants('.boardRow');
		// });
		//
		// it('Should have 149 columns making up the board', function() {
		// 	expect(wrapper.find('.boardRow')).to.have.exactly(149).descendants('.tile');
		// });
		
	});
	
	describe('The algorithm to create the map works', function (done) {
		
		it('Should do something map creating related', function (done) {
			let map1 = new BoardCreator();
			let map2 = map1.createMap();
			console.log(map2);
			done();
		});
		
		
	});
	
});