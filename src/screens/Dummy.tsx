import * as React from 'react';
import {Component} from 'react';

class Dummy extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="mmrz__screen">
            <h1>Что-то пошло не так...</h1>
            <p>Если вы видите это сообщение, то, вероятно, что-то пошло не так. Попробуйте обновить страницу.</p>
        </div>;
    }
}

export default Dummy;
