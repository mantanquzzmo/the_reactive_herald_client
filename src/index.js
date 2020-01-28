import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios"
import { Provider } from "react-redux"
import configureStore from './state/store/configureStore'
import 'semantic-ui-css/semantic.min.css'
import "./i18n"

axios.defaults.baseURL = process.env.REACT_APP_BASEURL

const store = configureStore()

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
