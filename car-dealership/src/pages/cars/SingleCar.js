import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from "react-bootstrap/Table";

function SingleCar() {
    let navigate = useNavigate()
    const carId = useParams().carId;
    const [car, setCar] = useState({
        modelid: null,
        modelname: "Širon",
        modelhorsepower: 1000,
        modeltopspeed: 420,
        modelaccelinseconds: 2.3,
        modeltransmissiontype: "Automatski 7-stupnjevski"
    })
    const [stock, setStock] = useState([])

    let makers = ["Audi", "Porsche", "Bagatiti"]

    const getCarData = async () => {
        try {
            const response = await fetch("http://localhost:5000/car/" + carId,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await response.json();
            //console.log(jsonData);
            setCar(jsonData)

        } catch (e) {
            console.log(e)
        }
    }

    const getCarStock = async () => {
        try {
            const response = await fetch("http://localhost:5000/car/stock/" + carId,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await response.json();
            setStock(jsonData)
        } catch (e) {
            console.log(e)
        }
    }

    const setCarData = async () => {
        try {
            const response = await fetch("http://localhost:5000/car/edit/" + carId,
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

    const deleteCar = async () => {
        try {
            const response = await fetch("http://localhost:5000/car/delete/" + carId,
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
    const onChange = e => {
        setCar({ ...car, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        getCarData();
        getCarStock();
    }, []);

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
            <div style={{
                margin: "auto",
                width: "40%"
            }}>
                <Button variant="success" onClick={setCarData()} className="me-2">Spremi promjene</Button>
                <Button variant="danger" onClick={deleteCar()}>Obriši</Button>
            </div>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Boja</th>
                        <th>Naplatci</th>
                        <th>Cijena €</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(stock).map((st) => {
                        return (<tr>
                            <td>{st.stockColor}</td>
                            <td>{st.stockRims}</td>
                            <td>{st.stockPrice}</td>
                            <td>{st.stockBought}</td>
                            <td><Button variant="warning" href={"/stock/" + st.stockID}>Uredi</Button>
                                <Button variant="danger">Obriši</Button></td>
                        </tr>)
                    })}
                    <tr>
                        <td>Crvena</td>
                        <td>VOLK TE37 19in</td>
                        <td>30000</td>
                        <td>Prodano</td>
                        <td><Button variant="warning" className="me-2">Uredi</Button>
                            <Button variant="danger">Obriši</Button></td>

                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td><Button variant="warning" className="me-2">Uredi</Button>
                            <Button variant="danger">Obriši</Button></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                        <td><Button variant="warning" className="me-2">Uredi</Button>
                            <Button variant="danger">Obriši</Button></td>
                    </tr>
                </tbody>
            </Table>

        </div>
    </>)

}

export default SingleCar