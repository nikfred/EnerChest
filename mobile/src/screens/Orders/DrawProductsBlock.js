import React from 'react';
import {Text, View} from "react-native";
import {styles} from "./styles";

const DrawProductsBlock = (props) => {
    return (
        <View>
            {props.products.map(product => {
                return (
                    <View key={product.id}>
                        <Text style={styles.nameProduct}>{product.brand + ' ' + product.name}</Text>
                        <View style={styles.nameWithPriceWrapper}>
                            <Text>{product.quantity} units X {product.price}/unit</Text>
                            <Text style={styles.totalPricePerUnit}>{product.quantity * product.price} ₴</Text>
                        </View>
                    </View>
                )
            })}
        </View>

    );
};

export default DrawProductsBlock;