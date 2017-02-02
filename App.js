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
		if(this.state.visible && this.props.size >= 8) {
			this.setState({visible:0});
		}
	}
	render() {
		let defStyle = {
      		width: this.props.size + "px",
			height: this.props.size + "px",
    	};
		if(this.state.visible)
			return <div style={defStyle} className="circle" onMouseOver={this.hover.bind(this)} />;
		else {
			let newSize = this.props.size / 2;
			let rowStyle = {height: newSize + "px"};
			let colStyle = {width: newSize + "px"};

			return <SplitPane split="horizontal" size={newSize} allowResize={false}>
				<div style={rowStyle}>
					<SplitPane split="vertical" size={newSize} allowResize={false}>
						<div style={colStyle}><Circle size = {newSize} /></div>
						<div style={colStyle}><Circle size = {newSize} /></div>
					</SplitPane>
				</div>
				<div>
					<SplitPane split="vertical" size={newSize} allowResize={false}>
						<div style={colStyle}><Circle size = {newSize} /></div>
						<div style={colStyle}><Circle size = {newSize} /></div>
					</SplitPane>
				</div>
			</SplitPane>
		}
	}
}

ReactDOM.render(
    <Circle size="512" />,
	document.getElementById('app')
);
