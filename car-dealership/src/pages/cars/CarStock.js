import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

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
    const [users, setUsers] = useState([])
    const [alertTD, setAlertTD] = useState(null)

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
        try {
            const response = await fetch("http://localhost:8080/api/users",
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await response.json();
            setUsers(jsonData)

        } catch (e) {
            console.log(e)
        }
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
        if (window.confirm("Jeste li sigurni da želite izbrisati zalihu?")) {
            try {
                const response = await fetch("http://localhost:8080/api/carstocks/" + stockId,
                    {
                        method: "DELETE",
                        mode: "cors",
                        headers: {
                            "Content-type": "application/json"
                        }
                    });
                //let jsonData = await response.json();
                //console.log(jsonData)
                console.log("Deleted")
                navigate("/stock")

            } catch (e) {
                console.log(e)
            }
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

    const deleteTestDrive = async (testdriveid) => {
        if (window.confirm("Jeste li sigurni da želite izbrisati testnu vožnju: " + testdriveid)) {
            try {
                const response = await fetch("http://localhost:8080/api/testdrives/" + testdriveid,
                    {
                        method: "DELETE",
                        mode: "cors",
                        headers: {
                            "Content-type": "application/json"
                        }
                    });
                //let jsonData = await response.json();
                //console.log(jsonData)
                console.log("Deleted")
                getTestDriveData()

            } catch (e) {
                console.log(e)
            }
        }
    }

    const addNewTestDrive = async () => {
        let userId
        for (let user of users) {
            if (newTestDrive.username === user.username + " " + user.usersurname) {
                userId = user.userid
                break
            }
        }
        let body = {
            testdrivetime: newTestDrive.testdrivetime,
            testdriveconcluded: false,
            stockid: parseInt(stockId),
            userid: userId
        }
        try {
            const response = await fetch("http://localhost:8080/api/testdrives",
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                });
            let jsonData = await response.json();
            if (response.status === 400) {
                setAlertTD(true)
                console.log(jsonData)
            } else {
                console.log(jsonData)
                setAlert(false)
                handleClose()
                getTestDriveData()
            }

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
        getUserData()
    }, []);
    const onChange = e => {
        setDetailedCarStock({ ...detailedCarStock, [e.target.name]: e.target.value })
        console.log(detailedCarStock)
    }

    const parseStatus = (status) => {
        if (status) return "Obavljeno"
        else return "Ne obavljeno"
    }

    const parseUser = (userid) => {
        let userParsed
        users.forEach((user) => { if (user.userid === userid) userParsed = user.username + " " + user.usersurname })
        return userParsed
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [newTestDrive, setNewTestDrive] = useState({
        testdrivetime: null,
        testdriveconcluded: false,
        stockid: stockId,
        userid: null,
        username: null
    })
    const onChangeTestDrive = e => {
        setNewTestDrive({ ...newTestDrive, [e.target.name]: e.target.value })
        console.log(newTestDrive)
    }
    return (<>
        <br />
        <div style={{
            margin: "auto",
            width: "50%"
        }}>
            <h1>Uređivanje zalihe broj {detailedCarStock.stockID}</h1>
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
            <h2>Testne vožnje</h2>
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
                            <td>{users.length !== 0 ? parseUser(testDrive.userid) : ""}</td>
                            <td><Button variant="warning" href={"/testdrives/" + testDrive.testdriveid} className="me-2">Uredi</Button>
                                <Button variant="danger" onClick={() => deleteTestDrive(testDrive.testdriveid)}>Obriši</Button></td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodavanje nove testne vožnje</Modal.Title>
                    {alertTD ? <><Alert key="danger" variant="danger">
                        Potrebno je unijeti oba polja!
                    </Alert></> : <></>}
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="testdrivetime">
                        <Form.Label>Odaberite datum vožnje</Form.Label>
                        <Form.Control type="datetime-local" name="testdrivetime" placeholder="Datum vožnje"
                            value={newTestDrive.testdrivetime} onChange={e => onChangeTestDrive(e)} />
                    </Form.Group>
                    <br />
                    <Form.Text id="passwordHelpBlock" muted>
                        Potrebno je unijeti oba polja.
                    </Form.Text>
                    <Form.Select aria-label="model" name="username" onChange={e => onChangeTestDrive(e)}>
                        <option>Odaberite korisnika</option>
                        {Object.values(users).map((user) => {
                            return (<option>{user.username} {user.usersurname}</option>)
                        })}
                    </Form.Select>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Zatvori
                    </Button>
                    <Button variant="success" onClick={() => addNewTestDrive()}>
                        Spremi promjene
                    </Button>
                </Modal.Footer>
            </Modal>
            <Button onClick={handleShow}>Dodaj novu testnu vožnju</Button>
        </div>

    </>)
}

export default CarStock