import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import styled from 'styled-components';
const Style = styled.div`
   .navbar{
        background-color: rgba(255,255,255, 0.7);
        font-weight: bold;
        font-size: 0.7vw;
        @media (max-width: 768px) {
            font-size: 3vw;
        }
   }
  
`;

const Footer = () => {
    return (
        <Style>
            <Navbar fixed="bottom">
                <Nav className="ml-auto">
                    <Nav.Item><Nav.Link href="#">Created by IL</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="#">© 2020 UComp</Nav.Link></Nav.Item>
                </Nav>                
            </Navbar>
        </Style>
    )
}

export default Footer;