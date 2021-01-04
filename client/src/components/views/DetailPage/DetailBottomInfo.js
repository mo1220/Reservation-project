import React from 'react';
import {Route} from 'react-router-dom';
import DetailInfoPage from './Tab/DetailInfoPage';

function DetailBottomInfo(props) {

    return (
        <div>
            <Route 
                exact 
                path={`${props.match.path}`}
               />
            <Route 
                path={`${props.match.path}?/:info`}
                render={(props) => 
                    <DetailInfoPage 
                        {...props} /> }
            />
        </div>
    );
}

export default DetailBottomInfo;