import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';
//持久化存储
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
           <BrowserRouter>
               <App />
          </BrowserRouter>
        </PersistGate>
    </Provider>
    
);
reportWebVitals();
