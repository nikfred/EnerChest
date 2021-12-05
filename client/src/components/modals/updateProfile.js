import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Form, FormControl, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {fetchUser, updateUser} from "../../http/userAPI";

const UpdateProfile = observer(({show, onHide}) => {

    const [profile, setProfile] = useState(' ')

    const [phone, setPhone] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [gender, setGender] = useState('')
    const [birth_date, setBirth_date] = useState('')

    useEffect(()=> {
        fetchUser().then(data=> {
            setProfile(data)
        })
    }, [])

    const update = () => {
        updateUser(phone, firstname, lastname, gender, birth_date).then(data => onHide())
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Phone
                    <FormControl
                        className="mb-3"
                        placeholder={profile.phone}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    First name
                    <FormControl
                        className="mb-3"
                        placeholder={profile.firstname}
                        value={firstname}
                        onChange={e => setFirstname(e.target.value)}
                    />
                    Last name
                    <FormControl
                        className="mb-3"
                        placeholder={profile.lastname}
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                    />
                    Gender
                    <Dropdown className="mb-3" variant='success'>
                        <Dropdown.Toggle>{gender || profile.gender}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setGender('Мужской')}>Мужской</Dropdown.Item>
                            <Dropdown.Item onClick={() => setGender('Женский')}>Женский</Dropdown.Item>
                            <Dropdown.Item onClick={() => setGender('Другой')}>Другой</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    Birth date
                    <FormControl
                        className="mb-3"
                        placeholder={profile.birth_date}
                        type='date'
                        value={birth_date}
                        onChange={e => setBirth_date(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={update}>Update</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateProfile;