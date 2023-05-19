import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

function AddUser() {
    const [user, setUser] = useState({
        username: null,
        usersurname: null,
        useroib: null
    })

    let roles = ["ADmin", "Neadmin"]

    const addNewUser = async () => {
        try {
            const response = await fetch("http://localhost:5000/users/add",
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(user)
                });
            let jsonData = await response.json();
            console.log(jsonData);

        } catch (e) {
            console.log(e)
        }

    }
    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    return (<>
        <br />
        <div style={{
            margin: "auto",
            width: "50%"
        }}>
            <br />
            <Form.Select aria-label="roles" onChange={e => console.log(e.target.value)}>
                <option>Odaberite ulogu</option>
                {Object.values(roles).map((role) => {
                    return (<option>{role}</option>)
                })}
            </Form.Select>
            <br />

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Ime korisnika</InputGroup.Text>
                <Form.Control
                    placeholder="Ime"
                    aria-label="username"
                    name="username"
                    aria-describedby="basic-addon1"
                    onChange={e => onChange(e)}
                    value={user.username}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Prezime korisnika</InputGroup.Text>
                <Form.Control
                    placeholder="Prezime"
                    aria-label="usersurname"
                    name="usersurname"
                    aria-describedby="basic-addon1"
                    onChange={e => onChange(e)}
                    value={user.usersurname}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">OIB korisnika</InputGroup.Text>
                <Form.Control
                    placeholder="OIB"
                    aria-label="useroib"
                    name="useroib"
                    aria-describedby="basic-addon1"
                    onChange={e => onChange(e)}
                    value={user.useroib}
                />
            </InputGroup>
            <Button variant="primary" onClick={addNewUser()}>Dodaj novog korisnika</Button>
        </div>
    </>)
}

export default AddUser