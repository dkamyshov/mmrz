import './css/main.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';

import MMRZ from './MMRZ';
import LocalStorage from './helpers/lstorage';

import groupsReducer   from './reducers/GroupsReducer';
import pairsReducer    from './reducers/PairsReducer';
import settingsReducer from './reducers/SettingsReducer';

const ls = new LocalStorage("mmrz");

const defaultState = ls.load({
    settings: {
        avoidDoubles: true,
        groupOptions: [0],
        gameLength: 10,
        useTimer: false,
        timerDelay: 5000
    },

    groups: [
        {id: 0, name: "Стандартная группа", collapsed: false, published: false}
    ],

    pairs: [
        {id: 0, gid: 0, en: "cow", ru: "корова", pd: 0, marked: false},
        {id: 1, gid: 0, en: "dog", ru: "собака", pd: 0, marked: false},
        {id: 2, gid: 0, en: "cat", ru: "кошка", pd: 0, marked: false},
        {id: 3, gid: 0, en: "arc", ru: "дуга", pd: 0, marked: false}
    ]
});

const store = createStore(combineReducers({
    groups: groupsReducer,
    pairs: pairsReducer,
    settings: settingsReducer
}), defaultState);

const render = () => {
    ReactDOM.render(
        <MMRZ store={store}/>,
        document.getElementById("mmrz")
    );
};

store.subscribe(render);
store.subscribe(() => {
    ls.save(store.getState());
});

render();
