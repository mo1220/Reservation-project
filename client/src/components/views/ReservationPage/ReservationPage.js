import React, { useEffect, useState } from 'react';
import qs from 'querystring';
import {BASE_URL} from '../../Config';
import Axios from 'axios';
import styled from 'styled-components';
import './reservation.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    AdultPlusPrice, 
    AdultMinusPrice, 
    TeenagerPlusPrice, 
    TeenagerMinusPrice, 
    ChildPlusPrice, 
    ChildMinusPrice} from '../../../_actions/reservation_action';
import TicketerInfo from './TicketerInfo';

const ReservationContainer = styled.div`
    width: 600px;
    max-width: 100%;
    margin: 0 auto;
    padding: 10px;
    border-right: 1px solid #e5e5e5;
    border-left: 1px solid #e5e5e5;
    background-color: #f5f5f5;
    box-sizing: border-box;

`;
const ProductInfo = styled.div`
    max-width: 100%;
    margin: 0 auto;
    padding: 10px;
    background-color: #fff;
`;

const Image = styled.img`
    width: 100%;
    height: 600px;
    margin: 0 auto;
    display: block;
`;
const Title = styled.h3`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
`;
const SelectContainer = styled.ul`
    max-width: 100%;
    margin: 10px auto;
    padding: 10px;
    background-color: #fff;
`;

const CountBtnWrap = styled.div`
    position: absolute;
    top: 85px; right: 0px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -15%;
    background: #fff;
    box-sizing: border-box;

`;
const CountButton = styled.button`
    flex: 1;
    width: 36px;
    height: 36px;
    background: #fff;
    padding: 0;
    font-size: 20px;
    line-height: 1em;
    cursor: pointer;
`;
const Number = styled.p`
    margin: 0 -1px;
    text-align: center;
    flex: 1;
    line-height: 2.6em;
    font-size: 15px;
    width: 36px;
    height: 36px;
    border: 2px solid #e5e5e5;
    color: #e5e5e5;
`;

function ReservationPage(props) {
    const query = qs.parse(props.location.search, '?' );
    const productId = parseInt(query.productId, 10);

    const [productImgs, setProductImgs] = useState([]);
    const [productInfo, setProductInfo] = useState([]);
    const [productPrices, setProductPrices] = useState([]);
    
    const price = useSelector(state => state.reservation)

    const [prices, setPrices] =  useState([{}]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [count, setCount] = useState({
        adultCount: 0,
        teenagerCount: 0,
        childCount: 0
    });
    const {adultCount, teenagerCount, childCount} = count;

    const dispatch = useDispatch();

    useEffect(() => {
        const detail_api = `${BASE_URL}/api/products/${productId}`;
        Axios.get(detail_api)
        .then(response => {
            const items = response.data
            console.log(items); 
            setProductImgs([...items.productImages.map(item => item)]);
            setProductInfo([items.displayInfo]);
            setProductPrices([...items.productPrices]);
        })
        if(count.adultCount > 0 || count.teenagerCount > 0 || count.childCount > 0){
            createPricesObject();
            setTotalPrice(price.adult + price.teenager + price.child);
        }

    }, [count]);


    const productPrice = productPrices.map(item => item.price).reverse();
    const priceId = productPrices.map(item => item.productPriceId).reverse();

    const createPricesObject = () => {
        setPrices([
            {
                count: count.adultCount,
                productPriceId: priceId[0],
                priceTypeName: "A",
                price: productPrice[0]
            },
            {
                count: count.teenagerCount,
                productPriceId: priceId[1],
                priceTypeName: "Y",
                price: productPrice[1]
            },
            {
                count: count.childCount,
                productPriceId: priceId[2],
                priceTypeName: "B",
                price: productPrice[2]

            }
        ])
    };
    
    const onClickPlus = (e) => {
        if(e.target.value === "A") {
            dispatch(AdultPlusPrice(productPrice[0]));
           setCount({
               ...count, 
               adultCount: adultCount+1})
       }
       else if(e.target.value === "Y"){
           dispatch(TeenagerPlusPrice(productPrice[1]));
           setCount({
               ...count,
               teenagerCount: teenagerCount+1
           });
       }
       else{
            dispatch(ChildPlusPrice(productPrice[2]));
            setCount({
                ...count,
                childCount: childCount+1
            });
       }
    }

    const onClickMinus = (e) => {
        if(e.target.value === "A") {
            dispatch(AdultMinusPrice(productPrice[0]));
            setCount({
                ...count, 
                adultCount: adultCount-1})
        }
        if(e.target.value === "Y") {
            dispatch(TeenagerMinusPrice(productPrice[1]));
            setCount({
                ...count, 
                teenagerCount: teenagerCount-1})
        }
        if(e.target.value === "B") {
            dispatch(ChildMinusPrice(productPrice[2]));
            setCount({
                ...count, 
                childCount: childCount-1})
        }
    }
    return (
        <ReservationContainer>
            {
                productImgs && 
                productImgs.map((item, index) => {
                    if(item.type === 'ma')
                        return (
                        <Image 
                            key={index}
                            src={`/${item.saveFileName}`} 
                            alt="상품 이미지"/>
                        ) 
                })
            }
           <ProductInfo>
               {
                   productInfo && 
                   productInfo.map((item, index) => {
                       return (
                           <div key={index}>
                               <Title>
                                   {item.productDescription}
                                </Title>
                                <p>- 장소 : {item.placeStreet}</p>
                                <p>{item.openingHours}</p>
                           </div>
                       )                        
                   })
               }
                <Title>[요금]</Title>
               {
                    productPrices &&
                    productPrices.map((item) => (
                        item.priceTypeName === "A" 
                       ? (
                            <p key={item.productPriceId}>- 성인(만 19~64세) : {item.price}원</p>
                       ) 
                       : item.priceTypeName === "Y" 
                       ? (
                            <p key={item.productPriceId}>- 청소년(만 13~18세) : {item.price}원</p>
                       )
                       : (
                            <p key={item.productPriceId}>- 어린이(만 4~12세) : {item.price}원</p>
                       )
                    ))
               }
           </ProductInfo>

           <SelectContainer className="priceList_container">
           {
                    productPrices &&
                    productPrices.map((item) => (
                        item.priceTypeName === "A" 
                       ? (
                            <li className="priceList" key={item.productPriceId}>
                                <h3>
                                    성인(만 19~64세)<br/>
                                    {item.price}원
                                </h3>
                                <p>
                                    {item.price}원 ({item.discountRate}% 할인가)
                                </p>
                                <CountBtnWrap className="count_btn_wrap">
                                    <CountButton
                                        value={item.priceTypeName}   
                                        className={count.adultCount > 0 ? 'active' : 'minus_btn'}
                                        onClick={count.adultCount > 0 ? onClickMinus : undefined}>-
                                    </CountButton>
                                    <Number
                                        className={count.adultCount>0 ? 'active' : 'number'}>
                                        {count.adultCount}
                                    </Number>
                                    <CountButton
                                        value={item.priceTypeName} 
                                        onClick={onClickPlus}
                                        className="plus_btn">+
                                    </CountButton>
                                </CountBtnWrap>
                                <p className="total_price">{price.adult} 원</p>
                            </li>
                       ) 
                       : item.priceTypeName === "Y" 
                       ? (
                            <li className="priceList" key={item.productPriceId}>
                                <h3>
                                    청소년(만 13~18세)<br/>
                                    {item.price}원
                                </h3>
                                <p>{item.price}원 ({item.discountRate}% 할인가)</p>
                                <CountBtnWrap
                                    className="count_btn_wrap">
                                    <CountButton
                                        value={item.priceTypeName} 
                                        className={count.teenagerCount > 0 ? 'active' : 'minus_btn'}
                                        onClick={count.teenagerCount > 0 ? onClickMinus : undefined}>-
                                    </CountButton>
                                    <Number 
                                        className={count.teenagerCount > 0 ? 'active' : 'number'}>
                                        {count.teenagerCount}
                                    </Number>
                                    <CountButton 
                                        value={item.priceTypeName}
                                        className="plus_btn"
                                        onClick={onClickPlus}>+
                                    </CountButton>
                                </CountBtnWrap> 
                                <p className="total_price">{price.teenager} 원</p>   
                           </li>
                       )
                       : (
                            <li className="priceList" key={item.productPriceId}>
                            <h3>
                                어린이(만 4~12세)<br/>
                                {item.price}원
                            </h3>
                            <p>{item.price}원 ({item.discountRate}% 할인가)</p>
                            <CountBtnWrap
                                className="count_btn_wrap">
                                <CountButton
                                    value={item.priceTypeName} 
                                    className={count.childCount > 0 ? 'active' : 'minus_btn'}
                                    onClick={count.childCount > 0 ? onClickMinus : undefined}>-
                                </CountButton>
                                <Number
                                    className={count.childCount > 0 ? 'active' : 'number'}>
                                    {count.childCount}
                                </Number>
                                <CountButton
                                    value={item.priceTypeName}
                                    className="plus_btn"
                                    onClick={onClickPlus}>+
                                </CountButton>
                            </CountBtnWrap>
                            <p className="total_price">{price.child} 원</p>
                            </li>
                       )    
                    )).reverse()
               }
           </SelectContainer>

           <TicketerInfo count={count} displayInfo={productInfo} prices={prices} totalPrice={totalPrice}/>
        </ReservationContainer>
    );
}

export default ReservationPage;