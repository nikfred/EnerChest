import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {fetchDispensers} from "../http/dispenserAPI";

const mapStyle = [
    {
        "featureType": "landscape",
        "stylers": [
            {
                "saturation": 5
            },
            {
                "lightness": -5
            },
            {
                "weight": 2.5
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]

const Maps = () => {

    const [dispensers, setDispensers] = useState([])

    useEffect(() => {
        fetchDispensers().then(data => setDispensers(data.filter(i => i.status)))
    }, [])

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: 46.45735,
                    longitude: 30.7444,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                customMapStyle={mapStyle}
                style={styles.map} >
                {dispensers.map( dispenser =>
                    <Marker
                        key={dispenser._id}
                        coordinate={{
                            latitude: +dispenser.latitude,
                            longitude: +dispenser.longitude,
                        }}
                        image={require('../../assets/img/maps.png')}
                    />
                )}

            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default Maps;