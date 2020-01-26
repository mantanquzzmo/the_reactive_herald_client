import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios"
import { Provider } from "react-redux"
import configureStore from './state/store/configureStore'
import 'semantic-ui-css/semantic.min.css'

axios.defaults.baseURL = process.env.REACT_APP_BASEURL
axios.defaults.headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"))

const store = configureStore()

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
