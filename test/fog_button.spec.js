import React from 'react';
import { mount, shallow } from 'enzyme';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import FogButton from '../src/components/fog_button';
chai.use(chaiEnzyme())

describe('<FogButton/>', function () {
	it('should have a class of toggleButton', function () {
		const wrapper = shallow(<FogButton/>);
		expect(wrapper.find('button')).to.have.className('toggleButton');
	});
	
});