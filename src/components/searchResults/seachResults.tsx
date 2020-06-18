import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Container, Button } from 'react-bootstrap';
import BackNav from '../navbar/BackNav';
import styled from 'styled-components';
import { IPlatform } from '../../models/platform/IPlatform';
import PlatformService from '../../services/PlatformService';
import NavPlatform from './NavPlatforms';

const Style = styled.div`
    .searchResults{
        margin-top: 0.5vw;
    }
`;

const SearchResults = (props: any) => {

    //Init component
    useEffect(() => {
        //first process !!!
        //getting platforms by category passing category keyword form urlParams('url)
        //setting search keyword and categories to the state
        const getPlatforms = () => {
            const querySearch = props.location.search;
            const urlParams = new URLSearchParams(querySearch);
            const category = urlParams.get('category');
            const keywords = urlParams.get('searchKeywords');
            setCategoria('' + category);
            setKeywords('' + keywords);
            getPlatformsByCategory('' + category).then(response => {
                setPlatforms(response.data.sort(compare));
            });
        };
        getPlatforms();
        // eslint-disable-next-line
    }, []);
    //Platforms methods
    const platformService = new PlatformService();
    const [platforms, setPlatforms] = useState([]);
    const [categoria, setCategoria] = useState('');
    const [keywords, setKeywords] = useState('');
    const { getPlatformsByCategory } = platformService;
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
    console.log(platforms);

    return (
        <div >
            <BackNav />
            <Style>
                <Container className="searchResults">
                    <h3>Categoria: {categoria}</h3>
                    <p></p>
                    <NavPlatform platforms={platforms}/>
                    {
                        platforms.map((platform: IPlatform, key: number) => {
                            return (
                                platform.category.map(categoryName => {
                                    if (categoryName === categoria) {
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
                                    }
                                })
                            )
                        })
                    }
                </Container>
            </Style>
        </div>
    )
}

export default SearchResults;