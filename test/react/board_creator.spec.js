import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { mount, shallow, render } from 'enzyme';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { initialStore } from  '../../src/helpers/initial_store';
import BoardC, {BoardCreator} from '../../src/containers/board_creator';
import * as actions from '../../src/actions/index';
import ConnectedBoard, {Board} from '../../src/containers/board';
import reducers from '../../src/reducers';
chai.use(chaiEnzyme());
const createStoreWithMiddleware = applyMiddleware()(createStore);


describe('<BoardCreator/>', () => {
	
	describe('These tests relate to the structure and style of the DOM', function (done) {
		
		var wrapper;
		beforeEach((done) => {
			wrapper = mount(
			  <Provider store={createStoreWithMiddleware(reducers)}>
				  <BoardC />
			  </Provider>
			);
			done();
		});
		
		
		it('should have the correct class name', function (done) {
			expect(wrapper.find('.board-creator')).to.exist;
			done();
		});
		
	});
	
	describe('The algorithm to create the map works', function (done) {
		
		var map1, map2;
		before((done) => {
			map1 = new BoardCreator();
			map2 = map1.createMap();
			done();
		});
		
		it('should recognize that map is an object', function () {
			console.log(typeof map2);
			let ans = typeof map2;
			expect(ans).to.be.equal('object');
		});
		
		it('should calculate the door offset correctly within the bounds of room size', function () {
			let ans = map1.getDoorOffset(20);
			expect(ans).to.be.below(20);
			expect(ans).to.be.above(-20);
		});
		
		it('should recognize a wall tile when passed a map', function () {
			let arr1 = [[1]];
			arr1.push([[1]]);
			let ans = map1.isWall(arr1, {x: 0, y: 0});
			expect(ans).to.be.false;
		});
		
	});
});