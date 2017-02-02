import React from 'react';
import ReactDOM from 'react-dom';
import SplitPane from 'react-split-pane';

class Circle extends React.Component {
	constructor() {
		super();
		this.state = {
			visible: 1
		}
	}
	hover() {
		if(this.state.visible && this.props.size >= 10) {
			this.setState({visible:0});
		}
	}
	render() {
		let style = {
      		width: this.props.size + "px",
			height: this.props.size + "px"
    	};
		if(this.state.visible)
			return <div style={style} className="circle" onMouseOver={this.hover.bind(this)} />;
		else {
			let newSize = this.props.size / 2;
			return <SplitPane split="vertical" size="{newSize}%">
				<SplitPane split="horizontal" size="{newSize}%" >
					<Circle size = {newSize} />
					<Circle size = {newSize} />
				</SplitPane>
				<SplitPane split="horizontal" size="{newSize}%" >
					<Circle size = {newSize} />
					<Circle size = {newSize} />
				</SplitPane>
			</SplitPane>
		}
	}
}

ReactDOM.render(
    <Circle size="400" />,
	document.getElementById('app')
);
