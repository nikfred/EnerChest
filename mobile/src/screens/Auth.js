import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput, Pressable} from 'react-native';
import {COLORS} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {login, registration} from "../http/userAPI";
import {setAuthAction, setUserAction} from "../store/userReducer";
import {MaterialIcons} from "@expo/vector-icons";
import {Dropdown} from "react-native-element-dropdown";
import RNDateTimePicker from "@react-native-community/datetimepicker";


const Auth = () => {
    const [email, setEmail] = useState('shmara@gmail.ua')
    const [password, setPassword] = useState('1234567890')
    const [check, setCheck] = useState(true)
    const [show, setShow] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [phone, setPhone] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [gender, setGender] = useState('')
    const [birth_date, setBirth_date] = useState('')

    const data = [
        { label: 'Male', value: 'Мужской' },
        { label: 'Female', value: 'Женский' },
        { label: 'Other', value: 'Другой' },
    ]


    const dispatch = useDispatch()
    const profile = useSelector(state => state.user.user)
    const isAuth = useSelector(state => state.user.isAuth)
    let text

    const onChange = (event, selectedDate) => {
        setBirth_date(selectedDate.toString());
        setShow(!show)
    };

    const onChangeGender = (label, value) => {
        console.log(label, value)
        setGender(value)
    }

    const click = async () => {
        try {
            let data;
            if (isLogin){
                data = await login(email, password);
            } else {
                data = await registration(email, password, phone, firstname, lastname, gender, birth_date);
            }
            dispatch(setAuthAction(true))
            dispatch(setUserAction(data))
        } catch (e) {
            text = 'Есле ошика "Invalid login: 535-5.7.8 Username and ......" то всё ахуенно, это бек матюки бросает !'
            console.log(text, email, password, profile.role, isAuth)
            console.log(e.response.data.message)
        }

    }

    return (
        <>
        {isLogin ?
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.content}>Log In</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your e-mail"
                    onChangeText={setEmail}
                    value={email}
                />
                <View style={styles.pass_block}>
                    <TextInput
                        style={[styles.input, {width: '90%'}]}
                        placeholder="Enter your password"
                        onChangeText={setPassword}
                        secureTextEntry={check}
                        value={password}
                    />
                    <Pressable onPress={() => setCheck(!check)}>
                        {!check ?
                            <MaterialIcons name="visibility" size={24} color={COLORS.white}/>
                            :
                            <MaterialIcons name="visibility-off" size={24} color={COLORS.gray}/>
                        }
                    </Pressable>
                </View>
                <Pressable style={styles.button} onPress={() => click()}>
                    <Text style={styles.button_value}>Login</Text>
                </Pressable>
                <Pressable style={{display: 'none'}}>
                    <Text style={styles.button_value}>Forgot your password?</Text>
                </Pressable>
                <Pressable onPress={() => setIsLogin(!isLogin)}>
                    <Text style={styles.button_value}>Don't have an account? Sign up</Text>
                </Pressable>
            </ScrollView>
        :
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.content}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your e-mail"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType='email-address'

                />
                <View style={styles.pass_block}>
                    <TextInput
                        style={[styles.input, {width: '90%'}]}
                        placeholder="Enter your password"
                        onChangeText={setPassword}
                        secureTextEntry={check}
                        value={password}
                    />
                    <Pressable onPress={() => setCheck(!check)}>
                        {!check ?
                            <MaterialIcons name="visibility" size={24} color={COLORS.white}/>
                            :
                            <MaterialIcons name="visibility-off" size={24} color={COLORS.gray}/>
                        }
                    </Pressable>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter phone number"
                    autoComplete='cc-number'
                    onChangeText={setPhone}
                    value={phone}
                    keyboardType='number-pad'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter first name"
                    onChangeText={setFirstname}
                    value={firstname}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter last name"
                    onChangeText={setLastname}
                    value={lastname}
                />
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
                <Pressable style={styles.input} onPress={() => setShow(!show)}>
                    <Text style={styles.button_value}>{birth_date?.substring(3, 16) || "Birth date"}</Text>
                </Pressable>
                {show && (
                <RNDateTimePicker
                    mode="date"
                    value={new Date()}
                    onChange={onChange}
                    themeVariant="dark"
                    style={styles.input}
                    display="spinner"
                />
                )}
                <Pressable style={styles.button} onPress={() => click()}>
                    <Text style={styles.button_value}>Sign Up</Text>
                </Pressable>
            <Pressable onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.button_value}>Have an account? Sign in</Text>
            </Pressable>
            </ScrollView>
        }
        </>
    );


};


const styles = StyleSheet.create({
    input: {
        color: COLORS.green,
        fontSize: 15,
        height: 50,
        width: '80%',
        borderRadius: 10,
        backgroundColor: COLORS.darkgray,
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
        width: '30%',
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
});

export default Auth;