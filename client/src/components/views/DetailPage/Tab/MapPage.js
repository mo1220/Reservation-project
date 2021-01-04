import React from 'react';
import styled from 'styled-components';

const MapImage = styled.img`
    min-width: 100%;
    height: 400px;
    margin-bottom: 20px;
`;
const Title = styled.h3`
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 15px;

`;
const AddressContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
`;
const Icon = styled.img`
    width: 20px;
    height: 20px;
`;
const Text = styled.div`
    margin-left: 10px;
`;
const Telephone = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const Navigation = styled.div`
    width: 100%;
    max-width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f5f5;
    border: 1px solid #e5e5e5;
    position: relative;
`;
const Button = styled.button`
    cursor: pointer;
    border: none;
    flex: 1;
    height: 50px;
    
`;
function MapPage(props) {
    const displayInfo = props.displayInfo;
    const infoImage = props.infoImage;

    return (
        <div>
            <MapImage src={`/${infoImage.saveFileName}`} alt="지도"/>
            <Title>{displayInfo.productDescription}</Title>
            <AddressContainer>
            <Icon src="/img/icon_map_pin.png" alt="지도 핀"/>
            <Text>
                <p>{displayInfo.placeLot}</p>
                <p>{displayInfo.placeStreet}</p>
                <p>{displayInfo.placeName}</p>
            </Text>
            </AddressContainer>
            <Telephone>
                <Icon src="/img/icon_phone-call.png" alt="전화번호"/>
                <Text>{displayInfo.telephone}</Text>
            </Telephone>
            <Navigation>
                <Button>길찾기</Button>
                <p style={{
                    marginBottom: '0',
                    background: '#f5f5f5',
                    position: 'absolute',
                    top: '25%', left: '50%', right: '50%',
                    color: '#e5e5e5'
                    }}>|</p>
                <Button>네비게이션</Button>
            </Navigation>
        </div>
    );
}

export default MapPage;