import React, { Component } from 'react';
import BoardCreator from '../containers/board_creator';
import $ from 'jquery';


class LoadingPage extends Component {
	constructor(){
		super();
		this.state = { show: true};
	}

	componentDidMount() {
		$('button#continue').bind('click', this.bodyClickHandler);
		$('#SecondPage').hide();
	}
	
	componentWillUnmount() {
		$('button#continue').unbind('click', this.bodyClickHandler);
	}
	
	bodyClickHandler(e) {
		console.log('bodyclickhandler');
		this.setState({show: false});
	}
	
	anchorClickHandler(e) {
		console.log('click on anchor - doing some stuff and then stopping propation');
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
	}
	
	clickHandler(e) {
		$('.square-box').fadeOut('slow').remove();
		$('#SecondPage').show();
		
	}
	
	preventEventBubbling(e) {
		console.log('click on div - stopping propagation');
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
	}
	
	render() {
		return (
			<div>
			<div className='square-box'>
				<div className='square-content'>
					<div>
				    <span><ul id="loading">
				    <li>Welcome to the Rogue Dungeon Game:</li>
				    <li>"Rogue" was a popular dungeon crawling game released in 1980 by Glenn Wichman and others at UC Santa Cruz.</li>
				    <li>Video games are important to the history of computing. They have attracted many people to the field, and have been the impetus behind advancements in computer graphics and A.I.</li>
				    <li>This game is meant to be played on the desktop.</li>
				    <li id="li_button">
					    <a href="#" style={{ display:'none' }} onClick={this.anchorClickHandler}>Link - will stop propagation</a>
					    <div id="menudrop" onClick={this.preventEventBubbling}>
					    <button id="continue" onClick={this.clickHandler}>
              Continue...
              </button>
						    <br/>
						    <div id="attribution">
						    <p> Created by Daniel Ehrlich</p>
						    <p> <a href="https://github.com/danielehrlich/rogue-dungeon-explorer">@Github</a></p>
						    </div>
					    </div>
					    </li>
				    </ul>
				    </span>
					</div>
				</div>
			</div>
			<div id="SecondPage">
				<h1><a href="https://en.wikipedia.org/wiki/Rogue_(video_game)">Rogue Dungeon Game</a></h1>
				<h4>Defeat the Monster in Level 5</h4>
				<BoardCreator/>
			</div>
			</div>
		);
	}
}

export default LoadingPage;
	