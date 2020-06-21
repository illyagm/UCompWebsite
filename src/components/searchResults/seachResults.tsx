import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BackNav from '../navbar/BackNav';
import styled from 'styled-components';
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
        -webkit-box-shadow: 0px 0px 5px 4px rgba(0,0,0,0.11);
        -moz-box-shadow: 0px 0px 5px 4px rgba(0,0,0,0.11);
        box-shadow: 0px 0px 5px 4px rgba(0,0,0,0.11);
    }

    img {
        width: 100%;
        height: auto;
        float: right;
        -webkit-box-shadow: 0px -1px 5px 4px rgba(0,0,0,0.32);
        -moz-box-shadow: 0px -1px 5px 4px rgba(0,0,0,0.32);
        box-shadow: 0px -1px 5px 4px rgba(0,0,0,0.32);
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

    //Platforms service 
    const platformService = new PlatformService();
    const { getPlatformsByCategory } = platformService;

    //Search service
    const searchService = new ProductSearchService();
    const { getProductsFromSearch } = searchService;

    //Platforms state
    const [platforms, setPlatforms] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    //URL params obtained from SearcherComponent set to state
    const querySearch = props.location.search;
    const urlParams = new URLSearchParams(querySearch);
    const [category] = useState(urlParams.get('category'));
    const [keywords] = useState(urlParams.get('searchKeywords'));

    //Initial state set to amazon as it contains all the categories
    const [platformSearchId, setPlatformSearchId] = useState('_w5itz82oz');
    const [platformUrl, setPlatformUrl] = useState('https://www.amazon.es/s?k=QUERY&__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&ref=nb_sb_noss_1');

    //Init component
    //getting platforms by category passing category keyword form urlParams('url)
    //setting search keyword and categories to the state
    useEffect(() => {
        const getPlatforms = () => {
            getPlatformsByCategory('' + category).then(response => {
                setPlatforms(response.data.sort(compare));
            });
        };
        getPlatforms();
        // eslint-disable-next-line
    }, []);

    //Init component getting the products and executing every time platformSearchId changes
    useEffect(() => {
        const searchURL = insertQueryToUrl(platformUrl, keywords);
        const getProductsSearch = () => {
            getProductsFromSearch(searchURL, platformSearchId).then(response => {
                setSearchResults(response.data);
            });
        }
        getProductsSearch();
    }, [platformSearchId]);


    //Order Alphabetically the JSON
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
    //Order price asc (- to +) parsing product price to INT 
    const comparePriceAsc = (a: any, b: any) => {
        const productA = parseInt(a.productPrice);
        const productB = parseInt(b.productPrice);
        return productA - productB;
    };
    //Order price desc (+ to -) parsing product price to INT 
    const comparePriceDesc = (a: any, b: any) => {
        const productA = parseInt(a.productPrice);
        const productB = parseInt(b.productPrice);
        return productB - productA;
    };

    //Method for truncating the text to certain number of chars
    const truncate = (str: any) => {
        return str.length > 10 ? str.substring(0, 15) + "..." : str;
    }
    //Method that replaces 'QUERY' word from url to an actual keyword obtained from url 
    const insertQueryToUrl = (url: any, keyword: any) => {
        var urlDb = url;
        var replacedString = urlDb.replace("QUERY", keyword);
        return replacedString;
    }
    //Method for handling product search setting the selected PlatformSearchId as the useEffect executes every time that state changes
    const handleSearch = (platformUrlSearch: String, platformId: String) => {
        setPlatformSearchId('' + platformId);
        setPlatformUrl('' + platformUrlSearch);
    }

    return (
                <Style>
        <div className="all">
            <BackNav />
            <Container>
                    <div className="general">
                        <Row>
                            <Col sm={3}>
                                {
                                //endless props passed to the sidenav
                                }
                                <SideNav
                                    platforms={platforms}
                                    handleSearch={handleSearch}
                                    insertQueryToUrl={insertQueryToUrl}
                                    categorySeach={category}
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
            </Container>
        </div>
                </Style>
    )
}

export default SearchResults;
