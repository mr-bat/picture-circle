import React from 'react';
import ReactDOM from 'react-dom';
import picture from './PictureEvents';

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {imagePreviewUrl: 'avatar.jpg'};
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file);
    }

    render() {
        let {imagePreviewUrl} = this.state;

        return (
            <div className="previewComponent">
                <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />
                <img id="imgPreview" src={imagePreviewUrl}  onLoad={()=>{picture.emit('changed');}} />
            </div>
        );
    }
}

ReactDOM.render(<ImageUpload/>, document.getElementById("ImageUpload"));
