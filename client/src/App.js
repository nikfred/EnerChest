import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbars from "./components/Navbars";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            console.log(data)
            user.setUser(data)
            user.setIsAuth(true)
            user.setIsAdmin(data.role === 'ADMIN')
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation="border" variant="success" />
    }

    return (
        <BrowserRouter>
            <Navbars/>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;
