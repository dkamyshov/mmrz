import * as React from 'react';
import {Component} from 'react';

class Introduction extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="mmrz__screen">
            <p>Инструкция...</p>
            <div className="pull-right">
                <input type="button" className="green" onClick={this.props.ok} value="Далее" />
            </div>
        </div>;
    }
}

export default Introduction;
