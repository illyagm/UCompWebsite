import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { IPlatform } from '../../models/platform/IPlatform';

const NavSearchResults = (props:any) => {
    const { platforms } = props;

    const [productsSearchId, setProductsSearchId] = useState('');
    const handleSearch = (id: String) => {
        console.log(id);
        setProductsSearchId(''+id);
    }
    useEffect(() => {
        
        console.log('inside useEffect')

    }, [productsSearchId])
    console.log('rendering....')
    return (
        <Nav justify variant="tabs" defaultActiveKey="#">

            {
                platforms.map((platform: IPlatform, key: number) => {
                    return(
                        <Nav.Item key={key} onClick={() => handleSearch(platform.id)}>
                        <Nav.Link href="#" eventKey={platform.id}>{platform.name}</Nav.Link>
                        </Nav.Item>
                    )  
                })
            }
        </Nav>
    )
}

export default NavSearchResults;

