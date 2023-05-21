import React, { Fragment, useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MDBCol, MDBIcon } from "mdbreact";

function StockList() {
    const [stock, setStock] = useState([])
    const [search, setSearch] = useState("")

    const getStock = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/carstocks/deepaccess",
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

    const deleteStock = async (stockId) => {
        if (window.confirm("Jeste li sigurni da želite izbrisati zalihu: " + stockId)) {
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
                getStock()

            } catch (e) {
                console.log(e)
            }
        }
    }

    const searchStock = (inputString) => {
        setSearch(stock.filter((st) => st.model.modelName.toLowerCase().includes(inputString)))
        console.log(inputString)
    }

    useEffect(() => {
        getStock();
    }, []);

    const parseStatus = (status) => {
        if (status) return "Nedostupno"
        else return "Dostupno"
    }

    return (
        <>
            <MDBCol style={{
                margin: "auto",
                width: "50%"
            }}>
                <h2>Zaliha</h2>
                <form className="form-inline mt-4 mb-4" >
                    <MDBIcon icon="search" />
                    <input className="form-control form-control-sm ml-3 w-99" type="text" placeholder="Pretraga po modelu" aria-label="Search" onChange={e => searchStock(e.target.value)} />
                </form>

            </MDBCol>
            <Row xs={1} md={5} className="g-4">
                {!search ? <>{Object.values(stock).map((st) => {
                    return (<>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{st.model.modelName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{st.stockPrice} €</Card.Subtitle>
                                    <Card.Text>
                                        Boja: {st.stockColor}
                                    </Card.Text>
                                    <Card.Text>
                                        Naplatci: {st.stockRims}
                                    </Card.Text>
                                    <Card.Text>
                                        Status: {parseStatus(st.stockBought)}
                                    </Card.Text>
                                    <Button variant="warning" className="me-2" href={"/stock/" + st.stockID}>Uredi</Button>
                                    <Button variant="danger" onClick={() => deleteStock(st.stockID)}>Obriši</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </>)
                })}</> : <>{Object.values(search).map((st) => {
                    return (<>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{st.model.modelName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{st.stockPrice} €</Card.Subtitle>
                                    <Card.Text>
                                        Boja: {st.stockColor}
                                    </Card.Text>
                                    <Card.Text>
                                        Naplatci: {st.stockRims}
                                    </Card.Text>
                                    <Card.Text>
                                        Status: {parseStatus(st.stockBought)}
                                    </Card.Text>
                                    <Button variant="warning" className="me-2" href={"/stock/" + st.stockID}>Uredi</Button>
                                    <Button variant="danger" onClick={() => deleteStock(st.stockID)}>Obriši</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </>)
                })}</>}
                <div style={{
                    width: "20%",
                    height: "20%"
                }}>
                    <Button href="/stock/new">Dodaj novo</Button>
                </div>
            </Row>

        </>
    )

}

export default StockList