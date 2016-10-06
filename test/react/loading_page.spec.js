import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import FogButton from '../../src/components/fog_button';
chai.use(chaiEnzyme())


describe('<LoadingPage/>', function () {
	
	it('should contain the right text', function () {
		// let wrapperA = shallow(<FogButton/>);
		// expect(wrapperA.find('button')).to.have.className('toggleButton');
	});
	
	it('should be able to be clicked', () => {
		// const onButtonClick = sinon.spy(console, 'log');
		// const wrapper = mount(<FogButton onClick={console.log(" ")}/>);
		// wrapper.simulate('click');
		// expect(onButtonClick.calledOnce).to.equal(true);
	});
	
});