import React from 'react';
import ImageGroupComponent from './ImageGroupComponent';
import { Container } from 'react-bootstrap';
import Back from '../navbar/BackNav';
import styled from 'styled-components';
const Style = styled.div`
.textInfo{
    margin-top: 10vw;
}
.textResponsive{
    @media (max-width: 768px) {
        font-size: 4vw;
    }
}
`;

const homeComponent = () => {
    return (
        <Style>
        <Back  />
        <Container>
        <div className="textInfo">
            <div className="textResponsive">
                <h2>¿Que es UComp?</h2>
                <br></br>
                <p>UComp es un comparador de productos de todas las categorías. </p>
                <p>UComp es un comparador de sitios fiables dónde puedes comprar criptomonedas y comparar precios/impuestos</p>
                <p>La idea detrás de esta aplicación web es facilitar la tarea de búsqueda y comparativa de los productos online, escogiendo los 5 mejores precios entre todos los comercios de internet</p>
                <p>Es tan fácil como escribir el producto de interés y darle al botón de búsqueda.</p>

            </div>
            <ImageGroupComponent />
        </div>
        </Container>
        </Style>
    )
}

export default homeComponent;