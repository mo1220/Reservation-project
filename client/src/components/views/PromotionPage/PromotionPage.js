import React from "react";
import styled from 'styled-components';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './promotion.css';
import { useMediaQuery } from "react-responsive";

const Container = styled.div`
  width: 80%;
  /* max-width: 1024px; */
  margin: 0 auto;
  overflow:hidden;
  position: relative;
`;


const StyledSlider = styled(Slider)`
    .slick-slide div{
      outline: none;
    }

    .slick-slide .center img{
        transform: scale(1.1);
    }
    .slick-prev{
        position: absolute;
        opacity: 1;
        left: 0;
        z-index: 10;
    }
    .slick-next{
        position: absolute;
        opacity: 1; 
        right: 0;
        z-index: 10;
    }
`;

const ImageContainer = styled.div` 
  display: flex;
  height: 550px;
  margin: 0 10px;
`;

const WebImage = styled.img`
    flex: 1 0 33.3%;
`;
const TabImage = styled.img`
    flex: 1 0 50%;
`;
const MobileImage = styled.img`
    flex: 1 0 100%;

`;

function PromotionPage (props) {
  const tabQuery = useMediaQuery({
    query: "(max-width: 768px)"
  })
  const mobileQuery = useMediaQuery({
    query: "(max-width: 480px)"
  })

    const settings = {
      className: 'center',
      centerMode: true,
      centerPadding: '0',
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 786,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
        <Container>
        <StyledSlider {...settings}>
          {props.promotions.map(item => {
            return (    
              <div key={item.id}>
                <ImageContainer className="Image_container">
                  {
                    tabQuery 
                    ? (
                      <TabImage className="imageBox" src={`/${item.productImageUrl}`} />
                    )
                    : mobileQuery
                    ? (
                      <MobileImage className="imageBox" src={`/${item.productImageUrl}`} />
                    )
                    : (
                      <WebImage className="imageBox" src={`/${item.productImageUrl}`} />
                    )
                  }
                </ImageContainer>
              </div>
            );
          })} 
        </StyledSlider>
      </Container>
      
    );
}

export default PromotionPage;