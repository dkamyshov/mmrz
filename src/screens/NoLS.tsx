import * as React from 'react';
import {Component} from 'react';

class NoLS extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return <h1>Ошибка: ваш браузер не поддерживает технологию localStorage.</h1>;
    }
}

export default NoLS;
