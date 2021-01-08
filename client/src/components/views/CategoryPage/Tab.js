import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import './CategoryPage.css';
import {NavLink} from 'react-router-dom';
import {BASE_URL} from '../../Config';
import Axios from 'axios';

const Container = styled.div`
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
    background: #fff;
    text-align: center;
`;

const TabContainer = styled.div`
    max-width: 1024px;
    height: 100%;
    margin: 0 auto;
    position: relative;

    @media only screen and (max-width: 768px){
        font-size: 10px;
    }
`;

function Tab(props) {
    const [category, setCategory] = useState([]);

    useEffect ( () => { 
        const categories_api = `${BASE_URL}/api/categories`;

        Axios.get(categories_api)
        .then( response => {
            const categoriesList = response.data.items.map(item => item);
            setCategory(categoriesList);
        })
    }, []);


    return (
        <Container>
            <TabContainer>
                <ul className="tab">
                    <li>
                      <NavLink exact id="fullList" to="/category/0" className="navLink" activeClassName="active">
                          전체&nbsp;리스트
                      </NavLink>
                    </li>
                    {
                        category && category.map( item => {
                            return (
                                <li key={item.id}>  
                                <NavLink
                                    to={`/category/${item.id}`}
                                    className="navLink"
                                    activeClassName="active">
                                    {item.name}
                                </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </TabContainer>
        </Container>
    );
}

export default Tab;