import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function UsersList() {
    const [users, setUsers] = useState([])

    const getUsersData = async () => {
        try {
            const response = await fetch("http://localhost:5000/users",
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await response.json();
            //console.log(jsonData);
            setUsers(jsonData)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getUsersData();
    }, []);

    return (<>
        <br />
        <div style={{
            margin: "auto",
            width: "50%"
        }}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>OIB</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(users).map((user) => {
                        return (<tr>
                            <td>{user.username}</td>
                            <td>{user.usersurname}</td>
                            <td>{user.useroib}</td>
                            <td><Button variant="warning" href={"/user/" + user.userid}>Uredi</Button>
                                <Button variant="danger">Obriši</Button></td>
                        </tr>)
                    })}
                    <tr>
                        <td>Mirko</td>
                        <td>Mirkic</td>
                        <td>32414253472</td>
                        <td><Button variant="warning" className="me-2">Uredi</Button>
                            <Button variant="danger">Obriši</Button></td>

                    </tr>
                </tbody>
            </Table>

        </div>
    </>)

}

export default UsersList