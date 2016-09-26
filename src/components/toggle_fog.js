import React, { Component } from 'react';


class ToggleButton extends Component {
	/*propTypes: {
		label: React.PropTypes.string.isRequired,
		id: React.PropTypes.string.isRequired,
		handleClick: React.PropTypes.func.isRequired
	},*/
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

export default ToggleButton