import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function CarStock() {
    let navigate = useNavigate()
    const stockId = useParams().stockId
    const [carStock, setCarStock] = useState({
        stockcolor: null,
        stockrims: null,
        stockprice: null,
        stockbought: null
    })
    const [testDrives, setTestDrives] = useState([])
    let models = ["Golf 4 1.9TDI", "Aventador", "LFA"]

    const getStockData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/carstocks/" + stockId,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await response.json();
            //console.log(jsonData);
            setCarStock(jsonData)

        } catch (e) {
            console.log(e)
        }
    }

    const setStockData = async () => {
        try {
            const response = await fetch("http://localhost:5000/stock/edit/" + stockId,
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(CarStock)
                });
            let jsonData = await response.json();
            console.log(jsonData);

        } catch (e) {
            console.log(e)
        }

    }

    const deleteStock = async () => {
        try {
            const response = await fetch("http://localhost:5000/stock/delete/" + stockId,
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

    const getTestDriveData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/carstocks/" + stockId + "/testdrives",
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await response.json();
            setTestDrives(jsonData)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getStockData();
        getTestDriveData()
    }, []);
    const onChange = e => {
        setCarStock({ ...carStock, [e.target.name]: e.target.value })
    }
    return (<>
        <br />
        <div style={{
            margin: "auto",
            width: "50%"
        }}>
            <br />
            <Form.Select aria-label="model" onChange={e => console.log(e.target.value)}>
                <option>Odaberite model</option>
                {Object.values(models).map((model) => {
                    return (<option>{model}</option>)
                })}
            </Form.Select>
            <br />

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Boja automobila</InputGroup.Text>
                <Form.Control
                    placeholder="Boja"
                    aria-label="stockcolor"
                    name="stockcolor"
                    aria-describedby="basic-addon1"
                    onChange={e => onChange(e)}
                    value={carStock.stockcolor}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Naplatci</InputGroup.Text>
                <Form.Control
                    placeholder="Naplatci"
                    aria-label="stockrims"
                    name="stockrims"
                    aria-describedby="basic-addon1"
                    onChange={e => onChange(e)}
                    value={carStock.stockrims}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Status</InputGroup.Text>
                <Form.Control
                    placeholder="Status"
                    aria-label="stockbought"
                    name="stockbought"
                    aria-describedby="basic-addon1"
                    onChange={e => onChange(e)}
                    value={carStock.stockbought}
                />
            </InputGroup>
            <div style={{
                margin: "auto",
                width: "40%"
            }}>
                <Button variant="success" onClick={setStockData()} className="me-2">Spremi promjene</Button>
                <Button variant="danger" onClick={deleteStock()}>Obriši</Button>
            </div>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Vrijeme</th>
                        <th>Status</th>
                        <th>Korisnik</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(testDrives).map((testDrive) => {
                        return (<tr>
                            <td>{testDrive.testdrivetime}</td>
                            <td>{testDrive.testdriveconcluded}</td>
                            <td>{testDrive.korisnik}</td>
                            <td><Button variant="warning" href={"/testdrive/" + testDrive.testdriveid}>Uredi</Button>
                                <Button variant="danger">Obriši</Button></td>
                        </tr>)
                    })}
                    <tr>
                        <td>Crvena</td>
                        <td>VOLK TE37 19in</td>
                        <td>30000</td>
                        <td><Button variant="warning" className="me-2">Uredi</Button>
                            <Button variant="danger">Obriši</Button></td>

                    </tr>
                </tbody>
            </Table>
        </div>
    </>)
}

export default CarStock