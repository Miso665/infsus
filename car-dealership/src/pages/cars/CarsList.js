import React, { Fragment, useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { CardGroup } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MDBCol, MDBIcon } from "mdbreact";

function CarsList() {

    const [cars, setCars] = useState([])
    const [search, setSearch] = useState("")

    const getCars = async () => {
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
            //console.log(jsonData);
            setCars(jsonData)

        } catch (e) {
            console.log(e)
        }
    }

    const searchCars = (inputString) => {
        setSearch(cars.filter((car) => car.name.toLowerCase().includes(inputString)))
    }

    const deleteCar = async (carId) => {

    }

    useEffect(() => {
        getCars();
    }, []);

    return (
        <>
            <MDBCol style={{
                margin: "auto",
                width: "50%"
            }}>
                <form className="form-inline mt-4 mb-4" >
                    <MDBIcon icon="search" />
                    <input className="form-control form-control-sm ml-3 w-99" type="text" placeholder="Search" aria-label="Search" onChange={e => searchCars(e)} />
                </form>
            </MDBCol>
            <Row xs={1} md={5} className="g-4">
                {!search ? <>{Object.values(cars).map((car) => {
                    return (<>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{car.modelname}</Card.Title>
                                    <Card.Text>
                                        Snaga: {car.modelhorsepower} HP
                                    </Card.Text>
                                    <Card.Text>
                                        Maksimalna brzina: {car.modeltopspeed} KM/H
                                    </Card.Text>
                                    <Card.Text>
                                        Vrsta mijenača: {car.modeltransmissiontype}
                                    </Card.Text>
                                    <Button variant="warning" className="me-2" href={"/car/" + car.modelid}>Uredi</Button>
                                    <Button variant="danger" onClick={() => deleteCar(car.modelid)}>Obriši</Button>
                                </Card.Body>
                            </Card>
                        </Col></>)
                })}</> : <>{Object.values(search).map((car) => {
                    return (<>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{car.modelid}</Card.Title>
                                    <Card.Text>
                                        Snaga: {car.modelhorsepower} HP
                                    </Card.Text>
                                    <Card.Text>
                                        Maksimalna brzina: {car.modeltopspeed} KM/H
                                    </Card.Text>
                                    <Card.Text>
                                        Vrsta mijenača: {car.modeltransmissiontype}
                                    </Card.Text>
                                    <Button variant="warning" className="me-2" href={"/car/" + car.modelid}>Uredi</Button>
                                    <Button variant="danger" onClick={() => deleteCar(car.modelid)}>Obriši</Button>
                                </Card.Body>
                            </Card>
                        </Col></>)
                })}</>}
                <div style={{
                    width: "20%",
                    height: "20%"
                }}>
                    <Button href="/cars/new">Dodaj novi</Button>
                </div>
            </Row>
        </>
    )

}

export default CarsList