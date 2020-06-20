import React, { useState } from 'react';
import { Accordion, Card, Form, Nav, ListGroup, Button } from 'react-bootstrap';
import { IPlatform } from '../../models/platform/IPlatform';

const SideNav = (props: any) => {
    const { platforms, handleSearch, insertQueryToUrl, categoria, keywords, comparePriceDesc, comparePriceAsc, getProductsFromSearch, platformUrl, platformSearchId, setSearchResults} = props;
    const [isActive, setIsActive] = useState(null);
    
    const orderDesc = () => {
        const searchURL = insertQueryToUrl(platformUrl, keywords);
        const getProductsSearch = () => {
            getProductsFromSearch(searchURL, platformSearchId).then((response: { data: any; }) => {
                setSearchResults(response.data.sort(comparePriceDesc));
            });
        }
        getProductsSearch();
    }
    const orderAsc = () => {
        const searchURL = insertQueryToUrl(platformUrl, keywords);
        const getProductsSearch = () => {
            getProductsFromSearch(searchURL, platformSearchId).then((response: { data: any; }) => {
                setSearchResults(response.data.sort(comparePriceAsc));
            });
        }
        getProductsSearch();
    }
    return (
        <div className="customMarginTop">
            <Accordion defaultActiveKey="0" className="platformsAccordion">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Plataformas
                </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">

                        <ListGroup as="ul" defaultChecked="Amazon">
                        <Form>
                            {
                                platforms.map((platform: IPlatform, key: number) => {
                                    return (
                                        platform.category.map((categoryName: any) => {
                                            if (categoryName === categoria) {
                                                return (
                                                    <ListGroup.Item as="li">
                                                        <Form.Check
                                                            className="checkMark"
                                                            key={key}
                                                            onClick={() => handleSearch(insertQueryToUrl(platform.url, keywords), platform.id)}
                                                            type="radio"
                                                            label={platform.name}
                                                            name="formHorizontalRadios"
                                                            id="formHorizontalRadios1"
                                                            defaultChecked={!key}
                                                        />
                                                    </ListGroup.Item>
                                                )
                                            }
                                        })
                                    )
                                })
                            }
                        </Form>
                        </ListGroup>

                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <br />
            <Accordion className="filtersAccordion">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Ordenar por: (click aquí)
                </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <ListGroup as="ul">
                        <Form>
                            <ListGroup.Item as="li">
                                <Button variant="outline-secondary" className="customButton" onClick={() => orderAsc()}>
                                        Precio - Menor a mayor 
                                </Button>
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                            <Button variant="outline-secondary" className="customButton" onClick={() => orderDesc()}>
                                        Precio - Mayor a menor
                                </Button>
                            </ListGroup.Item>
                        </Form>
                        </ListGroup>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}


export default SideNav;