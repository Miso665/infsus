import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";

function TestDrive() {
    let navigate = useNavigate()
    const testDriveId = useParams().testDriveId
    const [testDrive, setTestDrive] = useState({
        testdrivetime: null,
        testdriveconcluded: null,
        stockid: null,
        userid: null
    })

    let stock = ["Civic Type R", "Taycan", "Focus Titanium"]
    let users = ["Mirko", "Stanko"]

    const getTestDriveData = async () => {
        try {
            const response = await fetch("http://localhost:5000/testdrives/" + testDriveId,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await response.json();
            //console.log(jsonData);
            setTestDrive(jsonData)

        } catch (e) {
            console.log(e)
        }
    }

    const setTestDriveData = async () => {
        try {
            const response = await fetch("http://localhost:5000/testdrives/edit/" + testDriveId,
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(testDrive)
                });
            let jsonData = await response.json();
            console.log(jsonData);

        } catch (e) {
            console.log(e)
        }

    }

    const deleteTestDrive = async () => {
        try {
            const response = await fetch("http://localhost:5000/testdrives/delete/" + testDriveId,
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
        getTestDriveData();
    }, []);
    const onChange = e => {
        setTestDrive({ ...testDrive, [e.target.name]: e.target.value })
    }

    return (
        <>
            <br />
            <div style={{
                margin: "auto",
                width: "50%"
            }}>
                <br />
                <Form.Select aria-label="stock" onChange={e => console.log(e.target.value)}>
                    <option>Odaberite na zalihi</option>
                    {Object.values(stock).map((st) => {
                        return (<option>{st}</option>)
                    })}
                </Form.Select>
                <br />
                <Form.Select aria-label="users" onChange={e => console.log(e.target.value)}>
                    <option>Odaberite korisnika</option>
                    {Object.values(users).map((user) => {
                        return (<option>{user}</option>)
                    })}
                </Form.Select>
                <br />

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Vrijeme testne vožnje</InputGroup.Text>
                    <Form.Control
                        placeholder="Boja"
                        aria-label="testdrivetime"
                        name="testdrivetime"
                        aria-describedby="basic-addon1"
                        onChange={e => onChange(e)}
                        value={testDrive.testdrivetime}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Status testne vožnje</InputGroup.Text>
                    <Form.Control
                        placeholder="Boja"
                        aria-label="testdriveconcluded"
                        name="testdriveconcluded"
                        aria-describedby="basic-addon1"
                        onChange={e => onChange(e)}
                        value={testDrive.testdriveconcluded}
                    />
                </InputGroup>
            </div>
        </>
    )

}

export default TestDrive