import _ from 'lodash';
import { initialStore } from '../helpers/initial_store';
const initialState = initialStore;

export default function gameReducer(state = initialStore, action = null) {
	
	switch (action.type) {
		
		case 'ADD_BOSS':
			return {
				...state,
				occupiedSpaces: {
					...state.occupiedSpaces,
					[`${action.location.x}x${action.location.y}`]: 'boss',
					[`${action.location.x + 1}x${action.location.y}`]: 'boss',
					[`${action.location.x}x${action.location.y + 1}`]: 'boss',
					[`${action.location.x + 1}x${action.location.y + 1}`]: 'boss'
				},
				entities: {
					...state.entities,
					boss: {
						entityType: 'enemy',
						health: action.health,
						attack: action.attack,
						x: action.location.x,
						y: action.location.y
					}
				}
			};
			
			
		case 'ADD_ENTITY':
			return {
				...state,
				occupiedSpaces: {
					...state.occupiedSpaces,
					[`${action.location.x}x${action.location.y}`]: action.entityName
				},
				entities: {
					...state.entities,
					[action.entityName]: {
						entityType: action.entityType,
						health: action.health,
						attack: action.attack,
						x: action.location.x,
						y: action.location.y
					}
				}
			};
			
			
		case 'DAMAGE':
			return {
				...state,
				entities: {
					...state.entities,
					[action.entityName]: {
						...state.entities[action.entityName],
						health: state.entities[action.entityName].health - action.value
					}
				}
			};
			
			
		case 'GAIN_XP':
			return {
				...state,
				entities: {
					...state.entities,
					'player': {
						...state.entities.player,
						toNextLevel: state.entities.player.toNextLevel - action.xp
					}
				}
			};
			
			
		case 'HEAL':
			return {
				...state,
				entities: {
					...state.entities,
					[action.entityName]: {
						...state.entities[action.entityName],
						health: state.entities.player.health + action.value
					}
				}
			};
			
			
		case 'INCREASE_LEVEL':
			return {
				...state,
				level: state.level + 1
			};
			
			
		case 'LEVEL_UP':
			return {
				...state,
				entities: {
					...state.entities,
					'player': {
						...state.entities.player,
						attack: state.entities.player.attack + action.attack,
						health: state.entities.player.health + action.health,
						toNextLevel: action.toNextLevel,
						level: state.entities.player.level + 1
					}
				}
			};
			
			
		case 'MOVE':
			return {
				...state,
				occupiedSpaces: _.chain(state.occupiedSpaces)
					.omit(`${state.entities[action.entityName]
						.x}x${state.entities[action.entityName].y}`)
					.set(`${state.entities[action.entityName].x +
						action.direction.x}x${state.entities[action.entityName]
							.y + action.direction.y}`,
						action.entityName)
					.value(),
				entities: {
					...state.entities,
					[action.entityName]: {
						...state.entities[action.entityName],
						x: state.entities[action.entityName].x + action.direction.x,
						y: state.entities[action.entityName].y + action.direction.y
					}
				}
			};
			
			
		case 'REMOVE_ENTITY':
			return {
				...state,
				occupiedSpaces: _.chain(state.occupiedSpaces)
					.omit(`${state.entities[action.entityName]
						.x}x${state.entities[action.entityName].y}`)
					.value(),
				entities: _.chain(state.entities)
					.omit(action.entityName)
					.value()
			};
			
			
		case 'RESET_BOARD':
			return {
				...state,
				entities: {
					'player': state.entities.player
				},
				occupiedSpaces: {
					[`${state.entities.player.x}x${state.entities.player.y}`]: 'player'
				}
			};
			
			
		case 'RESET_LEVEL':
			return {
				...state,
				level: 0
			};
			
			
		case 'RESET_MAP':
			return {
				...initialState,
				map: action.map
			};
			
			
		case 'SET_LOCATION':
			return {
				...state,
				occupiedSpaces: _.chain(state.occupiedSpaces)
					.omit(`${state.entities[action.entityName]
						.x}x${state.entities[action.entityName].y}`)
					.set(`${action.location.x}x${action.location.y}`,
						action.entityName)
					.value(),
				entities: {
					...state.entities,
					[action.entityName]: {
						...state.entities[action.entityName],
						x: action.location.x,
						y: action.location.y
					}
				}
			};
			
			
		case 'SET_MAP':
			return {
				...state,
				map: action.map
			};
			
			
		case 'SET_WINDOW_SIZE':
			return {
				...state,
				windowHeight: action.windowHeight,
				windowWidth: action.windowWidth
			};
			
			
		case 'SWITCH_WEAPON':
			return {
				...state,
				entities: {
					...state.entities,
					'player': {
						...state.entities.player,
						weapon: action.weapon,
						attack: state.entities.player.attack + action.attack
					}
				}
			};
			
			
		case 'TOGGLE_DARKNESS':
			return {
				...state,
				darkness: !state.darkness
			};
			
			
		default:
			return state;
		
	}
	
	return state;
}

