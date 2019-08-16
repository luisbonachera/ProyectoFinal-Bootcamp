import React, { Component } from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';

const SimpleMap: React.FC = () => {
    const [lat, setLat] = React.useState(59.955413);
    const [lng, setLng] = React.useState(30.337844);
    const [zoom, setZoon] = React.useState(17);
    const [text, setText] = React.useState("My Marker");

    React.useEffect(() => navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
    }), []);

    return (
        // Important! Always set the container height explicitly
        // <div style={{ height: '100vh', width: '100%' }}>
        <div style={{ height: '75vh', width: '100%' }}>

            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBYxy1Jy0ByL-Rdvxlqk7LkIOsSU2Nls38" }}
                center={{ lat, lng }}
                zoom={zoom}
            >
            </GoogleMapReact>
        </div>
    );
}


export default SimpleMap;
// const handleApiLoaded = ( mapa , mapas ) => {
//   //  usa mapas y objetos de mapas
// } ;

// ...

// < GoogleMapReact
//   bootstrapURLKeys = { {  clave : / *  SU CLAVE AQUÍ  * / } }  
//   defaultCenter = { this . apoyos . centro }
//   defaultZoom = { this . apoyos . zoom }
//   yesIWantToUseGoogleMapApiInternals
//   onGoogleApiLoaded = { ( {  mapa ,  mapas  } ) =>  handleApiLoaded ( mapa ,  mapas ) } 
// >
//   < AnyReactComponent
//     lat = { 59 . 955413 }
//     lng = { 30 . 337844 }
//     text = " Mi marcador "
//   / >
// < / GoogleMapReact ></GoogleMapReact>