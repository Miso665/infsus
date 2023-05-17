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
            const response = await fetch("http://localhost:5000/cars",
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
                    return (<></>)
                })}</> : <>{Object.values(search).map((car) => {
                    return (<></>)
                })}</>}
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Volkswagen Golf R-line</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Cijena €</Card.Subtitle>
                            <Card.Text>
                                Snaga motora: 150 HP
                            </Card.Text>
                            <Card.Text>
                                Maksimalna brzina: 210 KM/H
                            </Card.Text>
                            <Button variant="success">Card Link</Button>
                            <Button variant="primary">Card Link</Button>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </>
    )

}

export default CarsList