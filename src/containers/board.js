import {ATTACK_VARIANCE, tileStyle, reverseLookup, weaponItems, ENEMY, PLAYER, htmlEntities} from '../helpers/constants';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import FogButton from '../components/fog_button';
import * as actions from '../actions/index';
import Notifications, {notify} from 'react-notify-toast';


class Board extends Component {
	
	
	constructor(props) {
		super(props);
		this._handleKeypress = this._handleKeypress.bind(this);
		this.props.setWindowSize();
	}
	
	
	componentWillMount() {
		const newState = this.props.state.state;
		
		this.setState(this._select2(newState, this.props.firstLevel));
		
		var that = this;
		setTimeout(function () {
			that._setupGame()
		}, 1500);
	}
	
	
	componentWillReceiveProps(nextProps) {
		const newState = nextProps.state.state;
		if (newState.entities.player.toNextLevel <= 0) this._playerLevelUp();
		this.setState(this._select(newState));
	}
	
	
	_select(state) {
		return {
			player        : state.entities.player,
			entities      : state.entities,
			map           : state.map,
			occupiedSpaces: state.occupiedSpaces,
			level         : state.level,
			windowHeight  : state.windowHeight,
			windowWidth   : state.windowWidth,
			darkness      : state.darkness
		}
	}
	
	
	_select2(state, algoMap) {
		return {
			player        : state.entities.player,
			entities      : state.entities,
			map           : algoMap,
			occupiedSpaces: state.occupiedSpaces,
			level         : state.level,
			windowHeight  : state.windowHeight,
			windowWidth   : state.windowWidth,
			darkness      : state.darkness
		}
	}
	
	
	setWindowSize(e) {
		this.props.setWindowSize();
	}
	
	
	componentDidMount() {
		window.addEventListener('keydown', this._handleKeypress);
		window.addEventListener('resize', this.props.setWindowSize);
	}
	
	
	componentWillUnmount() {
		window.removeEventListener('keydown', this._handleKeypress);
		window.removeEventListener('resize', this.props.setWindowSize);
	}
	
	
	_playerLevelUp() {
		const currLevel = this.state.player.level + 1;
		this.props.levelUp(currLevel * PLAYER.attack, currLevel * PLAYER.health,
		  (currLevel + 1) * PLAYER.toNextLevel);
	}
	
	
	_setupGame() {
		const music = new Audio('http://www.tannerhelland.com/dmusic/Deeper.mp3');
		music.play();
		//console.log("_setupGame just ran");
		this.props.resetMap(this.props.firstLevel);
		this._fillMap()
		this.props.setWindowSize();
		this.props.music();
	}
	
	
	_availablePosition() {
		const { map, occupiedSpaces } = this.state; // eh this should work.....
		let coords, x, y;
		do {
			x = Math.floor(Math.random() * map.length);
			y = Math.floor(Math.random() * map[0].length);
			if (map[x][y] === tileStyle.FLOOR && !occupiedSpaces[x + 'x' + y]) {
				coords = {x: x, y: y};
			}
		} while (!coords);
		return coords;
	}
	
	
	_fillMap() {
		this.props.setLocation('player', this._availablePosition());
		// Place items
		const state = this.state;
		const weapon = weaponItems[this.state.level];
		this.props.addEntity(weapon.entityName, 'weapon', weapon.health, weapon.attack, this._availablePosition());
		// Place heath and enemies
		const NUM_THINGS = 5,
		  HEALTH_VAL = 20,
		  LEVEL_MULT = state.level + 1;
		for (let i = 0; i < NUM_THINGS; i++) {
			this.props.addEntity('health' + i, 'health', HEALTH_VAL, 0, this._availablePosition());
			this.props.addEntity('enemy' + i, 'enemy', LEVEL_MULT * ENEMY.health,
			  LEVEL_MULT * ENEMY.attack, this._availablePosition());
		}
		// Place exit if not last level
		if (state.level < 5) this.props.addEntity('exit', 'exit', 0, 0, this._availablePosition());
		// Place boss on last (fifth) level
		if (state.level === 5) this.props.addBoss(125, 500, this._availablePosition());
	}
	
	
	_addDirection(coords, direction) {
		return { x: coords.x + direction.x, y: coords.y + direction.y };
	}
	
	
	_toggleDarkness() {
		this.props.toggleDarkness();
	}
	
	_handleKeypress(e) {
		let direction = '';
		switch (e.keyCode) {
			case 40:
				direction = {x: 0, y: 1};
				break;
			case 39:
				direction = {x: 1, y: 0};
				break;
			case 38:
				direction = {x: 0, y: -1};
				break;
			case 37:
				direction = {x: -1, y: 0};
				break;
			default:
				direction = '';
				break;
		}
		if (direction) {
			e.preventDefault();
			this._handleMove(direction);
		}
	}
	
	
	_handleMove(direction) {
		const state = this.state;
		const player = state.entities.player;
		const map = state.map;
		const newCoords = this._addDirection({x: player.x, y: player.y}, direction);
		if (newCoords.x > 0 && newCoords.y > 0 && newCoords.x < map.length &&
		  newCoords.y < map[0].length &&
		  map[newCoords.x][newCoords.y] !== tileStyle.WALL) {
			// Tile is not a wall, determine if it contains an entity
			const entityName = state.occupiedSpaces[newCoords.x + 'x' + newCoords.y];
			// move and return if empty
			if (!entityName) {
				this.props.move('player', direction);
				return;
			}
			// handle encounters with entities
			const entity = state.entities[entityName];
			switch (entity.entityType) {
				case 'health':
					this.props.removeEntity(entityName);
					this.props.heal('player', entity.health);
					this.props.move('player', direction);
					break;
				case 'weapon':
					this.props.switchWeapon(entityName, entity.attack);
					this.props.move('player', direction);
					break;
				case 'enemy':
				case 'boss':
					const playerAttack = Math.floor((Math.random() * ATTACK_VARIANCE) + player.attack - ATTACK_VARIANCE);
					const enemyAttack = Math.floor((Math.random() * ATTACK_VARIANCE) + entity.attack - ATTACK_VARIANCE);
					// Will hit kill enemy?
					
					if (entity.health > playerAttack) {
						// Will rebound hit kill player?
						if (enemyAttack > player.health) {
							notify.show('You died. Better luck next time!', 'error', 6000);
							this._setupGame();
							return;
						}
						this.props.damage(entityName, playerAttack);
						this.props.damage('player', enemyAttack);
					} else {
						// Is the enemy a boss?
						if (entityName === 'boss') {
							notify.show('A winner is you!', 'success', 6000);
							this._setupGame();
							return;
						}
						this.props.gainXp((state.level + 1) * ENEMY.xp);
						this.props.removeEntity(entityName);
					}
					break;
				case 'exit':
					notify.show('Entered the next dungeon...', 'warning', 6000);
					this.props.resetBoard();
					this.props.setMap(this.props.makeLevel());
					this.props.setLocation('player', this._availablePosition());
					this.props.increaseLevel();
					this._fillMap();
					break;
				default:
					break;
			}
		}
		return;
	}
	
	
	render() {
		
		const {
		  map, entities, occupiedSpaces, level, player, windowHeight,
		  windowWidth, darkness
		}      = this.state;
		const VIEW = 7;
		//let tileSize = document.getElementsByClassName('tile').item(0) ? document.getElementsByClassName('tile').item(0).clientHeight : 10;
		let tileSize = 10;
		
		// Get start coords for current viewport
		const numCols = Math.floor((windowWidth / tileSize) - 5),
		  numRows = Math.floor((windowHeight / tileSize) - 17);
		let beginX = Math.floor(player.x - (numCols / 2));
		let beginY = Math.floor(player.y - (numRows / 2));
		// Make sure start isn't less than 0
		if (beginX < 0) beginX = 0;
		if (beginY < 0) beginY = 0;
		// Set end coords
		let endX = beginX + numCols;
		let endY = beginY + numRows;
		// Final validation of start and end coords
		
		if (endX > map.length) {
			beginX = numCols > map.length ? 0 : beginX - (endX - map.length);
			endX = map.length;
		}
		if (endY > map[0].length) {
			beginY = numRows > map[0].length ? 0 : beginY - (endY - map[0].length);
			endY = map[0].length;
		}
		
		// Create actual HTML gameboard
		let rows = [], tileClass, row;
		for (let y = beginY; y < endY; y++) {
			row = [];
			for (let x = beginX; x < endX; x++) {
				let entity = occupiedSpaces[`${x}x${y}`];
				if (!entity) {
					tileClass = reverseLookup[map[x][y]];
				} else {
					tileClass = entities[entity].entityType;
				}
				if (darkness) {
					// check if it should be in fog of war
					const xDiff = player.x - x,
					  yDiff = player.y - y;
					if (Math.abs(xDiff) > VIEW || Math.abs(yDiff) > VIEW) {
						tileClass += ' dark';
					} else if (Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)) >= VIEW) {
						tileClass += ' dark';
					}
				}
				row.push(React.createElement('span', {className: 'tile ' + tileClass, key: x + 'x' + y}, ' '));
			}
			rows.push(React.createElement('div', {className: 'boardRow', key: 'row' + y}, row));
		}
		
		
		return (
		  <div id='game'>
			  <Notifications/>
			  <ul id='ui'>
				  <li id='health'>
					  <i className="ra ra-health ra-lg"></i>
					  <span className='label'>Health:</span> {player.health}
				  </li>
				  <li id='weapon'>
					  <i className="ra ra-broadsword ra-lg"></i>
					  <span className='label'>Weapon:</span> {player.weapon}
				  </li>
				  <li id='attack'>
					  <i className="ra ra-archer ra-lg"></i><span className='label'>Attack:</span> {player.attack}
				  </li>
				  <li id='playerLevel'>
					  <i className="ra  ra-bottled-bolt ra-lg"></i><span className='label'>Level:</span> {player.level}
				  </li>
				  <li id='xp'>
					  <i className="ra  ra-fizzing-flask ra-lg"></i><span
					className='label'>Next Level:</span> {player.toNextLevel} XP
				  </li>
				  <li id='level'>
					  <i className="ra ra-metal-gate ra-lg"></i><span className='label'>Dungeon:</span> {level}
				  </li>
			  </ul>
			  <div className='buttons'>
				  <FogButton
					id='toggleDarkness'
					handleClick={this._toggleDarkness.bind(this)}/>
			  </div>
			  
			  <div id='board'>
				  {rows}
			  </div>
		  </div>
		);
	}
}

function mapStateToProps(state) {
	return {state: state};
}


export default connect(mapStateToProps, actions)(Board);
