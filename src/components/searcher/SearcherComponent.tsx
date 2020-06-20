import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup, Button, Row, Col, Form } from 'react-bootstrap';
import { IoIosSearch } from "react-icons/io";
import styled from 'styled-components';
//import Background from '../../assets/_MG_8977-2.jpg';
//import Background from '../../assets/_MG_0785.jpg';
//import Background from '../../assets/_MG_9235.jpg';
import Background from '../../assets/_MG_9475.jpg';
//import Background from '../../assets/sd.jpg';
import NavComponent from '../navbar/NavComponent';
import Footer from '../footer/footerJumbo';
import CategoryService from '../../services/categoryService/CategoryService';
import { ICategory } from '../../models/category/ICategory';

const Style = styled.div`
    .background{
        color: black;
        height: 100vh;
        background-image:
        linear-gradient(
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.1)
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
            width: 60%;
            height: 60%;
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
    const categoryService = new CategoryService();
    const { getCategories } = categoryService;
    const [categories, setCategories] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('electronica');

    const searchProduct = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        var keyWords = datos.busqueda;
        var removedSpaces = keyWords.replace(/\s/g, '%20');
        window.open(
            '/compareProduct?searchKeywords=' + removedSpaces + '&category=' + categoriaSeleccionada,
            '_blank'
        );
    }
    const [datos, setDatos] = useState({
        busqueda: ''
    });

    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    };
    const handleSelectChange = (event:any) => {
        var categorySelected = event.target.value;
        setCategoriaSeleccionada(categorySelected);
        console.log(categorySelected);
    }
    useEffect(() => {
        const getCat = () => {
            getCategories().then((response) => {
                setCategories(response.data);
            })
        };
        getCat();
    //eslint-disable-next-line
    }, [])
    return (
        <Style>
            <div className="background">
                <NavComponent />
                <div className="searcher">
                    <h2 className="title"><b>U-Search</b></h2>
                    <Row>
                        <Col sm>
                            <Form onSubmit={searchProduct}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        as="select"
                                        className="mr-sm"
                                        id="inlineFormCustomSelect"
                                        onChange={handleSelectChange}
                                        custom
                                    >
                                    {categories.map((category: ICategory, key: number) => {
                                        return(
                                            <option key={''+category.name} value={''+category.name}>{category.name}</option>
                                        )
                                    })}
                                    </Form.Control>
                                    <FormControl
                                        name="busqueda"
                                        placeholder="Nombre de producto..."
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup.Append>
                                        <Button variant="success" type="submit"><IoIosSearch /></Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Row>
                    <Footer />
                </div>
            </div>
        </Style>
    )
}


export default SearcherComponent;