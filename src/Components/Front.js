import React from 'react';
import Login from './Login';

class Front extends React.Component {
    constructor(props) {
        super(props);
    }
    


    render() {
        return (
            <div className="front-parent d-flex flex-column
            justify-content-between align-items-center">
                <div className = "front-title-box">
                <div className = "front-title-text">
                    Year in Pixels
                </div>
                </div>
                <div className = "front-other-box d-flex flex-column justify-content-between align-items-ceneter">
                    <Login/>
                </div>
                <div className = 'front-other-footer d-flex flex-row justify-content-center align-items-center'>
                    YearInPixels by Camille&nbsp;
                    <a href="https://www.instagram.com/passioncarnets/">(@passioncarnets)</a>               
                </div>
            
            
            
            </div>
        );
    }
}

export default Front;
