import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Amazon from '../../assets/amazon.png';
import Coinbase from '../../assets/coinbase.png';
import Aliexpress from '../../assets/aliexpress.png';
import Kraken from '../../assets/kraken.png';
import styled from 'styled-components';
const Style = styled.div`
    .images {
        margin-top: 30%;
        height: auto;
        width: 50%;
        -webkit-box-shadow: 10px 10px 5px -4px rgba(0,0,0,0.14);
        -moz-box-shadow: 10px 10px 5px -4px rgba(0,0,0,0.14);
        box-shadow: 10px 10px 5px -4px rgba(0,0,0,0.14);
    }
`;


const imageGroupComponent = () => {
    return (
        <Container>
            <Style> 
                <Row>
                    <Col sm xs={3}>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.kraken.com/">
                        <Image src={Kraken} rounded className="images" />
                        </a>
                    </Col>
                    <Col sm xs={3}>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.coinbase.com/">
                        <Image src={Coinbase} rounded className="images" />
                        </a>
                    </Col>
                    <Col sm xs={3}>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.es/">
                        <Image src={Amazon} rounded className="images" />
                        </a>
                    </Col>
                    <Col sm xs={3}>
                        <a target="_blank" rel="noopener noreferrer" href="https://es.aliexpress.com/">
                        <Image src={Aliexpress} rounded className="images" />
                        </a>
                    </Col>
                </Row>
            </Style>
        </Container>
    )
}

export default imageGroupComponent;