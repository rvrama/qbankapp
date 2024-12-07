import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker.js';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import authReducer from './store/reducers/auth';
import questionReducer from './store/reducers/question';
import resultReducer from './store/reducers/result';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : (null || compose);

const rootReducer = combineReducers({
    question: questionReducer,
    auth: authReducer,
    result : resultReducer
});
//change to configureStore from @reduxjs/toolkit when you know the actual implementation
const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
registerServiceWorker();
