import React, { useEffect, useState } from 'react';
import { Container, Nav, Row, Col, Form } from 'react-bootstrap';
import BackNav from '../navbar/BackNav';
import styled from 'styled-components';
import { IPlatform } from '../../models/platform/IPlatform';
import PlatformService from '../../services/PlatformService';
import ProductSearchService from '../../services/productSearchService/ProductSearchService';
import Products from './searchResultsProducts';
import SideNav from './sideNav';
const Style = styled.div`
    
    .searchResults{
        margin-top: 0vw;
    }
    .cardProduct{
        background-color: rgba(0, 0, 0, 0.02);
        -webkit-box-shadow: 7px 10px 15px -8px rgba(60,1,84,1);
        -moz-box-shadow: 7px 10px 15px -8px rgba(60,1,84,1);
        box-shadow: 7px 10px 15px -8px rgba(60,1,84,1);
    }

    img {
        width: 20%;
        height: auto;
        float: right;
    }
    .product {
        margin-top: 2.5vw;
    }
    .link{
        color:black;
    }
    .navResults{
        border-color: black;
        background-color: rgba(0, 0, 0, 0.02);
    }
    .general{
        color: black;
        height: auto;
        width: auto;
        background: white;
    }
    .customButton {
        background-color: #78009f;
        color: white;
        border: none;
    }
    .customMarginTop{
        margin-top: 2.5vw;
    }
    .platformsAccordion {
        -webkit-box-shadow: 0px 6px 5px -2px rgba(0,0,0,0.33);
        -moz-box-shadow: 0px 6px 5px -2px rgba(0,0,0,0.33);
        box-shadow: 0px 6px 5px -2px rgba(0,0,0,0.33);
    }
    .filtersAccordion {
        -webkit-box-shadow: 0px 6px 5px -2px rgba(0,0,0,0.33);
        -moz-box-shadow: 0px 6px 5px -2px rgba(0,0,0,0.33);
        box-shadow: 0px 6px 5px -2px rgba(0,0,0,0.33);
    }
    .checkMark{
        font-type: bold;
    }
`;

const SearchResults = (props: any) => {



    //Platforms methods
    const platformService = new PlatformService();
    const searchService = new ProductSearchService();
    const { getPlatformsByCategory } = platformService;
    const { getProductsFromSearch } = searchService;

    const [platforms, setPlatforms] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    //parametros url metidos en el estado
    const querySearch = props.location.search;
    const urlParams = new URLSearchParams(querySearch);
    const [categoria, setCategoria] = useState(urlParams.get('category'));
    const [keywords, setKeywords] = useState(urlParams.get('searchKeywords'));
    //estado inicial de plataforma de busqueda 
    const [platformSearchId, setPlatformSearchId] = useState('_w5itz82oz');
    const [platformUrl, setPlatformUrl] = useState('https://www.amazon.es/s?k=QUERY&__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&ref=nb_sb_noss_1');

    const [loading, setLoading] = useState('true');

    //Order Alphabetically
    const compare = (a: any, b: any) => {
        const platformA = a.name.toUpperCase();
        const platformB = b.name.toUpperCase();

        let comparison = 0;
        if (platformA > platformB) {
            comparison = 1;
        } else if (platformA < platformB) {
            comparison = -1;
        }
        return comparison;
    };
    //Order price asc
    const comparePriceAsc = (a: any, b: any) => {
        const productA = parseInt(a.productPrice);
        const productB = parseInt(b.productPrice);
        return productA - productB;
    }; 
    //Order price desc
    const comparePriceDesc = (a: any, b: any) => {
        const productA = parseInt(a.productPrice);
        const productB = parseInt(b.productPrice);
        return productB - productA;
    };   

    const truncate = (str: any) => {
        return str.length > 10 ? str.substring(0, 15) + "..." : str;
    }
    //method that replaces 'QUERY' word from url to an actual keyword obtained from url 
    const insertQueryToUrl = (url: any, keyword: any) => {
        var urlDb = url;
        var replacedString = urlDb.replace("QUERY", keyword);
        return replacedString;
    }


    const handleSearch = (platformUrlSearch: String, platformId: String) => {
        setPlatformSearchId('' + platformId);
        setPlatformUrl('' + platformUrlSearch);
        //console.log(platformUrlSearch);
        //setProductsSearchId(''+id);
    }

    //Init component
    useEffect(() => {
        console.log(loading);
        //first process !!!
        //getting platforms by category passing category keyword form urlParams('url)
        //setting search keyword and categories to the state
        const getPlatforms = () => {
            getPlatformsByCategory('' + categoria).then(response => {
                setPlatforms(response.data.sort(compare));
            });
        };
        getPlatforms();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const searchURL = insertQueryToUrl(platformUrl, keywords);
        const getProductsSearch = () => {
            getProductsFromSearch(searchURL, platformSearchId).then(response => {
                setSearchResults(response.data);
            });
        }
        getProductsSearch();
    }, [platformSearchId]);


    console.log(loading);
    return (
        <div>
            <BackNav />
            <Container fluid>
                <Style>
                    <div className="general">
                        <Row>
                            <Col sm={2}>
                                <SideNav 
                                platforms={platforms} 
                                handleSearch={handleSearch} 
                                insertQueryToUrl={insertQueryToUrl} 
                                categoria={categoria} 
                                keywords={keywords} 
                                comparePriceAsc={comparePriceAsc} 
                                comparePriceDesc={comparePriceDesc}
                                getProductsFromSearch={getProductsFromSearch}
                                platformUrl={platformUrl}
                                platformSearchId={platformSearchId}
                                setSearchResults={setSearchResults}
                                />
                            </Col>
                            <Col sm>
                                <Products searchResults={searchResults} />
                            </Col>
                        </Row>
                    </div>
                </Style>
            </Container>
        </div>
    )
}

export default SearchResults;
