import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup, Button, Row, Col, Form } from 'react-bootstrap';
import { IoIosSearch } from "react-icons/io";
import styled from 'styled-components';
//import Background from '../../assets/_MG_8977-2.jpg';
//import Background from '../../assets/_MG_0785.jpg';
//import Background from '../../assets/_MG_9235.jpg';
//import Background from '../../assets/_MG_9475.jpg';
import Background from '../../assets/sd.jpg';
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

    //ON init
    //gets all the categories and sets the state 'categories' (for mapping the select input)
    useEffect(() => {
        const getCat = () => {
            getCategories().then((response) => {
                setCategories(response.data);
            })
        };
        getCat();
    //eslint-disable-next-line
    }, [])

    //service for getting the categories
    const categoryService = new CategoryService();
    const { getCategories } = categoryService;

    //states of categories and selected category
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('electronica');

    //states of the input search form
    const [dataInput, setDataInput] = useState({
        search: ''
    });

    //method that replaces 'QUERY' word from (url obtained from DB) by the keyword obtained from the input form. Opens new window with the children component, 
    //passing params 'keyword' and 'category'inside the url
    const searchProduct = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        var keyWords = dataInput.search;
        var removedSpaces = keyWords.replace(/\s/g, '%20');
        window.open(
            '/compareProduct?searchKeywords=' + removedSpaces + '&category=' + selectedCategory,
            '_blank'
        );
    }

    //method for handling the input
    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        setDataInput({
            ...dataInput,
            [event.target.name]: event.target.value
        })
    };
    //method for handling the select category
    const handleSelectChange = (event:any) => {
        var categorySelected = event.target.value;
        setSelectedCategory(categorySelected);
        console.log(categorySelected);
    }
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
                                        name="search"
                                        placeholder="Nombre de producto..."
                                        aria-label="Search Input"
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