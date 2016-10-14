import {ATTACK_VARIANCE, tileStyle, reverseLookup, weaponItems, ENEMY, PLAYER} from '../helpers/constants';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Board from './board';


export class BoardCreator extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			width        : 150,
			height       : 60,
			maxRoomSize  : 24,
			minRoomSize  : 6,
			maxHallLength: 5,
			numRooms     : 20,
			roomChance   : .75
		};
	}
	
	componentWillMount() {
		this.createMap();
	}
	
	componentDidMount(){
		// var music = new Audio('http://www.tannerhelland.com/dmusic/Deeper.mp3');
		// music.play();
	}
	
	createMap(width = 150, height = 60, maxRoomSize = 20, minRoomSize = 6, maxHallLength = 5, numRooms = 24, roomChance = .75) {
		
		// init grid of walls
		let map = _.fill(Array(width), 0);
		const emptyCol = _.fill(Array(height), tileStyle.WALL);
		map = map.map(() => emptyCol.slice());
		
		// create first room
		this.createRoom(map, {x: 45, y: 45}, {x: 10, y: 10}, tileStyle.FLOOR);
		this.setState({map: map});
		
		// create all the rooms
		for (let i = 0; i < numRooms; i++) {
			this.placeRoom(map);
		}
		
		
		this.setState({map: map});
		return map;
		
	}
	
	// map is a grid, startCoord is an object like {x: 13, y: 15}
	// size is an object like {x: 5, y: 7}, fillVal is an int
	createRoom(map, startCoord, size, fillVal) {
		for (let i = startCoord.x; i < startCoord.x + size.x; i++) {
			_.fill(map[i], fillVal, startCoord.y, size.y + startCoord.y);
		}
		return map;
	}
	
	// Will keep trying to place random rooms in random places until it succeeds.
	placeRoom(map) {
		let wall, width, height, isRoom, startX, startY, coords, numClear;
		let count = 0;
		while (true) {
			// Create random location and room
			// TODO - Choose wall or hall
			count++;
			numClear = 0;
			wall = this.whereWall(map);
			coords = wall.coords;
			width = Math.floor((Math.random() * (this.state.maxRoomSize - this.state.minRoomSize)) + this.state.minRoomSize);
			
			height = Math.floor((Math.random() * (this.state.maxRoomSize - this.state.minRoomSize)) + this.state.minRoomSize);
			switch (wall.openDir) {
				case 'right':
					startX = coords.x - width;
					startY = (coords.y - Math.floor(height / 2)) + this.getDoorOffset(height);
					break;
				case 'left':
					startX = coords.x + 1;
					startY = (coords.y - Math.floor(height / 2)) + this.getDoorOffset(height);
					break;
				case 'top':
					startX = (coords.x - Math.floor(width / 2)) + this.getDoorOffset(width);
					startY = coords.y + 1;
					break;
				case 'bottom':
					startX = (coords.x - Math.floor(width / 2)) + this.getDoorOffset(width);
					startY = coords.y - height;
					break;
				default:
					break;
			}
			// Exit if room would be outside matrix
			if (count % 10 === 0) {
				//console.log(coords);
				//console.log("startX: " + startX + " startY: " + startY + " width: " + width + "map.length: " + map.length);
			}
			if (startX < 0 || startY < 0 || startX + width >= map.length || startY + height >= map[0].length) {
				continue;
				
			}
			// check if all spaces are clear
			for (let i = startX; i < startX + width; i++) {
				if (map[i].slice(startY, startY + height).every(tile => tile === tileStyle.WALL)) {
					numClear++;
				}
			}
			if (numClear === width) {
				this.createRoom(map, {x: startX, y: startY}, {x: width, y: height}, tileStyle.FLOOR);
				map[coords.x][coords.y] = 1;
				return map;
			}
		}
		
		
	}
	
	getDoorOffset(length) {
		var ans = Math.floor(Math.random() * length) - Math.floor((length - 1 ) / 2);
		return ans;
	}
	
	// Loops until it finds a wall tile
	whereWall(map) {
		const coords = {x: 0, y: 0};
		let wallDir = false;
		do {
			coords.x = Math.floor(Math.random() * map.length);
			coords.y = Math.floor(Math.random() * map[0].length);
			wallDir = this.isWall(map, coords);
		} while (!wallDir);
		
		return {coords: coords, openDir: wallDir};
	}
	
	// Takes a map matrix and a coordinate object
	// Returns false if not a wall, otherwise the direction of the open tile
	isWall(map, coords) {
		// return false if tile isn't wall
		if (map[coords.x][coords.y] !== tileStyle.WALL) {
			return false;
		}
		// left is open
		if (typeof map[coords.x - 1] !== 'undefined' && map[coords.x - 1][coords.y] === tileStyle.FLOOR) {
			return 'left';
		}
		// right is open
		if (typeof map[coords.x + 1] !== 'undefined' && map[coords.x + 1][coords.y] === tileStyle.FLOOR) {
			return 'right';
		}
		// top is open
		if (map[coords.x][coords.y - 1] === tileStyle.FLOOR) {
			return 'top';
		}
		// bottom is open
		if (map[coords.x][coords.y + 1] === tileStyle.FLOOR) {
			return 'bottom';
		}
		
		return false;
	}
	
	render() {
		
		return (
		  <div className="board-creator">
			  <Board
			  firstLevel = { this.state.map }
			  makeLevel = { this.createMap.bind(this) }
			  />
		  </div>
		);
	}
	
}


function mapStateToProps(state) {
	return {state: state};
}

export default connect(mapStateToProps)(BoardCreator);
