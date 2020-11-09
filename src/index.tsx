import React from 'react';
import ReactDOM from 'react-dom';

import init from './init';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

export default function debug(input: any, select?: string) {
    const debug = input;
    switch (select) {
        case 'a':
            console.log(' debug_l: ' + debug);
            console.dir('debug_d : ' + debug);
            console.log(' debug_s: ' + JSON.stringify(debug));
            break;
        case 'l':
            console.log(' debug_l: ' + debug);
            break;
        case 'd':
            console.dir('debug_d : ' + debug);
            break
        case 's':
            console.log(' debug_s: ' + JSON.stringify(debug));
            break
        case 'n':
            break
        default:
            console.log(' debug_l: ' + debug);
            console.dir('debug_d : ' + debug);
            console.log(' debug_s: ' + JSON.stringify(debug));
    }
}


init();

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
