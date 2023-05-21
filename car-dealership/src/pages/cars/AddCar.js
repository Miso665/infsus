import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function AddCar() {
    let navigate = useNavigate()
    const [car, setCar] = useState({
        modelname: null,
        modelhorsepower: null,
        modeltopspeed: null,
        modelaccelinseconds: null,
        modeltransmissiontype: null,
        brandid: null
    })
    let [brands, setBrands] = useState([])
    const [invalidInputs, setInvalidInputs] = useState(null)

    const getBrandData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/brands",
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await response.json();
            setBrands(jsonData)

        } catch (e) {
            console.log(e)
        }
    }

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
            if (response.status === 400) {
                setInvalidInputs(jsonData.invalidFields)
            } else {
                navigate("/cars/" + jsonData.modelid)
            }

        } catch (e) {
            console.log(e)
        }

    }
    const onChange = e => {
        setCar({ ...car, [e.target.name]: e.target.value })
    };

    useEffect(() => {
        getBrandData()
    }, []);

    const setBrandId = (name) => {
        brands.forEach((brand) => { if (brand.brandname === name) return setCar({ ...car, brandid: brand.brandid }) })
    }

    return (<>
        <br />
        <div style={{
            margin: "auto",
            width: "50%"
        }}>
            <h1>Dodavanje novog modela</h1>
            {invalidInputs ? <><Alert key="danger" variant="danger">
                Neavljani unosi: {invalidInputs.join(", ")}
            </Alert></> : <></>}
            <br />
            <Form.Text id="passwordHelpBlock" muted>
                Obavezan odabrati.
            </Form.Text>
            <Form.Select aria-label="brand" name="brandname" onChange={e => setBrandId(e.target.value)}>
                <option>Odaberite proizvođača</option>
                {Object.values(brands).map((brand) => {
                    return (<option>{brand.brandname}</option>)
                })}
            </Form.Select>
            <br />
            <Form.Text id="passwordHelpBlock" muted>
                Obavezan unos.
            </Form.Text>
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
            <Form.Text id="passwordHelpBlock" muted>
                Obavezan unos. Mora biti broj veći od 0.
            </Form.Text>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Snaga u KS</InputGroup.Text>
                <Form.Control
                    placeholder="Snaga"
                    aria-label="modelhorsepower"
                    name="modelhorsepower"
                    aria-describedby="basic-addon1"
                    onChange={e => onChange(e)}
                    value={car.modelhorsepower}
                />
            </InputGroup>
            <Form.Text id="passwordHelpBlock" muted>
                Obavezan unos. Mora biti broj veći od 0.
            </Form.Text>
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
            <Form.Text id="passwordHelpBlock" muted>
                Obavezan unos. Mora biti broj veći od 0.
            </Form.Text>
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
            <Form.Text id="passwordHelpBlock" muted>
                Obavezan unos. Mora biti "automatic" ili "manual"
            </Form.Text>
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
            <Button variant="primary" onClick={() => addNewCar()}>Dodaj model</Button>
        </div>
    </>)

}

export default AddCar