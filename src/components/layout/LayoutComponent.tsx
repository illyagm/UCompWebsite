import React from 'react';
import { Container } from 'react-bootstrap';


const layoutComponent = (props: { children: React.ReactNode; }) => {
    return (
        <Container>
            {props.children}
        </Container>
    )
}

export default layoutComponent;