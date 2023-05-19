import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

function AddStock() {
    const [carStock, setCarStock] = useState({
        stockcolor: null,
        stockrims: null,
        stockprice: null,
        stockbought: null,
        modelid: null
    })
    const [models, setModels] = useState([])

    //let models = ["Civic Type R", "Taycan", "Focus Titanium"]

    const addNewStock = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/carstock",
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(carStock)
                });
            let jsonData = await response.json();
            console.log(jsonData);

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

    return (<>
        <br />
        <div style={{
            margin: "auto",
            width: "50%"
        }}>
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {Object.values(models).map((maker) => {
                        return (<Dropdown.Item href="#/action-1">{maker}</Dropdown.Item>)
                    })}
                </Dropdown.Menu>
            </Dropdown>
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
            <Button variant="primary" onClick={addNewStock()}>Dodaj novu zalihu</Button>
        </div>
    </>)

}

export default AddStock