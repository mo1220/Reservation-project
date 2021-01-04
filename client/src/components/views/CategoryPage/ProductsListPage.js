import React, { useEffect, useState } from 'react';
import {BASE_URL} from '../../Config';
import './CategoryPage.css';
import Axios from 'axios';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {categoryList, fullList, increaseIndex_full, increaseIndex} from '../../../_actions/category_action';

const Container = styled.div`
    width: 100%;
    height: auto;
    background: #f0f0f0;
`;

const BtnContainer =styled.div`
    width: 1020px;
    margin: 0 auto;

    @media only screen and (min-width: 768px) and (max-width: 1024px){
        width: 100%;
    }
    @media only screen and (max-width: 767px){
        width: 100%;
    }
`;

const Button = styled.button`
    width: 100%;
    height: 40px;
    display: block;
    background-color: #fff;
    border: 1px solid rgb(192, 192, 192);
    margin-top: 20px;
    cursor: pointer;
`;


function ProductsListPage(props) {
    const [index, setIndex] = useState(4);
    const {categoryId} = props.match.params;
    const [totalCount, setTotalCount] = useState(0);

    const dispatch = useDispatch();

    const List = useSelector(state => state.category);

    useEffect( () => {
        const products_api = `${BASE_URL}/api/products?start=${index}`;
        const categories_item_api = `${BASE_URL}/api/products?categoryId=${categoryId}&start=${index}`

        if(categoryId !== '0') {
            dispatch(categoryList(categoryId));
            fetchTotalCount(categories_item_api);
        } else {
            dispatch(fullList());
            fetchTotalCount(products_api);
        }

               
        return () => {
            setIndex(4);
        }
    }, [categoryId]);


    const fetchTotalCount = (url) => {
        Axios.get(url)
        .then(response => {
            setTotalCount(response.data.totalCount);
        })
    }

    const moreBtnHandler = () => {
        setIndex(index+4);
        if(categoryId !== '0') {
            dispatch(increaseIndex(categoryId, index));
        }
        else {
            dispatch(increaseIndex_full(index));
        }
    }

    return (
        <Container>
            <ul className="list_all_container" id="#top">
            {
                List && List.map((list, index) => {
                    return (
                        <li key={index}>
                        <a href={`/detail/${list.productId}`}>
                            <img src={`/${list.productImageUrl}`}/>
                        </a>
                        <div className="list_txt_wrap">
                            <a>
                                <h3>
                                    {list.productDescription}</h3>
                                <p>
                                    {list.placeName}
                                </p>
                            </a>
                            <a>
                                <p className="content">
                                    {list.productContent}
                                </p>
                            </a>
                        </div>
                    </li> 
                    )
                })
            }
            </ul>   
        <BtnContainer>
            {
                List.length !== totalCount &&             
                <Button className="btn__disappear" onClick={moreBtnHandler}>더보기</Button>

            }

        </BtnContainer>
        </Container>
    );
}

export default React.memo(ProductsListPage);