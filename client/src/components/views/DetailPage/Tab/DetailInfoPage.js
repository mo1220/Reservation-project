import React from 'react';
import InfoPage from './InfoPage';
import MapPage from './MapPage';
import styled from 'styled-components';

const DetailInfoContainer = styled.div`
    width: 500px;
    background: #fff;
    margin: 0 auto;
    padding: 20px 10px;
`;
function DetailInfoPage(props) {
    const urlParam = props.match.params.info;
    const infoImage = props.infoImg;
    const displayInfo = props.displayInfo;
    
    return (
        <DetailInfoContainer>
            {
                urlParam !== 'map' ? 
                    <InfoPage 
                        displayInfo={displayInfo}
                        infoImage={infoImage}/> : 
                    <MapPage 
                        displayInfo={displayInfo}
                        infoImage={infoImage}/>
            }
        </DetailInfoContainer>
    );
}

export default React.memo(DetailInfoPage);