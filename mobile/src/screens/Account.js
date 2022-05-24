import {StyleSheet, Image, Text, View, ScrollView, Button, Pressable} from 'react-native';
import {AntDesign, FontAwesome, MaterialIcons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import Setting from "../components/Setting";
import {COLORS} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import Auth from "./Auth";
import {fetchUser, logout} from "../http/userAPI";
import {setAdminAction, setAuthAction, setUserAction} from "../store/userReducer";

const Account = ({ navigation: {navigate}}) => {
    const [contact, setContact] = useState(true)
    const [information, setInformation] = useState(true)
    const [circleContact, setCircleContact] = useState("downcircle")
    const [circleInfo, setCircleInfo] = useState("downcircle")
    const [visibleSetting, setVisibleSetting] = useState(false)
    const [profile, setProfile] = useState(' ')

    const dispatch = useDispatch()
    const login = useSelector(state => state.user.isAuth)


    useEffect(() => {
        fetchUser().then(data => {
            setProfile(data)
        })
    }, [])

    const logOut = () => {
        logout().then(r => console.log(r))
        dispatch(setAuthAction(false))
        dispatch(setUserAction(' '))
        dispatch(setAdminAction(false))
    }

    const contact_visible = () => {
        setContact(!contact)
        if (circleContact === "downcircle") {
            setCircleContact("upcircle")
        } else {
            setCircleContact("downcircle")
        }
    }

    const info_visible = () => {
        setInformation(!information)
        if (circleInfo === "downcircle") {
            setCircleInfo("upcircle")
        } else {
            setCircleInfo("downcircle")
        }
    }

    return (
        <View style={styles.background}>
            <View style={styles.containerHead}>
                <Image
                    source={!profile.imageUrl ? require('../../assets/img/img.png')  : {uri: profile.imageUrl}}
                    style={styles.image}/>
                <View style={styles.containerInfo}>
                    {profile.isActivated ? false : <Text>Please activated your account</Text>}
                    <Text
                        style={profile.role === 'ADMIN' ? styles.roleColor_admin : profile.role === 'USER' ? styles.roleColor_user : styles.roleColor_other}>
                        {profile.role}
                    </Text>
                    <Text style={[styles.content, styles.firstname]}>{profile.firstname}</Text>
                    <Text style={styles.content}>{profile.lastname}</Text>
                </View>
            </View>

            {!login ?
                <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                    <Pressable style={styles.accordion} onPress={() => navigate('Auth')}>
                        <AntDesign name="edit" size={30} color="#318CE7"/>
                        <Text style={styles.accordion_title}>Edit profile</Text>
                        <AntDesign name="rightcircle" size={24} color="#318CE7"/>
                    </Pressable>
                </ScrollView>
                :

                <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                    <Pressable style={styles.accordion} onPress={contact_visible}>
                        <AntDesign name="link" size={30} color="#50C878"/>
                        <Text style={styles.accordion_title}>Contact</Text>
                        <AntDesign name={circleContact} size={24} color="#50C878"/>
                    </Pressable>
                    <View style={contact ? styles.contact_v : false}>
                        <Text style={[styles.content, styles.accordion_item]}><AntDesign name="phone" size={18}
                                                                                         color="#50C878"/> {profile.phone}
                        </Text>
                        <Text style={[styles.content, styles.accordion_item]}><AntDesign name="mail" size={18}
                                                                                         color="#50C878"/> {profile.email}
                        </Text>
                    </View>
                    <Pressable style={styles.accordion} onPress={info_visible}>
                        <AntDesign name="contacts" size={30} color="#50C878"/>
                        <Text style={styles.accordion_title}>Info</Text>
                        <AntDesign name={circleInfo} size={24} color="#50C878"/>
                    </Pressable>
                    <View style={information ? styles.info_v : false}>
                        <Text style={[styles.content, styles.accordion_item]}><FontAwesome name="birthday-cake"
                                                                                           size={18}
                                                                                           color="#50C878"/> {profile.birth_date?.substring(0, 10)}
                        </Text>
                        <Text style={[styles.content, styles.accordion_item]}><FontAwesome name="genderless"
                                                                                           size={18}
                                                                                           color="#50C878"/> {profile.gender}
                        </Text>
                    </View>
                    <Pressable style={styles.accordion}>
                        <AntDesign name="edit" size={30} color="#318CE7"/>
                        <Text style={styles.accordion_title}>Edit profile</Text>
                        <AntDesign name="rightcircle" size={24} color="#318CE7"/>
                    </Pressable>
                    <Pressable style={styles.accordion} onPress={() => setVisibleSetting(!visibleSetting)}>
                        <AntDesign name="setting" size={30} color="#5E4360"/>
                        <Text style={styles.accordion_title}>Setting</Text>
                        <AntDesign name="rightcircle" size={24} color="#5E4360"/>
                        <Setting show={visibleSetting} onHide={() => setVisibleSetting(false)}/>
                    </Pressable>
                    <Pressable style={styles.accordion}>
                        <MaterialIcons name="payment" size={30} color="#F4CA16"/>
                        <Text style={styles.accordion_title}>Payment Setting</Text>
                        <AntDesign name="rightcircle" size={24} color="#F4CA16"/>
                    </Pressable>
                    <Pressable style={styles.accordion} onPress={() => logOut()}>
                        <AntDesign name="login" size={30} color="#DC5678"/>
                        <Text style={styles.accordion_title}>Log Out</Text>
                        <AntDesign name="rightcircle" size={24} color="#DC5678"/>
                    </Pressable>

                </ScrollView>
            }
        </View>
    );
};

const styles = StyleSheet.create(
    {
        background: {
            backgroundColor: COLORS.darkgray,
            height: '100%',
            width: '100%',
        },
        containerHead: {
            flexDirection: "row",
            justifyContent: 'space-between',
        },
        containerInfo: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        container: {
            marginTop: 10,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            backgroundColor: '#505050',
            height: '100%'
        },
        accordion: {
            alignItems: 'center',
            marginTop: 10,
            borderRadius: 30,
            backgroundColor: '#6C6C6C',
            width: '90%',
            padding: 12,
            justifyContent: "space-between",
            flexDirection: "row",
            color: '#C4C4C4',
            fontSize: 20,
        },
        accordion_title: {
            color: '#C4C4C4',
            fontSize: 20,
        },
        accordion_item: {
            alignItems: 'center',
            marginTop: 5,
            borderRadius: 20,
            backgroundColor: '#6C6C6C',
            width: 300,
            padding: 8,
            justifyContent: "space-between",
            flexDirection: "row",
            color: '#C4C4C4',
            fontSize: 16,
        },
        content: {
            color: '#C4C4C4',
            fontSize: 28,
            fontFamily: ""
        },
        contact_v: {
            display: "none"
        },
        info_v: {
            display: "none"
        },
        firstname: {
            fontWeight: "bold",
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
        roleColor_admin: {
            fontSize: 16,
            borderWidth: 1,
            padding: 5,
            borderColor: "#50C878",
            color: "#50C878",
        },
        roleColor_user: {
            fontSize: 16,
            borderWidth: 1,
            padding: 5,
            borderColor: "#9457EB",
            color: "#9457EB",
        },
        roleColor_other: {
            fontSize: 16,
            borderWidth: 1,
            padding: 5,
            borderColor: "#F07427",
            color: "#F07427",
        }
    });

export default Account;