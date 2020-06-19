import React, { useEffect, useState } from 'react';
import { Container, Nav, Card, Button, Row, Col } from 'react-bootstrap';
import BackNav from '../navbar/BackNav';
import styled from 'styled-components';
import { IPlatform } from '../../models/platform/IPlatform';
import { IProductSearch } from '../../models/productSearch/IProductSearch';
import PlatformService from '../../services/PlatformService';
import ProductSearchService from '../../services/productSearchService/ProductSearchService';

const Style = styled.div`
    .searchResults{
        margin-top: 0.5vw;
    }
    img {
        width: 20%;
        height: auto;
        float: right;
    }
    .product {
        margin-top: 2vw;
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
    const truncate = (str: any) => {
        return str.length > 10 ? str.substring(0, 15) + "..." : str;
    }
    //method that replaces 'QUERY' word from url to an actual keyword obtained from url 
    const insertQueryToUrl = (url: any, keyword: any) => {
        var urlDb = url;
        var replacedString = urlDb.replace("QUERY", keyword);
        return replacedString;
    }
    const viewPage = (url: Location) => {
        window.location = url;
    }

    const handleSearch = (platformUrlSearch: String, platformId: String) => {
        setPlatformSearchId('' + platformId);
        setPlatformUrl('' + platformUrlSearch);
        console.log(platformUrlSearch);
        //setProductsSearchId(''+id);
    }

    const buyProduct = (productUrl: string) => {
        window.location.href = productUrl;
    }


    //Init component
    useEffect(() => {
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
        console.log('UPDATING DATA!')
        getProductsSearch();
    }, [platformSearchId]);



    console.log('Resultados busqueda ' + searchResults);

    return (
        <div >
            <BackNav />
            <Style>
                <Container className="searchResults">
                    <h3>Categoria: {categoria}</h3>
                    <p></p>
                    <Nav justify variant="tabs" defaultActiveKey="#">
                        {
                            platforms.map((platform: IPlatform, key: number) => {
                                return (
                                    platform.category.map(categoryName => {
                                        if (categoryName === categoria) {
                                            return (
                                                <Nav.Item key={key} onClick={() => handleSearch(insertQueryToUrl(platform.url, keywords), platform.id)}>
                                                    <Nav.Link href="#" eventKey={platform.id}>{platform.name}</Nav.Link>
                                                </Nav.Item>
                                            )
                                        }
                                    })
                                )
                            })
                        }
                    </Nav>

                    {
                        searchResults.map((product: IProductSearch, key: number) => {
                            return (
                                <div key={key} className="product">
                                        <Card>
                                            <Card.Body>
                                                <Row>
                                                    <Col sm>
                                                    <Card.Text><b>{product.productName}</b></Card.Text>
                                                    <Card.Text> {'Opiniones: ' + product.numberOfRatings}</Card.Text>
                                                    <Card.Text>{product.productPrice}</Card.Text>
                                                    <Button variant="primary" onClick={() => buyProduct('' + product.productUrl)}>Comprar</Button>
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
                </Container>
            </Style>
        </div>
    )
}

export default SearchResults;

/*

return (
                                            <Style>
                                                <Card className="searchResults">
                                                    <Card.Body>
                                                        <Card.Header>{platform.name}</Card.Header>
                                                        <Card.Text>
                                                            <ListGroup.Item key={key}>{insertQueryToUrl(platform.url, keywords)}</ListGroup.Item>
                                                        </Card.Text>
                                                        <Button variant="success" onClick={() => viewPage(insertQueryToUrl(platform.url, keywords))}>Visit Page</Button>
                                                    </Card.Body>
                                                </Card>
                                            </Style>
                                        )
*/