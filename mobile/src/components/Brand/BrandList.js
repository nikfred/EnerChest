import React from 'react';
import {SafeAreaView, SectionList, Text} from "react-native";
import BrandItem from "./BrandItem";
import {useSelector} from "react-redux";
import SectionHeader from "./SectionHeader";

const BrandList = () => {

    const {brands} = useSelector(state => state.product)

    const makeSections = () => {
        const rawBrands = brands.sort((a, b) => a.brand > b.brand ? 1 : a.brand < b.brand ? -1 : 0)
        const set = [...(new Set(rawBrands.map(i => i.brand[0])))]
        return set.map(i => i = {title: i, data: rawBrands.filter(e => e.brand[0] === i)})
    }

    return (
        <SafeAreaView style={{width: '100%', height: '100%'}}>
            <SectionList
                sections={makeSections()}
                renderItem={({item}) => <BrandItem brandItem={item}/>}
                renderSectionHeader={({section}) => <SectionHeader title={section.title}/>}
                keyExtractor={item => item._id}
            />
        </SafeAreaView>
    );
};

export default BrandList;