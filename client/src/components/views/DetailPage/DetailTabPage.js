import React, { useEffect } from 'react';
import '../CategoryPage/CategoryPage.css';
import './detailPage.css';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const BottomContainer = styled.div`
    max-width: 100%;
`;

function DetailTabPage(props) {
    const productId = props.productId;

    useEffect( () => {
        document.getElementById('info').click();
    }, [])

    return (
        <BottomContainer>
            <ul className="tab detailTab" >
                <li><NavLink to={`/detail/${productId}/info`} id="info" className="navLink" activeClassName="active">상세정보</NavLink></li>
                <li><NavLink to={`/detail/${productId}/map`} className="navLink" activeClassName="active">오시는길</NavLink></li>

            </ul>
        </BottomContainer>
        
    );
}

export default DetailTabPage;