import * as React from 'react';
import {Component} from 'react';

class Welcome extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="mmrz__screen">
            <p>Добро пожаловать в программу MMRZ!</p>

            <div className="pull-right">
                <input type="button" className="green" onClick={this.props.ok} value="Далее" />
            </div>
        </div>;
    }
}

export default Welcome;
