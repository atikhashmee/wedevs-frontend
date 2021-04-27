import React, { Component } from 'react';

export function getParameterByName(name, url = window.location.href)  {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function putData(data, name=null) {
    let keyName = name===null? 'cartItem':name;
    localStorage.setItem(keyName, JSON.stringify(data));
}

export function getData(name=null) {
    let keyName = name===null? 'cartItem':name;
    let allData = localStorage.getItem(keyName);
    if (!allData) {
        return [];
    }
    return JSON.parse(allData);
}

export const AppContext = React.createContext();

export const CartContext = React.createContext();