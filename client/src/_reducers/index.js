import { combineReducers } from 'redux';
import user from './user_reducer';
import category from './category_reducer';
import reservation from './reservation_reducer';

const rootReducer = combineReducers({
    user,
    category,
    reservation
});

export default rootReducer;