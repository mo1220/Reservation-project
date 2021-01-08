import React from 'react';
import {Route} from 'react-router-dom';
import ProductsListPage from './ProductsListPage';

function ProductsInfoPage(props) {

    return (
        <div>
            <Route exact path={`${props.match.path}`}/>
            <Route path={`${props.match.path}/:categoryId`} component={ProductsListPage}/>
        </div>
    );
}

export default ProductsInfoPage;