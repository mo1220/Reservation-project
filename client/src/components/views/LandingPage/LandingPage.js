import React, { Fragment, useEffect, useState } from 'react'
import PromotionPage from '../PromotionPage/PromotionPage';
import {BASE_URL} from '../../Config';
import '../PromotionPage/promotion.css';
import Tab from '../CategoryPage/Tab';
import Axios from 'axios';


function LandingPage() {
    const [promotions, setPromotioins] = useState([]);

    useEffect( () => {
        const promotions_api = `${BASE_URL}/api/promotions`
        fetchPromotion(promotions_api);

    }, []);
    
    const fetchPromotion = async (promotions_api) => {
        Axios.get(promotions_api)
        .then(response => {
            setPromotioins(response.data.items)
        })

    }

    return (
        <Fragment>
            <div className="section__promotion">
                <PromotionPage promotions={promotions}/>
                <Tab/>
            </div>
        </Fragment>
    )
}

export default LandingPage
