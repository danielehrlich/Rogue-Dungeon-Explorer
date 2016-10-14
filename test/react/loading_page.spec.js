import React from 'react';
import { render, shallow } from 'enzyme';
import sinon from 'sinon';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import LoadingPage from '../../src/components/loading_page';
chai.use(chaiEnzyme());


describe('<LoadingPage/>', function () {
	
	var wrapper;

	before(() => {
		wrapper = shallow(<LoadingPage/>);
	});
	
	it('Loading Page introduction should contain the right text', function () {
		expect(wrapper.find('.first-li')).to.include.text('Welcome to the Rogue Dungeon Game:');
	});
	
	it('The Button should look the correct way', () => {
		expect(wrapper.find('button')).to.have.text('Continue...');
	});
	
});