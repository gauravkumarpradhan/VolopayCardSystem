import { createStore, combineReducers } from 'redux';
import { accountReducer } from './reducers/expenditure_reducer';

export const store = createStore(
    combineReducers({
        account: accountReducer
    })
);


