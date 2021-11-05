import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TweetComponent } from './tweets';
import reportWebVitals from './reportWebVitals';


const appEl = document.getElementById('root')
const e = React.createElement
if (appEl){
  ReactDOM.render(
    // <React.StrictMode>
    //   <TweetComponent username={appEl.dataset.username}/>
    // </React.StrictMode>
    e(TweetComponent, appEl.dataset),
    appEl
  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
