import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';

function AddStock() {
    const navigate = useNavigate()
    const [carStock, setCarStock] = useState({
        stockcolor: null,
        stockrims: null,
        stockprice: null,
        stockbought: false,
        modelid: null
    })
    const [models, setModels] = useState([])
    const [invalidInputs, setInvalidInputs] = useState(null)

    //let models = ["Civic Type R", "Taycan", "Focus Titanium"]

    const addNewStock = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/carstocks",
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(carStock)
                });
            if (response.status === 400) {
                let jsonData = await response.json();
                console.log(jsonData)
                //jsonData.invalidFields.forEach((field) => {})
                setInvalidInputs(jsonData.invalidFields)
            } else if (response.status === 200) {
                let jsonData = await response.json();
                console.log(jsonData);
                navigate("/stock/" + jsonData.stockid)
            }

        } catch (e) {
            console.log(e)
        }

    }

    const getModels = async () => {
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
            console.log(jsonData);
            setModels(jsonData)


        } catch (e) {
            console.log(e)
        }
    }

    const onChange = e => {
        setCarStock({ ...carStock, [e.target.name]: e.target.value })
    };

    const setModelId = (name) => {
        models.forEach((model) => { if (model.modelname === name) return setCarStock({ ...carStock, modelid: model.modelid }) })
    }

    useEffect(() => {
        getModels();
    }, []);

    return (<>
        <br />
        <div style={{
            margin: "auto",
            width: "50%"
        }}>
            <h1>Dodavanje nove zalihe</h1>
            {invalidInputs ? <><Alert key="danger" variant="danger">
                Neavljani unosi: {invalidInputs.join(", ")}
            </Alert></> : <></>}

            <br />
            <Form.Text id="passwordHelpBlock" muted>
                Obavezno odabrati.
            </Form.Text>
            <Form.Select aria-label="model" onChange={e => setModelId(e.target.value)}>
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
                    aria-label="stockcolor"
                    name="stockcolor"
                    aria-describedby="basic-addon1"
                    onChange={e => onChange(e)}
                    value={carStock.stockcolor}
                />

            </InputGroup>
            <Form.Text id="passwordHelpBlock" muted>
                Obavezan unos.
            </Form.Text>
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
            <Form.Text id="passwordHelpBlock" muted>
                Obavezan unos. Mora biti broj veći od 0.
            </Form.Text>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Cijena u €</InputGroup.Text>
                <Form.Control
                    placeholder="Cijena"
                    aria-label="stockprice"
                    name="stockprice"
                    aria-describedby="basic-addon1"
                    onChange={e => onChange(e)}
                    value={carStock.stockprice}
                />

            </InputGroup>


            <Button variant="primary" onClick={e => addNewStock()}>Dodaj novu zalihu</Button>
        </div>
    </>)

}

export default AddStock