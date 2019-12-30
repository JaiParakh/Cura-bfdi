import React from 'react';  
import './popup.css';  

class Popup extends React.Component {  

    constructor(props){  
        super(props);  
        this.state = { showPopup: false };  
    }  

    togglePopup() {  
        this.setState({  
             showPopup: !this.state.showPopup  
        }); 
    }

    render() {  
        return (  
            <div className='popup'>  
                <div className='popup\_inner'>  
                    <h1>{this.props.text}</h1>  
                    <button onClick={this.props.closePopup}>close me</button>  
                </div>  
            </div>  
        );  
    }  
}  

export default Popup;