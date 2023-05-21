import React, { Fragment, useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MDBCol, MDBIcon } from "mdbreact";

function CarsList() {

    const [cars, setCars] = useState([])
    const [search, setSearch] = useState("")

    const getCars = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/models/deepaccess",
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await response.json();
            console.log(jsonData);
            setCars(jsonData)

        } catch (e) {
            console.log(e)
        }
    }

    const searchCars = (inputString) => {
        setSearch(cars.filter((car) => car.modelName.toLowerCase().includes(inputString)))
    }

    const deleteCar = async (carId) => {
        if (window.confirm("Jeste li sigurni da želite izbrisati korisnika: " + carId)) {
            try {
                const response = await fetch("http://localhost:8080/api/models/" + carId,
                    {
                        method: "DELETE",
                        mode: "cors",
                        headers: {
                            "Content-type": "application/json"
                        }
                    });
                let jsonData = await response.json();
                getCars()
            } catch (e) {
                console.log(e)
            }
        }
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
                <h2>Modeli</h2>
                <form className="form-inline mt-4 mb-4" >
                    <MDBIcon icon="search" />
                    <input className="form-control form-control-sm ml-3 w-99" type="text" placeholder="Pretraga po imenu" aria-label="Search" onChange={e => searchCars(e.target.value)} />
                </form>
            </MDBCol>
            <Row xs={1} md={5} className="g-4">
                {!search ? <>{Object.values(cars).map((car) => {
                    return (<>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{car.modelName}</Card.Title>
                                    <Card.Subtitle>{car.brand.brandName}</Card.Subtitle>
                                    <Card.Text>
                                        Snaga: {car.modelHorsepower} HP
                                    </Card.Text>
                                    <Card.Text>
                                        Maksimalna brzina: {car.modelTopSpeed} KM/H
                                    </Card.Text>
                                    <Card.Text>
                                        Vrsta mijenača: {car.modelTransmissionType}
                                    </Card.Text>
                                    <Button variant="warning" className="me-2" href={"/cars/" + car.modelID}>Uredi</Button>
                                    <Button variant="danger" onClick={() => deleteCar(car.modelID)}>Obriši</Button>
                                </Card.Body>
                            </Card>
                        </Col></>)
                })}</> : <>{Object.values(search).map((car) => {
                    return (<>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{car.modelName}</Card.Title>
                                    <Card.Subtitle>{car.brand.brandName}</Card.Subtitle>
                                    <Card.Text>
                                        Snaga: {car.modelHorsepower} HP
                                    </Card.Text>
                                    <Card.Text>
                                        Maksimalna brzina: {car.modelTopSpeed} KM/H
                                    </Card.Text>
                                    <Card.Text>
                                        Vrsta mijenača: {car.modelTransmissionType}
                                    </Card.Text>
                                    <Button variant="warning" className="me-2" href={"/cars/" + car.modelID}>Uredi</Button>
                                    <Button variant="danger" onClick={() => deleteCar(car.modelID)}>Obriši</Button>
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