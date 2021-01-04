import React from 'react';

function NonReservation(props) {
    return (
        <div style={
            {
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%', 
                height: '100vh',
                background: '#fff'
            }
            }>
            예약된 내용이 없습니다.
        </div>
    );
}

export default NonReservation;