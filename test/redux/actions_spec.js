// test a couple of actions
// make sure respond is what you ex
import { expect } from 'chai';
import * as actions from '../../src/actions/index';


describe('Some Actions', () => {
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

