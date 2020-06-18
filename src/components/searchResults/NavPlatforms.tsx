import React from 'react';
import { Nav } from 'react-bootstrap';
import { IPlatform } from '../../models/platform/IPlatform';

const NavSearchResults = (props:any) => {
    const { platforms } = props;

    return (
        <Nav justify variant="tabs" defaultActiveKey="/section0">

            {
                platforms.map((platform: IPlatform, key: number) => {
                    return(
                        <Nav.Item key={key}>
                        <Nav.Link href={'/section'+key}>{platform.name}</Nav.Link>
                        </Nav.Item>
                    )  
                })
            }
        </Nav>
    )
}

export default NavSearchResults;

