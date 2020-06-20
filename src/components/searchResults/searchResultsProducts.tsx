import React, { useState } from 'react';
import { IProductSearch } from '../../models/productSearch/IProductSearch';
import { Card, Row, Col, Button, Spinner, Form } from 'react-bootstrap';

const Products = (props: any) => {

    const [loading, setLoading] = useState(true);
    const { searchResults } = props;

    const buyProduct = (productUrl: string) => {
        window.open(
            '' + productUrl,
            '_blank' // <- This is what makes it open in a new window.
        );
    }

    if (!loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
    } else {
        return (
            <div>
                {
                    searchResults.map((product: IProductSearch, key: number) => {
                        return (
                            <div key={key} className="product">
                                <Card className="cardProduct">
                                    <Card.Body>
                                        <Row>
                                            <Col sm={6}>
                                                <Card.Text><b>{product.productName}</b></Card.Text>
                                                <Card.Text> {'Opiniones: ' + (product.numberOfRatings!=='' ? product.numberOfRatings : '0')}</Card.Text>
                                                <Card.Text>{'Precio: ' +(product.productPrice!=='' ? product.productPrice+'€' : 'No disponible (mirar en la web del proveedor)')}</Card.Text>
                                                <Button className="customButton" onClick={() => buyProduct('' + product.productUrl)}>Comprar</Button>
                                            </Col>
                                            <Col sm>
                                                <Card.Img variant="top" src={'' + product.imageUrl} />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        )
    }



}

export default Products;