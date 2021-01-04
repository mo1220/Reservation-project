import React from 'react';
import styled from 'styled-components';

const DetailInfoContainer = styled.div`
    width: 100%;
`;

const Title = styled.h3`
    margin-bottom: 20px;
`;

const Text = styled.p`     
    margin-bottom: 20px;
`;

const HomePageLink = styled.a``;

function InfoPage(props) {
    const displayInfo = props.displayInfo;

    return (
        <DetailInfoContainer>
            <Title>[소개]</Title>
            <Text>{displayInfo.productContent}</Text>
            <Title>[공지사항]</Title>
            <Text>홈페이지 : </Text>
                <HomePageLink>{displayInfo.homepage}</HomePageLink>
        </DetailInfoContainer>
    );
}

export default InfoPage;