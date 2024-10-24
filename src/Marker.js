import React, { Component } from 'react';
import './Marker.css'

class Marker extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <div className="pin"></div>
                <div className="pulse"></div>
            </div>
        );
    }
}

export default Marker;