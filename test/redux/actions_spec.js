import { expect } from 'chai';
import * as actions from '../../src/actions/index';


describe('An action taken from the actions list should return the correct value', () => {
	it('addBoss should return the attack, health, and location of Boss', () => {
		const attack = 5;
		const health = 500;
		const location = "50x50";
		
		const result = actions.addBoss(attack, health, location);
		console.warn(result);
		expect(result).to.eql(
		  {
		  	type: 'ADD_BOSS',
		  	attack: 5,
			health: 500,
			location: "50x50"
		  }
		);
	});
});

