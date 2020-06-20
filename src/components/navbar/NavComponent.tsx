import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';

const NavStyle = styled.div`
    .navbar {
        background-color: rgba(0, 0, 0, 0.5);
        -webkit-box-shadow: 0px 6px 5px -2px rgba(0,0,0,0.33);
        -moz-box-shadow: 0px 6px 5px -2px rgba(0,0,0,0.33);
        box-shadow: 0px 6px 5px -2px rgba(0,0,0,0.33);
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: white;
        font-size: 1vw;
        @media (max-width: 768px) {
            font-size: 5vw;
        }
       &:hover {
           color: #d400d4;
       } 
    }
`;

const NavComponent = () => {
    return (
        <NavStyle>
            <Navbar expand="lg">
                <Navbar.Brand href="/"><b>UComp</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item><Nav.Link href="/about">Sobre Nosotros</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </NavStyle>
    )

}

export default NavComponent;

