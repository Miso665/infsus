import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

function AddCar() {
    const [car, setCar] = useState({
        modelname: null,
        modelhorsepower: null,
        modeltopspeed: null,
        modelaccelinseconds: null,
        modeltransmissiontype: null
    })

    let makers = ["Audi", "Porsche", "Bagatiti"]

    const addNewCar = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/models/",
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(car)
                });
            let jsonData = await response.json();
            console.log(jsonData);

        } catch (e) {
            console.log(e)
        }

    }
    const onChange = e => {
        setCar({ ...car, [e.target.name]: e.target.value })
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
                    {Object.values(makers).map((maker) => {
                        return (<Dropdown.Item href="#/action-1">{maker}</Dropdown.Item>)
                    })}
                </Dropdown.Menu>
            </Dropdown>
            <br />
            <Form.Select aria-label="maker" onChange={e => console.log(e.target.value)}>
                <option>Odaberite proizvođača</option>
                {Object.values(makers).map((maker) => {
                    return (<option>{maker}</option>)
                })}
            </Form.Select>
            <br />
            <InputGroup className="mb-3 w-50">
                <InputGroup.Text id="basic-addon1">Proizvođač</InputGroup.Text>
                <Form.Control
                    placeholder="Proizvođač"
                    aria-label="maker"
                    name="maker"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Model</InputGroup.Text>
                <Form.Control
                    placeholder="Model"
                    aria-label="modelname"
                    name="modelname"
                    aria-describedby="basic-addon1"
                    onChange={e => onChange(e)}
                    value={car.modelname}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Snaga u KS</InputGroup.Text>
                <Form.Control
                    placeholder="Proizvođač"
                    aria-label="modelhorsepower"
                    name="modelhorsepower"
                    aria-describedby="basic-addon1"
                    onChange={e => onChange(e)}
                    value={car.modelhorsepower}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Maksimalna brzina</InputGroup.Text>
                <Form.Control
                    placeholder="Maksimalna brzina"
                    aria-label="modeltopspeed"
                    name="modeltopspeed"
                    aria-describedby="basic-addon1"
                    onChange={e => onChange(e)}
                    value={car.modeltopspeed}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Ubrzanje do 100 KM/H</InputGroup.Text>
                <Form.Control
                    placeholder="Ubrzanje"
                    aria-label="modelaccelinseconds"
                    name="modelaccelinseconds"
                    aria-describedby="basic-addon1"
                    onChange={e => onChange(e)}
                    value={car.modelaccelinseconds}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Vrsta mijenjača</InputGroup.Text>
                <Form.Control
                    placeholder="Mijenjač"
                    aria-label="modeltransmissiontype"
                    name="modeltransmissiontype"
                    aria-describedby="basic-addon1"
                    onChange={e => onChange(e)}
                    value={car.modeltransmissiontype}
                />
            </InputGroup>

            <InputGroup>
                <InputGroup.Text>With textarea</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
            </InputGroup>
            <Button variant="primary" onClick={addNewCar()}>Dodaj automobil</Button>
        </div>
    </>)

}

export default AddCar