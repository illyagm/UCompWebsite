import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Container, Button } from 'react-bootstrap';
import BackNav from '../navbar/BackNav';
import styled from 'styled-components';
import { IPlatform } from '../../models/platform/IPlatform';
import PlatformService from '../../services/PlatformService';
import PaginationPlatformsComponents from './paginationPlatformsComponent';

const Style = styled.div`
    .searchResults{
        margin-top: 0.5vw;
    }
`;

const SearchResults = (props: any) => {
    const platformService = new PlatformService();
    const [platforms, setPlatforms] = useState([]);
    const { getAll } = platformService;
    var querySearch = props.location.search;
    const urlParams = new URLSearchParams(querySearch);
    const compare = (a: any, b: any) => {
        const platformA = a.name.toUpperCase();
        const platformB = b.name.toUpperCase();

        let comparison = 0;
        if (platformA > platformB){
            comparison = 1;
        } else if(platformA < platformB){
            comparison = -1;
        }
        return comparison;
    };  
    useEffect(() => {
       const getPlatforms = () => {
        getAll().then(response => {
            setPlatforms(response.data.sort(compare));
          });
       };
       getPlatforms();
       // eslint-disable-next-line
    }, [querySearch]);
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [active, setActive] = useState(1);
    const [platformsPerPage] = useState(4);
    const indexOfLastPlatform = currentPage * platformsPerPage;
    const indexOfFirstPost = indexOfLastPlatform - platformsPerPage;
    const currentPlatforms = platforms.slice(indexOfFirstPost, indexOfLastPlatform);
    //Change page
    const paginate = (pageNumber: React.SetStateAction<number>) => {
        setCurrentPage(pageNumber);
        setActive(pageNumber);
    } 
    const truncate = (str: any) => {
        return str.length > 10 ? str.substring(0, 15) + "..." : str;
    }
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
        <BackNav/>
        <Style>
        <Container className="searchResults">
        <h3>Categoria: {urlParams.get('category')}</h3>
        {
                    currentPlatforms.map((platform: IPlatform, key: number) => {
                        return(
                            <Style>
                            <Card className="searchResults">
                            <Card.Body>
                            <Card.Header>{platform.name}</Card.Header>
                            <Card.Text>
                            <ListGroup.Item key={key}>{insertQueryToUrl(platform.url, urlParams.get('searchKeywords'))}</ListGroup.Item>
                            </Card.Text>
                            <Button variant="success" onClick={() => viewPage(insertQueryToUrl(platform.url, urlParams.get('searchKeywords')))}>Visit Page</Button>
                            </Card.Body>
                            </Card>
                            </Style>
                        )
                    })
        }
        <PaginationPlatformsComponents platformsPerPage ={platformsPerPage} totalPlatforms={platforms.length} paginate={paginate} currentPage={currentPage} active={active}/>
        </Container>
        </Style>
        </div>
    )
}

export default SearchResults;