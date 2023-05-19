import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";

function User() {
    let navigate = useNavigate()
    const userId = useParams().userId
    const [user, setUser] = useState({
        username: null,
        usersurname: null,
        useroib: null,
        roleid: null
    })

    let roles = ["Admin", "Neadmin"]

    const getUserData = async () => {
        try {
            const response = await fetch("http://localhost:5000/users/" + userId,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await response.json();
            //console.log(jsonData);
            setUser(jsonData)

        } catch (e) {
            console.log(e)
        }
    }

    const setUserData = async () => {
        try {
            const response = await fetch("http://localhost:5000/users/edit/" + userId,
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

    const deleteUser = async () => {
        try {
            const response = await fetch("http://localhost:5000/users/delete/" + userId,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await response.json();
            navigate("/")

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getUserData();
    }, []);
    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <>
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
            </div>
        </>
    )

}

export default User