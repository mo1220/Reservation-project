import React, { useState } from 'react';
import styled from 'styled-components';
import './detailPage.css';


const ProductImgContainer = styled.div`
    min-width: 100%;
    height: 500px;
    background-color: #f5f5f5;
`;
const ArrowContainer = styled.div`
    position: absolute;
    top: 0; left: 0; right: 0;
    margin: 0 auto;
    width: 545px;
    height: 500px;
    z-index: 10;
`;

const Dimmed = styled.div`
    position: absolute;
    top: 0; left: 0px; right: 0px;
    width: 500px;
    height: 100%;
    margin: 0 auto;
    background: rgba(0,0,0, 0.15);
`;

const NumberContainer = styled.div`
    position: absolute;
    bottom: 10px; left: 0; right: 0;
    z-index: 12;
    text-align: center;
    background-color: rgba(0,0,0, .5);
    border-radius: 10px;
    width: 100px;
    height: 30px;
    margin: 0 auto;
`;

function ProductImages(props) {
    const productImages = props.productImgs;
    const displayInfo = props.displayInfo;

    const [slideIndex, setSlideIndex] = useState(0);

    const slides = document.getElementsByClassName('slides');

    const prevSlide = () => {
        for(let i=0; i<slides.length; i++) {
            slides[i].classList.add('prevImage');
            slides[i].classList.remove('nextImage');
        }
    }

    const nextSlide = () => {
       for(let i=0; i<slides.length; i++) {
        slides[i].classList.add('nextImage');
        slides[i].classList.remove('prevImage');
       }
    }

    return (
        <ProductImgContainer>
        <ul id="slideShow_box">
            {
                productImages && productImages.map((image, index) => {
                    return (
                        <li className="slides fade" key={index}>
                            <img className="image" alt="상품 이미지" src={`/${image.saveFileName}`}/>
                        </li>
                    )
                })
            }
            <p className="displayTitle">{displayInfo.productDescription}</p>
            <Dimmed/>
            <NumberContainer className="number_wrap">
                <span className="currentNum">{slideIndex+1}</span>
                <span>/</span>
                <span className="allNum">{productImages.length}</span>
            </NumberContainer>
        </ul>
        <ArrowContainer className="arrow_wrap">
            {
                slideIndex === 0 ? (
                    <a  
                        href="#"
                        style={{display: 'none'}}
                        className="prev" 
                        onClick={(e) => {
                            e.preventDefault();
                            setSlideIndex(slideIndex-1)
                            prevSlide()
                        }}>&#10094;
                    </a> ) : (
                    <a  
                        href="#"
                        style={{display: 'block'}}
                        className="prev" 
                        onClick={(e) => {
                            e.preventDefault();
                            setSlideIndex(slideIndex-1)
                            prevSlide()
                        }}>&#10094;
                    </a>
                    )
            }       
            {
                slideIndex === productImages.length-1 ? (
                    <a 
                        href="#"
                        style={{display: 'none'}}
                        className="next" 
                        onClick={(e) => {
                            e.preventDefault();
                            setSlideIndex(slideIndex+1)
                            nextSlide()
                        }}>&#10095;
                    </a> ) : (
                    <a 
                        href="#"
                        style={{display: 'block'}}
                        className="next" 
                        onClick={(e) => {
                            e.preventDefault();
                            setSlideIndex(slideIndex+1)
                            nextSlide()
                        }}>&#10095;
                    </a>
                    )
    
            }        
        </ArrowContainer>
     
        </ProductImgContainer>
    );
}

export default ProductImages;