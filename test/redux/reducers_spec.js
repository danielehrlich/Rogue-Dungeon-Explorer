import { expect } from 'chai';
import gameReducer from '../../src/reducers/game_reducer';

describe('The Reducers', () => {
	
	it('case SET_MAP should return the map passed in by the action', () => {
		const state = {};
		const map = [1, 1, 1];
		const action = {
			type: 'SET_MAP',
			map : map
		};
		
		const result = gameReducer(state, action);
		
		expect(result).to.eql({map: map});
	});
	
	it('case Toggle Darkness should return the opposite of the original value of darkness', () => {
		const state = {
			darkness: false
		};
		const action = {
			type: 'TOGGLE_DARKNESS'
		};
		
		const result = gameReducer(state, action);
		
		expect(result).to.eql({darkness: true});
	});
	
});