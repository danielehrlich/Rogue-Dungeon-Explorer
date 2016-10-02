import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import FogButton from '../src/components/fog_button';
chai.use(chaiEnzyme())

describe('<FogButton/>', function () {
	it('should have a class of toggleButton', function () {
		let wrapperA = shallow(<FogButton/>);
		expect(wrapperA.find('button')).to.have.className('toggleButton');
	});
	
	it('should be able to be clicked', () => {
		const onButtonClick = sinon.spy(console, 'log');
		const wrapper = mount(<FogButton onClick={console.log(" ")}/>);
		wrapper.simulate('click');
		expect(onButtonClick.calledOnce).to.equal(true);
	});
	
});