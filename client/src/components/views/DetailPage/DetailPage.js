import React, { useEffect, useState, useRef } from 'react';
import ProductImages from './ProductImages';
import CommentPage from './CommentPage';
import {BASE_URL} from '../../Config';
import './detailPage.css';
import '../CategoryPage/CategoryPage.css';
import Axios from 'axios';
import styled from 'styled-components';
import {Route} from 'react-router-dom';
import DetailInfoPage from './Tab/DetailInfoPage';
import DetailTabPage from './DetailTabPage';

const ProductContent = styled.div`
    width: 500px;
    height: auto;
    margin: 0 auto;
    padding: 10px 15px;
    box-sizing: border-box;
    background-color: #fff;
`;

const UnfoldBox =styled.a`
    display: block;
    width: 500px;
    height: 40px;
    margin: 0 auto;
    background-color: #F9F8F6;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    cursor: pointer;
`;
const EventBox = styled.div`
    max-width: 500px;
    height: auto;
    margin: 0 auto;
    background-color: #FFFFF4;
    padding: 8px;
    border-bottom: 1px solid #f5f5f5;
    text-align: left;
`;

const Button = styled.a`
    max-width: 500px;
    width: 100%;
    height: 40px;
    margin: 0 auto;
    background-color: #04B431;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`;


function DetailPage(props) {
    const {productId} = props.match.params;
    const detail_api = `${BASE_URL}/api/products/${productId}`;

    const [productImgs, setProductImgs] = useState([]);
    const [displayInfo, setDisplayInfo] = useState({});
    const [comments, setComments] = useState([]);
    const [infoImg, setInfoImg] = useState({});
    const [avgScore, setAvgScore] = useState(0);
    const [toggle, setToggle] = useState(false);
    
    const addClassName = useRef();


    useEffect( () => {

        Axios.get(detail_api)
        .then(response => {
            const items = response.data
            console.log(items);
            setDisplayInfo(items.displayInfo);
            setInfoImg(items.displayInfoImage);
            setProductImgs(items.productImages);
            setAvgScore(items.averageScore);
            setComments(items.comments);
        })
    }, [])

    const collapseSection = () => {
        setToggle(!toggle);
        addClassName.current.classList.toggle('on');
        addClassName.current.classList.toggle('content');
    }

    return (
        <div className="datail_container">
            <ProductImages displayInfo={displayInfo} productImgs={productImgs}/>

            <ProductContent id="contentBox">
               <p className="content" ref={addClassName}>{displayInfo.productContent}</p>
            </ProductContent>

            <UnfoldBox
                id="unfoldBox"
                onClick={() => {
                    collapseSection();
                }}
                >
                <h3>펼쳐보기</h3>
                {
                    toggle ? (
                        <img className="arrowIcon" src="/img/icon_top_arrow.png" alt="icon top arrow"/>
                    ) : (
                        <img className="arrowIcon" src="/img/icon_bottom_arrow.png" alt="icon top arrow"/>
                    )
                }
            </UnfoldBox>
            <EventBox className="eventBox">
                <div style={
                    { 
                        borderBottom: '1px solid #e5e5e5',
                        paddingBottom: '8px',
                        textAlign: 'left'
                    }}>
                    <img className="giftIcon" src="/img/icon_gift.png" alt="gift icon"/>
                    <h4>이벤트 정보</h4>
                </div>
                <div style={
                    {
                        padding: '8px'
                    }
                }>
                    <p>[네이버예약 특별할인</p>
                    <p>R석 50%, S석 60% 할인</p>
                </div>
            </EventBox>

            <Button 
                className="reservation_btn" 
                href={`/reservation?productId=${productId}`}>
                <img src="/img/icon_calendar.png" alt="calendar icon"/>
                예약하기
            </Button>

            <CommentPage avgScore={avgScore} comments={comments} displayInfo={displayInfo}/>
            <DetailTabPage productId={productId}/>
            <Route 
                path={`${props.match.path}?/:info`} 
                render={(props) => 
                    <DetailInfoPage  
                        infoImg={infoImg}
                        displayInfo={displayInfo}
                        {... props}  />}
            />
        </div>
    );
}

export default React.memo(DetailPage);