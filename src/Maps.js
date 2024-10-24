import React, { Component } from 'react';
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 7.546855,
                lng: -5.5471
            },
            zoom: 11,
            latitude: '',
            longitude: ''
        }
    }

    componentDidMount() {
        var idClient = this.props.location.state.idClient;
        axios.get(process.env.REACT_APP_API_URL + 'Back_hooda/GetAdresseByClientId.php?id=' + idClient).then(res => {
            var myLat = parseFloat(res.data.latitude)
            var myLng = parseFloat(res.data.longitude)
            var objectCenter = { lat: myLat, lng: myLng }
            this.setState({
                center: objectCenter,
                latitude: myLat,
                longitude: myLng
            })
        })
    }

    render() {
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAhL4D_X4dhl-AW1E9HvG2k657SdqOEwEA' }}
                    center={this.state.center}
                    defaultZoom={this.state.zoom}
                >
                    <Marker lat={this.state.latitude} lng={this.state.longitude} />
                </GoogleMapReact>
            </div>
        );
    }
}

export default Maps;