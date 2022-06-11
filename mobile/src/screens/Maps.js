import React, {createRef, useEffect, useRef, useState} from 'react';
import MapView, {Callout, Marker} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions, Pressable} from 'react-native';
import {fetchDispensers} from "../http/dispenserAPI";
import {useDispatch, useSelector} from "react-redux";
import {setDispenserAction, setDispensersInfoAction, setProductAction} from "../store/productReducer";
import {COLORS} from "../utils/consts";
import {AntDesign} from "@expo/vector-icons";
import CustomCallout from "../components/CustomCallout";
import ProductModal from "../components/ProductModal";

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

const Maps = ({navigation: {navigate}}) => {

    const [dispensers, setDispensers] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const dispatch = useDispatch()
    const selected = useSelector(state => state.product.dispenser)
    const {product, dispensersInfo, dispenser} = useSelector(state => state.product)

    useEffect(() => {
        fetchDispensers().then(data => setDispensers(data.filter(i => i.status)))
    }, [])

    const onHide = () => {
        setModalVisible(false)
        dispatch(setProductAction({}))
        // dispatch(setDispenserAction([]))
    }

    const [elRefs, setElRefs] = useState([]);
    const arrLength = dispensers.length

    useEffect(() => {
        setElRefs(() =>
            Array(arrLength)
                .fill()
                .map((_, i) => elRefs[i] || createRef()))
    }, [arrLength])

    const showCallout = (index) => {
        setTimeout(() => elRefs[index].current.showCallout(), 0);
    }

    const hideCallout = () => {
        setTimeout(() => elRefs.forEach(i => i.current.hideCallout()), 0);
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
                            showCallout(i)
                            if (product.id) {
                                const info = dispensersInfo.filter(i => i.dispenser_id === dispenser._id)[0]
                                dispatch(setProductAction({
                                    ...product,
                                    quantityAll: info?.quantityAll || 0,
                                    quantityFree: info?.quantityFree || 0
                                }))
                                setModalVisible(true)
                            }
                        }}
                    >
                        <Callout tooltip>
                            <CustomCallout dispenser={dispenser}/>
                        </Callout>
                    </Marker>
                )}

            </MapView>

            <View style={styles.control}>
                {!!selected &&
                    <Pressable style={styles.button} onPress={() => {
                        hideCallout()
                        dispatch(setDispenserAction(null))
                    }}
                    >
                        <Text style={styles.text}>{selected.address} </Text>
                        <AntDesign name="close" size={24} color={COLORS.white}/>
                    </Pressable>
                }
                {product.id &&
                    <Pressable style={styles.button} onPress={() => {
                        hideCallout()
                        dispatch(setProductAction({}))
                        dispatch(setDispensersInfoAction([]))
                    }}>
                        <Text style={styles.text}>{product.brand} {product.name} </Text>
                        <AntDesign name="close" size={24} color={COLORS.white}/>
                    </Pressable>
                }
            </View>
            <ProductModal show={modalVisible} onHide={onHide}/>
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
    maps: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    map: {
        width: 500,
        height: 700,
    },
    control: {
        position: "absolute",
        top: 20,
        left: 20,
    },
    drop: {
        backgroundColor: COLORS.white,
        borderRadius: 90,
        width: 40
    },
    button: {
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: COLORS.darkgray,
        padding: 8,
        marginVertical: 4,
        borderRadius: 90
    },
    text: {
        color: COLORS.white,
        fontSize: 16
    }
});

export default Maps;