import React, {createRef, useEffect, useRef, useState} from 'react';
import MapView, {Callout, Marker} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions, Pressable} from 'react-native';
import {fetchDispensers} from "../http/dispenserAPI";
import {useDispatch, useSelector} from "react-redux";
import {setDispenserAction} from "../store/productReducer";
import {COLORS} from "../utils/consts";
import {AntDesign} from "@expo/vector-icons";
import CustomCallout from "../components/CustomCallout";

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
    const dispatch = useDispatch()
    const isSelect = !!useSelector(state => state.product.dispenser)

    useEffect(() => {
        fetchDispensers().then(data => setDispensers(data.filter(i => i.status)))
    }, [])


    const [elRefs, setElRefs] = React.useState([]);
    const arrLength = dispensers.length

    useEffect(() => {
        setElRefs(() =>
            Array(arrLength)
                .fill()
                .map((_, i) => elRefs[i] || createRef()))
    }, [arrLength])

    const show = (index) => {
        setTimeout(() => elRefs[index].current.showCallout(), 0);
    }

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: 46.44349,
                    longitude: 30.73628,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                customMapStyle={mapStyle}
                style={styles.map}
            >
                {dispensers.map((dispenser, i) =>
                    <Marker
                        ref={elRefs[i]}
                        key={dispenser._id}
                        coordinate={{
                            latitude: +dispenser.latitude,
                            longitude: +dispenser.longitude,
                        }}
                        image={require('../../assets/img/maps.png')}
                        title={dispenser.address}
                        onCalloutPress={() => {
                            dispatch(setDispenserAction(dispenser))
                            show(i)
                        }}
                    >
                        <Callout tooltip>
                            <CustomCallout dispenser={dispenser}/>
                        </Callout>
                    </Marker>
                )}

            </MapView>
            {isSelect &&
                <Pressable style={styles.drop} onPress={() => dispatch(setDispenserAction(null))}>
                    <AntDesign name="closecircle" size={40} color={COLORS.red}/>
                </Pressable>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.darkgray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    drop: {
        position: "absolute",
        top: 40,
        left: 40,
        backgroundColor: COLORS.gray,
        borderRadius: 90
    },
    custom: {
        borderRadius: 20,
        backgroundColor: COLORS.lightgray,
    }
});

export default Maps;