import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux';

let defaultAlert = true

function reducer2(state = defaultAlert, action) {
  if (action.type === 'false') {
    state = false
    return state
  } else {
    return state
  }
}

let defaultState = [
    { id : '0', name : '장바구니 반지1', quan : 1, price : 1520000},
    { id : '1', name : '장바구니 반지2', quan : 3, price : 1720000}
]

function reducer(state = defaultState, action) {
  if (action.type === 'cartAdd') {
    
    let found = state.findIndex((a) => {return a.id === action.payload.id})
    
    if (found >= 0) {
      let copy = [...state]
      copy[found].quan++
      return copy
    }else {
      let copy = [...state]
      copy.push(action.payload)
      return copy
    }
  } else if (action.type === 'quanPlus') {
    let copy = [...state]
    copy[action.payload].quan++
    return copy
  } else if (action.type === 'quanMinus') {
    let copy = [...state]
    copy[action.payload].quan--

    if (copy[action.payload].quan < 1) {
      copy[action.payload].quan = 0
    }
    return copy
  } else {
    return state
  }

  
}

let store = createStore(combineReducers({reducer, reducer2}))

// Browser -> 서버한테 요청하지 않음
// Broswser -> 서버에 요청 될 수 도 있음


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>  
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
