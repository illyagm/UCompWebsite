import React from 'react';
import { IProductSearch } from '../../models/productSearch/IProductSearch';
import { Card, Row, Col, Button } from 'react-bootstrap';

const Products = (props: any) => {

    const { searchResults } = props;
    const buyProduct = (productUrl: string) => {
        window.open(
            '' + productUrl,
            '_blank' // <- This is what makes it open in a new window.
        );
    }
    return (
        <div>
            {
                searchResults.map((product: IProductSearch, key: number) => {
                    if (product.productPrice !== '') {
                        return (
                            <div key={key} className="product">
                                <Card className="cardProduct">
                                    <Card.Body>
                                        <Row>
                                            <Col sm={10}>
                                                <Card.Text><b>{product.productName}</b></Card.Text>
                                                <Card.Text> {'Opiniones: ' + (product.numberOfRatings !== '' ? product.numberOfRatings : '0')}</Card.Text>
                                                <Card.Text>{'Precio: ' + (product.productPrice !== '' ? product.productPrice + '€' : 'No disponible (mirar en la web del proveedor)')}</Card.Text>
                                                <Button className="customButton" onClick={() => buyProduct('' + product.productUrl)}>Comprar</Button>
                                            </Col>
                                            <Col sm={2}>
                                                <Card.Img variant="top" src={'' + product.imageUrl} />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    }
                })
            }
        </div>
    )




}

export default Products;