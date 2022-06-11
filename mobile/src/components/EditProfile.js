import React, {useEffect, useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, TextInput, ScrollView, View, Image, Button} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {COLORS} from "../utils/consts";
import {fetchUser, updateUser} from "../http/userAPI";
import {useDispatch, useSelector} from "react-redux";
import {setProfileAction} from "../store/userReducer";
import * as ImagePicker from 'expo-image-picker';


const EditProfile = ({show, onHide}) => {
    const [phone, setPhone] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [gender, setGender] = useState('')
    const [birth_date, setBirth_date] = useState('')
    const [file, setFile] = useState(null)
    const [check, setCheck] = useState(true)

    const dispatch = useDispatch()
    const profile = useSelector(state => state.user.profile)


    const selectFile = e => {
        setFile(e.target.files[0])
        console.log("2")
    }

    const onChangeGender = (label, value) => {
        console.log(label, value)
        setGender(value)
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        const formData = new FormData()
        console.log(formData)
        formData.append('firstname', 'Курва')
        formData.append('lastname', 'Лярва')
        formData.append('file', {
            uri: result.uri,
            type: result.type,
            name: "image",
        })
        console.log(formData)
        updateUser(formData).then(data => {onHide()
        console.log(data)} )

    }

    const update = () => {
        let data = {phone: '', firstname:'', lastname:'', gender:'', birth_date:'' }
        data.firstname = firstname
        data.phone = phone
        data.lastname = lastname
        data.gender = gender
        data.birth_date = birth_date
        updateUser(data).then(e => {onHide()
            dispatch(setProfileAction(e))
            console.log(e)} )

    }

    // const update = () => {
    //     const formData = new FormData()
    //     formData.append('phone', phone)
    //     formData.append('firstname', firstname)
    //     formData.append('lastname', lastname)
    //     formData.append('gender', gender)
    //     formData.append('birth_date', birth_date)
    //     formData.append('img', file)
    //     updateUser(formData).then(data => {onHide()
    //     console.log(data)} )
    // }

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
                    <ScrollView contentContainerStyle={styles.container}>
                        <Text>First Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={profile.firstname}
                            onChangeText={setFirstname}
                            value={firstname}
                        />
                        <Text>Last name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={profile.lastname}
                            onChangeText={setLastname}
                            value={lastname}
                        />
                        <Text>Phone number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={profile.phone}
                            autoComplete='cc-number'
                            onChangeText={setPhone}
                            value={phone}
                            keyboardType='number-pad'
                        />
                        <Pressable style={styles.button} onPress={() => update()}>
                            <Text style={styles.button_value}>update</Text>
                        </Pressable>
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
            width: '80%',
            borderRadius: 10,
            backgroundColor: COLORS.white,
            padding: 10,
            marginTop: 10,
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
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