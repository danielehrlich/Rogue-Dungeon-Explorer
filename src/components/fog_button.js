import React, { Component } from 'react';


class FogButton extends Component {

	render () {
		return (
			<button
				className="toggleButton"
				id={this.props.id}
				onClick={this.props.handleClick}>Fog of War
			</button>
		);
	}
}

export default FogButton