import React, { Fragment, useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { CardGroup } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MDBCol, MDBIcon } from "mdbreact";

function StockList() {
    const [stock, setStock] = useState([])
    const [search, setSearch] = useState("")

    const getStock = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/carstocks",
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await response.json();
            //console.log(jsonData);
            console.log(jsonData)
            setStock(jsonData)

        } catch (e) {
            console.log(e)
        }
    }

    const searchStock = (inputString) => {
        setSearch(stock.filter((st) => st.stockcolor.toLowerCase().includes(inputString)))
    }

    useEffect(() => {
        getStock();
    }, []);

    return (
        <>
            <MDBCol style={{
                margin: "auto",
                width: "50%"
            }}>
                <form className="form-inline mt-4 mb-4" >
                    <MDBIcon icon="search" />
                    <input className="form-control form-control-sm ml-3 w-99" type="text" placeholder="Search" aria-label="Search" onChange={e => searchStock(e)} />
                </form>
            </MDBCol>
            <Row xs={1} md={5} className="g-4">
                {!search ? <>{Object.values(stock).map((st) => {
                    return (<>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{st.modelid}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{st.stockprice} €</Card.Subtitle>
                                    <Card.Text>
                                        Naplatci: {st.stockrims}
                                    </Card.Text>
                                    <Card.Text>
                                        Status: {st.stockbought}
                                    </Card.Text>
                                    <Button variant="success">Card Link</Button>
                                    <Button variant="primary">Card Link</Button>
                                    <Card.Link href="#">Another Link</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </>)
                })}</> : <>{Object.values(search).map((st) => {
                    return (<></>)
                })}</>}
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Volkswagen Golf R-line</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Cijena €</Card.Subtitle>
                            <Card.Text>
                                Naplatci: VOLK TE37
                            </Card.Text>
                            <Card.Text>
                                Status: Dostupno
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

export default StockList