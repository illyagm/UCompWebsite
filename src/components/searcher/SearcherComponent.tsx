import React from 'react';
import { FormControl, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { IoIosSearch } from "react-icons/io";
import styled from 'styled-components';
import Background from '../../assets/_MG_8977-2.jpg';
import NavComponent from '../navbar/NavComponent';
import Footer from '../footer/footerJumbo';

const Style = styled.div`
    .background{
        color: black;
        height: 100vh;
        background-image:
        linear-gradient(
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0.4)
            ), url(${Background});
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
        opacity: 1;
    }
    .searcher{
        text-align: center;
        width: 30%;
        height: 30%;
        margin: auto;
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
        @media (max-width: 768px) {
            text-align: center;
            width: 40%;
            height: 40%;
            margin: auto;
            position: absolute;
            top: 0; left: 0; bottom: 0; right: 0;
        }
    }
    .title{
        margin-bottom: 50px;
        font-size: 2vw;
        color: white;
        @media (max-width: 768px) {
            font-size: 5vw;
        }
    }
`;  

const SearcherComponent = () => {
    return (
        <Style>
                <div className="background">
                <NavComponent />
                <div className="searcher">
                    <h2 className="title"><b>U-Search</b></h2>
                    <Row>
                    <Col sm>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search a Product..."
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="success"><IoIosSearch /></Button>
                        </InputGroup.Append>
                    </InputGroup>
                    </Col>
                    </Row>
                    <Footer/>
                </div>
                </div>
        </Style>
    )
}


export default SearcherComponent;