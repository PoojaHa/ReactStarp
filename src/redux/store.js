/* eslint-disable import/no-extraneous-dependencies */

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
// persit import
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// import { persistStore, persistReducer } from 'redux-persist';

import authReducer from './auth/reducer';
import UserReducer from './consumer/reducer';
import orderReducer from './order/reducer';
import paymentReducer from './payment/reducer';
import merchantReducer from './merchant/reducer';

const appReducers = combineReducers({ 
    auth: authReducer,
    consumer: UserReducer,
    merchant: merchantReducer,
    order: orderReducer,
    payment: paymentReducer
});

const rootReducers = (state, action) => appReducers(action.type === 'RESET' ? undefined : state, action);
const middleware = [logger, thunk];

const persistConfig = {
    key: 'primary',
    storage: storage,
    // Whitelist (Save Specific Reducers)
    whitelist: [
        'auth',
    ],
    // Blacklist (Don't Save Specific Reducers)
    // blacklist: [
    //   'counterReducer',
    // ],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(persistedReducer, composeWithDevTools(
    applyMiddleware(...middleware),
));

const persistor = persistStore(store);
const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => store.getState();

export { getStore, getState, getPersistor };
export default { getStore, getState, getPersistor };
