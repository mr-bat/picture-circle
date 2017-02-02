import React from 'react';
import ReactDOM from 'react-dom';
import SplitPane from 'react-split-pane';
const getPixels = require("get-pixels");

let prevUrl;

setInterval( () => {
	let Url = document.getElementById('imgPreview');
	console.log(`tada!!!`);
	console.log(Url);
	if(!Url) Url = {src: 'avatar.jpg'};
	getPixels(Url.src, function(err, pixels) {
		if(err) {
			console.error("Bad image path");
			return
		}
		let picWidth = pixels.shape[0];
		let picHeight = pixels.shape[1];

		class Circle extends React.Component {
			constructor() {
				super();
				this.state = {
					visible: 1,
					color: `rgb(123, 0, 255)`,
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
					background: this.state.color
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
			componentDidMount() {
				let elem = ReactDOM.findDOMNode(this).getBoundingClientRect();
				let screen = document.getElementById('appScreen').getBoundingClientRect();

				let leftPos = (elem.left - screen.left) * picWidth / screen.width;
				let rightPos = (elem.right - screen.left) * picWidth / screen.width;
				let topPos = (elem.top - screen.top) * picHeight / screen.height;
				let bottomPos = (elem.bottom - screen.top) * picHeight / screen.height;
				let RVAL = 0, GVAL = 0, BVAL = 0, cnt = 0;

				for(let i = Math.ceil(leftPos); i < rightPos; ++i)
				for(let j = Math.ceil(topPos); j < bottomPos; ++j) {
					RVAL += pixels.get(i, j, 0);
					GVAL += pixels.get(i, j, 1);
					BVAL += pixels.get(i, j, 2);
					++cnt;
				}
				RVAL /= cnt, GVAL /= cnt, BVAL /= cnt;
				this.setState({color: `rgb(${Math.round(RVAL)}, ${Math.round(GVAL)}, ${Math.round(BVAL)})`});
			}
		}

		if(prevUrl != Url.src) {
			prevUrl = Url.src;
			ReactDOM.render(
			<Circle size="512" />,
			document.getElementById('app')
			);
		}
	});
}, 100);
