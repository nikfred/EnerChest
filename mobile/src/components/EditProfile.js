import React, {useEffect, useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, TextInput, ScrollView, View, Image, Button} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {COLORS} from "../utils/consts";
import {fetchUser, updateImageUser, updateUser} from "../http/userAPI";
import {useDispatch, useSelector} from "react-redux";
import {setProfileAction} from "../store/userReducer";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Dropdown} from "react-native-element-dropdown";
import RNDateTimePicker from "@react-native-community/datetimepicker";


const EditProfile = ({show, onHide}) => {
    const [phone, setPhone] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [gender, setGender] = useState('')
    const [birth_date, setBirth_date] = useState('')
   // const [file, setFile] = useState(null)
    const [check, setCheck] = useState(false)

    const dispatch = useDispatch()
    const profile = useSelector(state => state.user.profile)
    //const auth = AsyncStorage.getItem('accessToken')

    const onChange = (event, selectedDate) => {
        setBirth_date(selectedDate.toString());
        setCheck(!check)
        console.log(birth_date)
    };

    const onChangeGender = (label, value) => {
        console.log(label, value)
        setGender(value)
    }

    const data = [
        { label: 'Male', value: 'Мужской' },
        { label: 'Female', value: 'Женский' },
        { label: 'Other', value: 'Другой' },
    ]

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        console.log(result)
        const data = new FormData();
        data.append('file', {
            uri: result.uri,
            type: result.type,
            name: "image",
        })
        console.log(data)
        // fetch('http://192.168.1.103:5000/api/user', {
        //     method: 'put',
        //     body: data,
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'multipart/form-data;',
        //         authorization: `Bearer ${auth._W}`,
        //     }
        // }).then(console.log).catch(console.log)
        updateImageUser(data).then(data => {onHide()
        console.log(data)} )
    }


    const update = () => {
        let data = {phone: '', firstname:'', lastname:'', gender:'', birth_date:'' }
        data.firstname = firstname
        data.phone = phone
        data.lastname = lastname
        data.gender = gender
        data.birth_date = birth_date
        updateUser(data).then(e => {
            onHide()
            dispatch(setProfileAction(e))
            console.log(e)
            setFirstname(' ')
            setLastname('')
            setPhone(' ')
            setGender(' ')
            setBirth_date('')
        })

    }

    return (
        <>
            <Modal visible={show} animationType='fade' onRequestClose={() => onHide()}>
                <View style={styles.settingPage}>
                    <View style={styles.headBlock}>
                        <Text style={styles.headText}>Edit profile</Text>
                        <AntDesign name="closecircle" size={40} color="black" onPress={() => onHide()}/>
                    </View>
                    <View style={styles.rectangle}></View>
                    <View style={styles.containerHead}>
                    <Image
                        source={!profile.imageUrl ? require('../../assets/img/img.png')  : {uri: profile.imageUrl}}
                        style={styles.image}/>
                        <Pressable style={styles.button} onPress={() => pickImage()}>
                            <Text style={styles.button_value}>Edit photo</Text>
                        </Pressable>
                    </View>
                    <ScrollView>
                        <Text style={styles.title}>First name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={profile.firstname}
                            onChangeText={setFirstname}
                            value={firstname}
                        />
                        <Text style={styles.title}>Last name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={profile.lastname}
                            onChangeText={setLastname}
                            value={lastname}
                        />
                        <Text style={styles.title}>Phone number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={profile.phone}
                            autoComplete='cc-number'
                            onChangeText={setPhone}
                            value={phone}
                            keyboardType='number-pad'
                        />
                        <Text style={styles.title}>Gender</Text>
                        <Dropdown
                            style={styles.input}
                            data={data}
                            onChange={(e) => setGender(e.value)}
                            labelField="label"
                            valueField="value"
                            value={gender}
                            placeholder={gender || "Gender"}
                            selectedTextStyle={styles.selectedTextStyle}
                            placeholderStyle={styles.placeholderStyle}

                        />
                        <Text style={styles.title}>Birth date</Text>
                        <Pressable style={styles.input} onPress={() => setCheck(!check)}>
                            <Text style={styles.button_value}>{birth_date?.substring(3, 16) || profile.birth_date?.substring(0, 10)}</Text>
                        </Pressable>
                        {check && (
                            <RNDateTimePicker
                                mode="date"
                                value={birth_date ? new Date(birth_date) : new Date() }
                                onChange={onChange}
                                themeVariant=""
                                style={styles.input}
                                display="calendar"
                            />
                        )}
                        <View style={styles.container}>
                        <Pressable style={styles.button} onPress={() => update()}>
                            <Text style={styles.button_value}>update</Text>
                        </Pressable>
                        </View>
                    </ScrollView>

                </View>
            </Modal>
        </>


    );
};

const styles = StyleSheet.create(
    {
        headBlock: {
            alignItems: 'center',
            justifyContent: "space-between",
            flexDirection: "row",
        },
        headText: {
            fontSize: 30,
            color: COLORS.white,
            textAlign: 'center',
            margin: 5,
        },
        title: {
          color: COLORS.white,
            marginTop: 5,
        },
        rectangle: {
            width: '90%',
            height: 3,
            backgroundColor: COLORS.gray,
            alignContent: "center",
        },
        settingPage: {
            height: '100%',
            width: '100%',
            backgroundColor: COLORS.darkgray,
            padding: 10,
        },
        input: {
            color: COLORS.green,
            fontSize: 15,
            height: 50,
            width: '95%',
            borderRadius: 10,
            backgroundColor: COLORS.lightgray,
            padding: 10,
            marginTop: 5,
        },
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        content: {
            color: '#C4C4C4',
            fontSize: 30,
        },
        pass_block: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "space-between",
            width: '80%',
        },
        button: {
            width: '50%',
            height: 50,
            backgroundColor: COLORS.green,
            margin: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        button_value: {
            color: COLORS.gray,
            fontSize: 18,
        },
        placeholderStyle: {
            fontSize: 16,
        },
        selectedTextStyle: {
            fontSize: 16,
            marginLeft: 8,
        },
        image: {
            height: 150,
            width: 150,
            borderRadius: 100,
            marginTop: 15,
            marginLeft: 15,
            borderColor: "#50C878",
            borderWidth: 3,
        },
        containerHead: {
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: "center"
        },
    }
)

export default EditProfile;