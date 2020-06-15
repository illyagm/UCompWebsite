import React from 'react';
import { Pagination } from 'react-bootstrap';
import styled from 'styled-components';
const Styles = styled.div`
    .paginationStyle {
        margin-top: 2%;
    }
`;

const paginationBasic = (props: any) => {
    
    let items = [];
    for (let number = 1; number <= Math.ceil(props.totalPlatforms / props.platformsPerPage); number++) {
        items.push(
            <Pagination.Item 
                key={number} 
                active={props.active === number}
                onClick={() => props.paginate(number)}>
                {number}
            </Pagination.Item>,
        ); 
    }
    return (
    <Styles>
    <div className="paginationStyle">
        <Pagination>{items}</Pagination>
    </div>
    </Styles>
    )
}


export default paginationBasic;