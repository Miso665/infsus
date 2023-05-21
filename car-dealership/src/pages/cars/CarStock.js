import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

function CarStock() {
    let navigate = useNavigate()
    const stockId = useParams().stockId
    const [carStock, setCarStock] = useState({
        stockcolor: null,
        stockrims: null,
        stockprice: null,
        stockbought: null
    })
    const [detailedCarStock, setDetailedCarStock] = useState({
        model: {
            brand: {},
            modelAccelInSeconds: null,
            modelHorsePower: null,
            modelID: null,
            modelName: null,
            modelTopSpeed: null,
            modelTransmissionType: null,
        },
        modelName: null,
        stockColor: null,
        stockRims: null,
        stockPrice: null,
        stockBought: null,
        stockID: null
    })
    const [testDrives, setTestDrives] = useState([])
    let [models, setModels] = useState([])
    let [alert, setAlert] = useState(null)
    const [invalidInputs, setInvalidInputs] = useState(null)

    const getStockData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/carstocks/deepaccess/" + stockId,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await response.json();
            setDetailedCarStock({ ...jsonData, modelName: jsonData.model.modelName })
            //setDetailedCarStock({ ...jsonData, stockBought: true })
            //setDetailedCarStock({ ...detailedCarStock, stockBought: true })

        } catch (e) {
            console.log(e)
        }
    }
    const getModelData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/models",
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await response.json();
            setModels(jsonData)

        } catch (e) {
            console.log(e)
        }
    }

    const getUserData = async () => {
        // TODO fetchanje usera
    }

    const setStockData = async () => {
        let modelID
        for (let model of models) {
            if (model.modelname === detailedCarStock.modelName) {
                modelID = model.modelid
                break
            }
        }
        let body = {
            stockbought: detailedCarStock.stockBought,
            stockcolor: detailedCarStock.stockColor,
            stockprice: detailedCarStock.stockPrice,
            stockrims: detailedCarStock.stockRims,
            modelid: modelID
        }
        try {
            const response = await fetch("http://localhost:8080/api/carstocks/" + stockId,
                {
                    method: "PUT",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                });
            let jsonData = await response.json();
            console.log(jsonData);
            if (response.status === 200)
                setAlert("OK")
            else {
                setAlert("ERROR")
                setInvalidInputs(jsonData.invalidFields)
            }

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
            console.log(jsonData)
        } catch (e) {
            console.log(e)
        }
    }

    const changeStatus = (e) => {
        if (e.target.checked) {
            setDetailedCarStock({ ...detailedCarStock, stockBought: true })
        } else {
            setDetailedCarStock({ ...detailedCarStock, stockBought: false })
        }

    }

    const parseTime = (timeString) => {
        let dateTimeSplitted = timeString.split("T")
        let date = dateTimeSplitted[0]
        let time = dateTimeSplitted[1]
        let dateSplitted = date.split("-")
        let timeSplitted = time.split(":")
        return dateSplitted[2] + "." + dateSplitted[1] + "." + dateSplitted[0] + " " + timeSplitted[0] + ":" + timeSplitted[1]
    }

    useEffect(() => {
        getStockData();
        getTestDriveData()
        getModelData()
    }, []);
    const onChange = e => {
        setDetailedCarStock({ ...detailedCarStock, [e.target.name]: e.target.value })
        console.log(detailedCarStock)
    }

    const parseStatus = (status) => {
        if (status) return "Obavljeno"
        else return "Ne obavljeno"
    }
    return (<>
        <br />
        <div style={{
            margin: "auto",
            width: "50%"
        }}>
            {alert === "OK" ? <><Alert key="success" variant="success">
                Uspješno ažurirano!
            </Alert></> : <></>}
            {alert === "ERROR" ? <><Alert key="danger" variant="danger">
                Neispravno uneseni podaci! {invalidInputs.join(", ")}
            </Alert></> : <></>}
            <br />
            <Form.Text id="passwordHelpBlock" muted>
                Obavezno odabrati.
            </Form.Text>
            <Form.Select aria-label="model" value={detailedCarStock.modelName} name="modelName" onChange={e => onChange(e)}>
                <option>Odaberite model</option>
                {Object.values(models).map((model) => {
                    return (<option>{model.modelname}</option>)
                })}
            </Form.Select>
            <br />
            <Form.Text id="passwordHelpBlock" muted>
                Obavezan unos.
            </Form.Text>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Boja automobila</InputGroup.Text>
                <Form.Control
                    placeholder="Boja"
                    aria-label="stockColor"
                    name="stockColor"
                    aria-describedby="basic-addon1"
                    onChange={e => onChange(e)}
                    value={detailedCarStock.stockColor}
                />
            </InputGroup>
            <Form.Text id="passwordHelpBlock" muted>
                Obavezan unos.
            </Form.Text>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Naplatci</InputGroup.Text>
                <Form.Control
                    placeholder="Naplatci"
                    aria-label="stockRims"
                    name="stockRims"
                    aria-describedby="basic-addon1"
                    onChange={e => onChange(e)}
                    value={detailedCarStock.stockRims}
                />
            </InputGroup>
            <Form.Check
                type="checkbox"
                name="stockBought"
                label="Vozilo prodano"
                checked={detailedCarStock.stockBought}
                onChange={e => changeStatus(e)}
            />
            <div style={{
                margin: "auto",
                width: "40%"
            }}>
                <Button variant="success" onClick={() => setStockData()} className="me-2">Spremi promjene</Button>
                <Button variant="danger" onClick={() => deleteStock()}>Obriši</Button>
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
                            <td>{parseTime(testDrive.testdrivetime)}</td>
                            <td>{parseStatus(testDrive.testdriveconcluded)}</td>
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
            <Button href="/testdrive/new">Add new test drive</Button>
        </div>
    </>)
}

export default CarStock